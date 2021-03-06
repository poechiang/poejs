define([
	'./core',
	'./event/core',
	'./event/removeEvent',
	'./event/returnTrue',
	'./event/returnFalse',
	'./data/dataPriv',
	'./var/rnothtmlwhite',
	'./var/rcheckableType',
	'./var/documentElement',
], function(POE, Event, removeEvent, returnTrue, returnFalse,dataPriv,rnothtmlwhite,rcheckableType,documentElement) {

	'use strict'

	var rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/,

		// Support: IE <=9 only
		// Accessing document.activeElement can throw unexpectedly
		// https://bugs.jquery.com/ticket/13393
		safeActiveElement = function() {
			try {
				return document.activeElement
			} catch (err) {}
		},

		// Support: IE <=9 - 11+
		// focus() and blur() are asynchronous, except when they are no-op.
		// So expect focus to be synchronous when the element is already active,
		// and blur to be synchronous when the element is not already active.
		// (focus and blur are always synchronous in other supported browsers,
		// this just defines when we can count on it).
		expectSync = function(elem, type) {
			return (elem === safeActiveElement()) === (type === 'focus')
		},
		on = function(elem, types, selector, data, fn, one) {
			var origFn, type

			// Types can be a map of types/handlers
			if (typeof types === 'object') {

				// ( types-Object, selector, data )
				if (typeof selector !== 'string') {

					// ( types-Object, data )
					data = data || selector
					selector = undefined
				}
				for (type in types) {
					on(elem, type, selector, data, types[type], one)
				}
				return elem
			}

			if (data == null && fn == null) {

				// ( types, fn )
				fn = selector
				data = selector = undefined
			} else if (fn == null) {
				if (typeof selector === 'string') {

					// ( types, selector, fn )
					fn = data
					data = undefined
				} else {

					// ( types, data, fn )
					fn = data
					data = selector
					selector = undefined
				}
			}
			if (fn === false) {
				fn = returnFalse
			} else if (!fn) {
				return elem
			}

			if (one === 1) {
				origFn = fn
				fn = function(event) {

					// Can use an empty set, since event contains the info
					POE().off(event)
					return origFn.apply(this, arguments)
				}

				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || (origFn.guid = POE.guid++)
			}
			return elem.each(function() {
				POE.event.add(this, types, fn, data, selector)
			})
		},

		// Ensure the presence of an event listener that handles manually-triggered
		// synthetic events by interrupting progress until reinvoked in response to
		// *native* events that it fires directly, ensuring that state changes have
		// already occurred before other listeners are invoked.
		leverageNative = function(el, type, expectSync) {

			// Missing expectSync indicates a trigger call, which must force setup through POE.event.add
			if (!expectSync) {
				POE.event.add(el, type, returnTrue)
				return
			}

			// Register the controller as a special universal handler for all event namespaces
			dataPriv.set(el, type, false)
			POE.event.add(el, type, {
				namespace: false,
				handler: function(event) {
					var notAsync, result,
						saved = dataPriv.get(this, type)

					if ((event.isTrigger & 1) && this[type]) {

						// Interrupt processing of the outer synthetic .trigger()ed event
						if (!saved) {

							// Store arguments for use when handling the inner native event
							saved = slice.call(arguments)
							dataPriv.set(this, type, saved)

							// Trigger the native event and capture its result
							// Support: IE <=9 - 11+
							// focus() and blur() are asynchronous
							notAsync = expectSync(this, type)
							this[type]()
							result = dataPriv.get(this, type)
							if (saved !== result || notAsync) {
								dataPriv.set(this, type, false)
							} else {
								result = undefined
							}
							if (saved !== result) {

								// Cancel the outer synthetic event
								event.stopImmediatePropagation()
								event.preventDefault()
								return result
							}

							// If this is an inner synthetic event for an event with a bubbling surrogate
							// (focus or blur), assume that the surrogate already propagated from triggering the
							// native event and prevent that from happening again here.
							// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
							// bubbling surrogate propagates *after* the non-bubbling base), but that seems
							// less bad than duplication.
						} else if ((POE.event.special[type] || {}).delegateType) {
							event.stopPropagation()
						}

						// If this is a native event triggered above, everything is now in order
						// Fire an inner synthetic event with the original arguments
					} else if (saved) {

						// ...and capture the result
						dataPriv.set(this, type, POE.event.trigger(

							// Support: IE <=9 - 11+
							// Extend with the prototype to reset the above stopImmediatePropagation()
							POE.extend(saved.shift(), POE.Event.prototype),
							saved,
							this
						))

						// Abort handling of the native event
						event.stopImmediatePropagation()
					}
				}
			})
		}

	POE.removeEvent = removeEvent

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	POE.event = {

		global: {},

		add: function(elem, types, handler, data, selector) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get(elem)

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler
				handler = handleObjIn.handler
				selector = handleObjIn.selector
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if (selector) {
				POE.find.matchesSelector(documentElement, selector)
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = POE.guid++
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {}
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function(e) {

					// Discard the second event of a POE.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof POE !== 'undefined' && POE.event.triggered !== e.type ?
						POE.event.dispatch.apply(elem, arguments) : undefined
				}
			}

			// Handle multiple events separated by a space
			types = (types || '').match(rnothtmlwhite) || ['']
			t = types.length
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || []
				type = origType = tmp[1]
				namespaces = (tmp[2] || '').split('.').sort()

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue
				}

				// If event changes its type, use the special event handlers for the changed type
				special = POE.event.special[type] || {}

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type

				// Update special based on newly reset type
				special = POE.event.special[type] || {}

				// handleObj is passed to all event handlers
				handleObj = POE.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && POE.expr.match.needsContext.test(selector),
					namespace: namespaces.join('.')
				}, handleObjIn)

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = []
					handlers.delegateCount = 0

					// Only use addEventListener if the special events handler returns false
					if (!special.setup ||
						special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle)
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj)

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj)
				} else {
					handlers.push(handleObj)
				}

				// Keep track of which events have ever been used, for event optimization
				POE.event.global[type] = true
			}

		},

		// Detach an event or set of events from an element
		remove: function(elem, types, handler, selector, mappedTypes) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData(elem) && dataPriv.get(elem)

			if (!elemData || !(events = elemData.events)) {
				return
			}

			// Once for each type.namespace in types type may be omitted
			types = (types || '').match(rnothtmlwhite) || ['']
			t = types.length
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || []
				type = origType = tmp[1]
				namespaces = (tmp[2] || '').split('.').sort()

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						POE.event.remove(elem, type + types[t], handler, selector, true)
					}
					continue
				}

				special = POE.event.special[type] || {}
				type = (selector ? special.delegateType : special.bindType) || type
				handlers = events[type] || []
				tmp = tmp[2] &&
					new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)')

				// Remove matching events
				origCount = j = handlers.length
				while (j--) {
					handleObj = handlers[j]

					if ((mappedTypes || origType === handleObj.origType) &&
						(!handler || handler.guid === handleObj.guid) &&
						(!tmp || tmp.test(handleObj.namespace)) &&
						(!selector || selector === handleObj.selector ||
							selector === '**' && handleObj.selector)) {
						handlers.splice(j, 1)

						if (handleObj.selector) {
							handlers.delegateCount--
						}
						if (special.remove) {
							special.remove.call(elem, handleObj)
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown ||
						special.teardown.call(elem, namespaces, elemData.handle) === false) {

						removeEvent(elem, type, elemData.handle)
					}

					delete events[type]
				}
			}

			// Remove data and the expando if it's no longer used
			if (POE.isEmptyObject(events)) {
				dataPriv.remove(elem, 'handle events')
			}
		},

		dispatch: function(nativeEvent) {

			// Make a writable POE.Event from the native event object
			var event = POE.event.fix(nativeEvent)

			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array(arguments.length),
				handlers = (dataPriv.get(this, 'events') || {})[event.type] || [],
				special = POE.event.special[event.type] || {}

			// Use the fix-ed POE.Event rather than the (read-only) native event
			args[0] = event

			for (i = 1; i < arguments.length; i++) {
				args[i] = arguments[i]
			}

			event.delegateTarget = this

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return
			}

			// Determine handlers
			handlerQueue = POE.event.handlers.call(this, event, handlers)

			// Run delegates first they may want to stop propagation beneath us
			i = 0
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem

				j = 0
				while ((handleObj = matched.handlers[j++]) &&
					!event.isImmediatePropagationStopped()) {

					// If the event is namespaced, then each handler is only invoked if it is
					// specially universal or its namespaces are a superset of the event's.
					if (!event.rnamespace || handleObj.namespace === false ||
						event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj
						event.data = handleObj.data

						ret = ((POE.event.special[handleObj.origType] || {}).handle ||
							handleObj.handler).apply(matched.elem, args)

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault()
								event.stopPropagation()
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event)
			}

			return event.result
		},

		handlers: function(event, handlers) {
			var i, handleObj, sel, matchedHandlers, matchedSelectors,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target

			// Find delegate handlers
			if (delegateCount &&

				// Support: IE <=9
				// Black-hole SVG <use> instance trees (trac-13180)
				cur.nodeType &&

				// Support: Firefox <=42
				// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
				// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
				// Support: IE 11 only
				// ...but not arrow key 'clicks' of radio inputs, which can have `button` -1 (gh-2343)
				!(event.type === 'click' && event.button >= 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && !(event.type === 'click' && cur.disabled === true)) {
						matchedHandlers = []
						matchedSelectors = {}
						for (i = 0; i < delegateCount; i++) {
							handleObj = handlers[i]

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + ' '

							if (matchedSelectors[sel] === undefined) {
								matchedSelectors[sel] = handleObj.needsContext ?
									POE(sel, this).index(cur) > -1 :
									POE.find(sel, this, null, [cur]).length
							}
							if (matchedSelectors[sel]) {
								matchedHandlers.push(handleObj)
							}
						}
						if (matchedHandlers.length) {
							handlerQueue.push({
								elem: cur,
								handlers: matchedHandlers
							})
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this
			if (delegateCount < handlers.length) {
				handlerQueue.push({
					elem: cur,
					handlers: handlers.slice(delegateCount)
				})
			}

			return handlerQueue
		},

		addProp: function(name, hook) {

			Object.defineProperty(Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: POE.isFunction(hook) ?
					function() {
						if (this.originalEvent) {
							return hook(this.originalEvent)
						}
					} : function() {
						if (this.originalEvent) {
							return this.originalEvent[name]
						}
					},

				set: function(value) {
					Object.defineProperty(this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					})
				}
			})
		},

		fix: function(originalEvent) {
			return originalEvent[POE.expando] ?
				originalEvent :
				new POE.Event(originalEvent)
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			click: {

				// Utilize native event to ensure correct state for checkable inputs
				setup: function(data) {

					// For mutual compressibility with _default, replace `this` access with a local var.
					// `|| data` is dead code meant only to preserve the variable through minification.
					var el = this || data

					// Claim the first handler
					if (rcheckableType.test(el.type) &&
						el.click && nodeName(el, 'input') &&
						dataPriv.get(el, 'click') === undefined) {

						// dataPriv.set( el, 'click', ... )
						leverageNative(el, 'click', returnTrue)
					}

					// Return false to allow normal processing in the caller
					return false
				},
				trigger: function(data) {

					// For mutual compressibility with _default, replace `this` access with a local var.
					// `|| data` is dead code meant only to preserve the variable through minification.
					var el = this || data

					// Force setup before triggering a click
					if (rcheckableType.test(el.type) &&
						el.click && nodeName(el, 'input') &&
						dataPriv.get(el, 'click') === undefined) {

						leverageNative(el, 'click')
					}

					// Return non-false to allow normal event-path propagation
					return true
				},

				// For cross-browser consistency, suppress native .click() on links
				// Also prevent it if we're currently inside a leveraged native-event stack
				_default: function(event) {
					var target = event.target
					return rcheckableType.test(target.type) &&
						target.click && nodeName(target, 'input') &&
						dataPriv.get(target, 'click') ||
						nodeName(target, 'a')
				}
			},

			beforeunload: {
				postDispatch: function(event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result
					}
				}
			}
		}
	}



	// Includes all common event props including KeyEvent and MouseEvent specific props
	POE.each({
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		'char': true,
		code: true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function(event) {
			var button = event.button

			// Add which for key events
			if (event.which == null && rkeyEvent.test(event.type)) {
				return event.charCode != null ? event.charCode : event.keyCode
			}

			// Add which for click: 1 === left 2 === middle 3 === right
			if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
				if (button & 1) {
					return 1
				}

				if (button & 2) {
					return 3
				}

				if (button & 4) {
					return 2
				}

				return 0
			}

			return event.which
		}
	}, function(v,event){
		POE.event.addProp(event,true)
	})

	POE.each({
		focus: 'focusin',
		blur: 'focusout'
	}, function(delegateType,type) {
		POE.event.special[type] = {

			// Utilize native event if possible so blur/focus sequence is correct
			setup: function() {

				// Claim the first handler
				// dataPriv.set( this, 'focus', ... )
				// dataPriv.set( this, 'blur', ... )
				leverageNative(this, type, expectSync)

				// Return false to allow normal processing in the caller
				return false
			},
			trigger: function() {

				// Force setup before trigger
				leverageNative(this, type)

				// Return non-false to allow normal event-path propagation
				return true
			},

			delegateType: delegateType
		}
	})

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in POE.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	POE.each({
		mouseenter: 'mouseover',
		mouseleave: 'mouseout',
		pointerenter: 'pointerover',
		pointerleave: 'pointerout'
	}, function(orig, fix) {
		POE.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function(event) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || (related !== target && !POE.contains(target, related))) {
					event.type = handleObj.origType
					ret = handleObj.handler.apply(this, arguments)
					event.type = fix
				}
				return ret
			}
		}
	})

	POE.fn.extend({
		on: function(types, selector, data, fn) {
			return on(this, types, selector, data, fn)
		},
		one: function(types, selector, data, fn) {
			return on(this, types, selector, data, fn, 1)
		},
		off: function(types, selector, fn) {
			var handleObj, type
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched POE.Event
				handleObj = types.handleObj
				POE(types.delegateTarget).off(
					handleObj.namespace ?
					handleObj.origType + '.' + handleObj.namespace :
					handleObj.origType,
					handleObj.selector,
					handleObj.handler
				)
				return this
			}
			if (typeof types === 'object') {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type])
				}
				return this
			}
			if (selector === false || typeof selector === 'function') {

				// ( types [, fn] )
				fn = selector
				selector = undefined
			}
			if (fn === false) {
				fn = returnFalse
			}
			return this.each(function() {
				POE.event.remove(this, types, fn, selector)
			})
		},

		hover: function(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
		},

		bind: function(types, data, fn) {
			return this.on(types, null, data, fn)
		},
		unbind: function(types, fn) {
			return this.off(types, null, fn)
		},

		delegate: function(selector, types, data, fn) {
			return this.on(types, selector, data, fn)
		},
		undelegate: function(selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off(selector, '**') :
				this.off(types, selector || '**', fn)
		}
	})



	POE.each(('blur focus focusin focusout resize scroll click dblclick ' +
			'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
			'change select submit keydown keypress keyup contextmenu').split(' '),
		function(name) {

			// Handle event binding
			POE.fn[name] = function(data, fn) {
				return arguments.length > 0 ?
					this.on(name, null, data, fn) :
					this.trigger(name)
			}
		})


	
	



	POE.Event = Event

	return POE
})