define([
	'../var/expando',
	'../core/extend',
	'./returnTrue',
	'./returnFalse',
], function(expando, extend, returnTrue, returnFalse) {
	'use strict'

	var Event = function(src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof Event)) {
			return new Event(src, props)
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src
			this.type = src.type

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
				returnTrue :
				returnFalse

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = (src.target && src.target.nodeType === 3) ?
				src.target.parentNode :
				src.target

			this.currentTarget = src.currentTarget
			this.relatedTarget = src.relatedTarget

			// Event type
		} else {
			this.type = src
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			extend(this, props)
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || Date.now()
		// Mark it as fixed
		this[expando] = true
	}

	// POE.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	Event.prototype = {
		constructor: Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent

			this.isDefaultPrevented = returnTrue

			if (e && !this.isSimulated) {
				e.preventDefault()
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent

			this.isPropagationStopped = returnTrue

			if (e && !this.isSimulated) {
				e.stopPropagation()
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent

			this.isImmediatePropagationStopped = returnTrue

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation()
			}

			this.stopPropagation()
		}
	}

	return Event

})