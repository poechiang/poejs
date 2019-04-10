define([
		'./core',
		'./core/nodeName',
		'./core/push',
		'./core/concat',
		'./core/getAll',
		'./core/htmlPrefilter',
		'./core/buildFragment',
		'./core/each',
		'./var/document',
		'./var/rsingleTag',
		'./var/rparentsprev',
		'./dom/winnow',
		'./dom/filter',
		'./dom/sibling',
		'./data/dataPriv',
		'./data/dataUser',
		'./core/access',
		'./core/setGlobalEval',
		'./core/isFunction',
		'./core/acceptData',
		'./core/wrapMap',
		'./var/rtagName',
		'./support',
	],
	function(POE, nodeName, push, concat, getAll, htmlPrefilter, buildFragment, each, document, rsingleTag, rparentsprev,
		winnow, filter, sibling, dataPriv, dataUser, access, setGlobalEval, isFunction, acceptData, wrapMap, rtagName, support) {

		'use strict'



		/* eslint-enable */

		// Support: IE <=10 - 11, Edge 12 - 13 only
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		var rnoInnerhtml = /<script|<style|<link/i,

			// checked='checked' or checked
			// rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
			// rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
			indexOf = [].indexOf,
			guaranteedUnique = {
				children: true,
				contents: true,
				next: true,
				prev: true
			},
			dir = function(elem, dir, until) {
				var matched = [],
					truncate = until !== undefined

				while ((elem = elem[dir]) && elem.nodeType !== 9) {
					if (elem.nodeType === 1) {
						if (truncate && POE(elem).is(until)) {
							break
						}
						matched.push(elem)
					}
				}
				return matched
			},
			siblings = function(n, elem) {
				var matched = []

				for (; n; n = n.nextSibling) {
					if (n.nodeType === 1 && n !== elem) {
						matched.push(n)
					}
				}

				return matched
			},
			cloneCopyEvent = function(src, dest) {
				var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events

				if (dest.nodeType !== 1) {
					return
				}

				// 1. Copy private data: events, handlers, etc.
				if (dataPriv.hasData(src)) {
					pdataOld = dataPriv.access(src)
					pdataCur = dataPriv.set(dest, pdataOld)
					events = pdataOld.events

					if (events) {
						delete pdataCur.handle
						pdataCur.events = {}

						for (type in events) {
							for (i = 0, l = events[type].length; i < l; i++) {
								POE.event.add(dest, type, events[type][i])
							}
						}
					}
				}

				// 2. Copy user data
				if (dataUser.hasData(src)) {
					udataOld = dataUser.access(src)
					udataCur = POE.extend({}, udataOld)

					dataUser.set(dest, udataCur)
				}
			},
			// Fix IE bugs, see support tests
			fixInput = function(src, dest) {
				var nodeName = dest.nodeName.toLowerCase()

				// Fails to persist the checked state of a cloned checkbox or radio button.
				if (nodeName === 'input' && rcheckableType.test(src.type)) {
					dest.checked = src.checked

					// Fails to return the selected option to the default selected state when cloning options
				} else if (nodeName === 'input' || nodeName === 'textarea') {
					dest.defaultValue = src.defaultValue
				}
			},
			disableScript = function(elem) {
				elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type
				return elem
			},
			domManip = function(collection, args, callback, ignored) {

				// Flatten any nested arrays
				args = concat.apply([], args)

				var fragment, first, scripts, hasScripts, node, doc,
					i = 0,
					l = collection.length,
					iNoClone = l - 1,
					value = args[0],
					valueIsFunction = isFunction(value)

				// We can't cloneNode fragments that contain checked, in WebKit
				if (valueIsFunction ||
					(l > 1 && typeof value === 'string' &&
						!support.checkClone && rchecked.test(value))) {
					return collection.each(function(index) {
						var self = collection.eq(index)
						if (valueIsFunction) {
							args[0] = value.call(this, index, self.html())
						}
						domManip(self, args, callback, ignored)
					})
				}

				if (l) {
					fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored)
					first = fragment.firstChild

					if (fragment.childNodes.length === 1) {
						fragment = first
					}

					// Require either new content or an interest in ignored elements to invoke the callback
					if (first || ignored) {
						scripts = POE.map(getAll(fragment, 'script'), disableScript)
						hasScripts = scripts.length

						// Use the original fragment for the last item
						// instead of the first because it can end up
						// being emptied incorrectly in certain situations (#8070).
						for (; i < l; i++) {
							node = fragment

							if (i !== iNoClone) {
								node = POE.clone(node, true, true)

								// Keep references to cloned scripts for later restoration
								if (hasScripts) {

									// Support: Android <=4.0 only, PhantomJS 1 only
									// push.apply(_, arraylike) throws on ancient WebKit
									POE.merge(scripts, getAll(node, 'script'))
								}
							}

							callback.call(collection[i], node, i)
						}

						if (hasScripts) {
							doc = scripts[scripts.length - 1].ownerDocument

							// Reenable scripts
							POE.map(scripts, restoreScript)

							// Evaluate executable scripts on first document insertion
							for (i = 0; i < hasScripts; i++) {
								node = scripts[i]
								if (rscriptType.test(node.type || '') &&
									!dataPriv.access(node, 'globalEval') &&
									POE.contains(doc, node)) {

									if (node.src && (node.type || '').toLowerCase() !== 'module') {

										// Optional AJAX dependency, but won't run scripts if not present
										if (POE._evalUrl) {
											POE._evalUrl(node.src)
										}
									} else {
										POE.eval(node.textContent.replace(rcleanScript, ''), doc, node)
									}
								}
							}
						}
					}
				}

				return collection
			},
			remove = function(elem, selector, keepData) {
				var node,
					nodes = selector ? POE.filter(selector, elem) : elem,
					i = 0

				for (;
					(node = nodes[i]) != null; i++) {
					if (!keepData && node.nodeType === 1) {
						POE.cleanData(getAll(node))
					}

					if (node.parentNode) {
						if (keepData && POE.contains(node.ownerDocument, node)) {
							setGlobalEval(getAll(node, 'script'))
						}
						node.parentNode.removeChild(node)
					}
				}

				return elem
			},

			manipulationTarget = function(elem, content) {
				if (nodeName(elem, 'table') &&
					nodeName(content.nodeType !== 11 ? content : content.firstChild, 'tr')) {

					return POE(elem).children('tbody')[0] || elem
				}

				return elem
			}



		POE.extend({
			parseHTML: function(data, context, keepScripts) {
				if (typeof data !== 'string') {
					return []
				}
				if (typeof context === 'boolean') {
					keepScripts = context
					context = false
				}

				var base, parsed, scripts

				if (!context) {

					if (support.createHTMLDocument) {
						context = document.implementation.createHTMLDocument('')

						base = context.createElement('base')
						base.href = document.location.href
						context.head.appendChild(base)
					} else {
						context = document
					}
				}

				parsed = rsingleTag.exec(data)
				scripts = !keepScripts && []

				// Single tag
				if (parsed) {
					return [context.createElement(parsed[1])]
				}

				parsed = buildFragment([data], context, scripts)

				if (scripts && scripts.length) {
					POE(scripts).remove()
				}

				return POE.merge([], parsed.childNodes)

			},
			filter: filter,

			htmlPrefilter: htmlPrefilter,

			clone: function(elem, dataAndEvents, deepDataAndEvents) {
				var i, l, srcElements, destElements,
					clone = elem.cloneNode(true),
					inPage = POE.contains(elem.ownerDocument, elem)

				// Fix IE cloning issues
				if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
					!POE.isXMLDoc(elem)) {

					// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
					destElements = getAll(clone)
					srcElements = getAll(elem)

					for (i = 0, l = srcElements.length; i < l; i++) {
						fixInput(srcElements[i], destElements[i])
					}
				}

				// Copy the events from the original to the clone
				if (dataAndEvents) {
					if (deepDataAndEvents) {
						srcElements = srcElements || getAll(elem)
						destElements = destElements || getAll(clone)

						for (i = 0, l = srcElements.length; i < l; i++) {
							cloneCopyEvent(srcElements[i], destElements[i])
						}
					} else {
						cloneCopyEvent(elem, clone)
					}
				}

				// Preserve script evaluation history
				destElements = getAll(clone, 'script')
				if (destElements.length > 0) {
					setGlobalEval(destElements, !inPage && getAll(elem, 'script'))
				}

				// Return the cloned set
				return clone
			},

			cleanData: function(elems) {
				var data, elem, type,
					special = POE.event.special,
					i = 0

				for (;
					(elem = elems[i]) !== undefined; i++) {
					if (acceptData(elem)) {
						if ((data = elem[dataPriv.expando])) {
							if (data.events) {
								for (type in data.events) {
									if (special[type]) {
										POE.event.remove(elem, type)

										// This is a shortcut to avoid POE.event.remove's overhead
									} else {
										POE.removeEvent(elem, type, data.handle)
									}
								}
							}

							// Support: Chrome <=35 - 45+
							// Assign undefined instead of using delete, see Data#remove
							elem[dataPriv.expando] = undefined
						}
						if (elem[dataUser.expando]) {

							// Support: Chrome <=35 - 45+
							// Assign undefined instead of using delete, see Data#remove
							elem[dataUser.expando] = undefined
						}
					}
				}
			}
		})


		POE.fn.extend({
			get: function(num) {

				// Return all the elements in a clean array
				if (num == null) {
					return this.slice()
				}
				return num < 0 ? this[num + this.length] : this[num]
			},

			eq: function(i) {
				var len = this.length,
					j = +i + (i < 0 ? len : 0)
				return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
			},

			first: function() {
				return this.eq(0)
			},

			last: function() {
				return this.eq(-1)
			},


			end: function() {
				return this.prevObject || this.constructor()
			},
			find: function(selector) {
				var i, ret,
					len = this.length,
					self = this

				if (typeof selector !== 'string') {
					return this.pushStack(POE(selector).filter(function() {
						for (i = 0; i < len; i++) {
							if (POE.contains(self[i], this)) {
								return true
							}
						}
					}))
				}

				ret = this.pushStack([])

				for (i = 0; i < len; i++) {
					POE.find(selector, self[i], ret)
				}

				return len > 1 ? POE.uniqueSort(ret) : ret
			},
			filter: function(selector) {
				return this.pushStack(winnow(this, selector || [], false))
			},
			not: function(selector) {
				return this.pushStack(winnow(this, selector || [], true))
			},
			is: function(selector) {
				return !!winnow(
					this,
					typeof selector === 'string' && POE.expr.match.needsContext.test(selector) ?
					POE(selector) :
					selector || [],
					false
				).length
			},


			has: function(target) {
				var targets = POE(target, this),
					l = targets.length

				return this.filter(function() {
					var i = 0
					for (; i < l; i++) {
						if (POE.contains(this, targets[i])) {
							return true
						}
					}
				})
			},

			closest: function(selectors, context) {
				var cur,
					i = 0,
					l = this.length,
					matched = [],
					targets = typeof selectors !== 'string' && POE(selectors)

				// Positional selectors never match, since there's no _selection_ context
				if (!rneedsContext.test(selectors)) {
					for (; i < l; i++) {
						for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

							// Always skip document fragments
							if (cur.nodeType < 11 && (targets ?
									targets.index(cur) > -1 :

									// Don't pass non-elements to Sizzle
									cur.nodeType === 1 &&
									POE.find.matchesSelector(cur, selectors))) {

								matched.push(cur)
								break
							}
						}
					}
				}

				return this.pushStack(matched.length > 1 ? POE.uniqueSort(matched) : matched)
			},

			// Determine the position of an element within the set
			index: function(elem) {

				// No argument, return index in parent
				if (!elem) {
					return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1
				}

				// Index in selector
				if (typeof elem === 'string') {
					return indexOf.call(POE(elem), this[0])
				}

				// Locate the position of the desired element
				return indexOf.call(this,

					// If it receives a POE object, the first element is used
					elem.jquery ? elem[0] : elem
				)
			},

			add: function(selector, context) {
				return this.pushStack(
					POE.uniqueSort(
						POE.merge(this.get(), POE(selector, context))
					)
				)
			},

			addBack: function(selector) {
				return this.add(selector == null ?
					this.prevObject : this.prevObject.filter(selector)
				)
			},

			detach: function(selector) {
				return remove(this, selector, true)
			},

			remove: function(selector) {
				return remove(this, selector)
			},

			text: function(value) {
				return access(this, function(value) {
					return value === undefined ?
						POE.text(this) :
						this.empty().each(function() {
							if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
								this.textContent = value
							}
						})
				}, null, value, arguments.length)
			},

			append: function() {
				return domManip(this, arguments, function(elem) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						var target = manipulationTarget(this, elem)
						target.appendChild(elem)
					}
				})
			},

			prepend: function() {
				return domManip(this, arguments, function(elem) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						var target = manipulationTarget(this, elem)
						target.insertBefore(elem, target.firstChild)
					}
				})
			},

			before: function() {
				return domManip(this, arguments, function(elem) {
					if (this.parentNode) {
						this.parentNode.insertBefore(elem, this)
					}
				})
			},

			after: function() {
				return domManip(this, arguments, function(elem) {
					if (this.parentNode) {
						this.parentNode.insertBefore(elem, this.nextSibling)
					}
				})
			},

			empty: function() {
				var elem,
					i = 0

				for (;
					(elem = this[i]) != null; i++) {
					if (elem.nodeType === 1) {

						// Prevent memory leaks
						POE.cleanData(getAll(elem, false))

						// Remove any remaining nodes
						elem.textContent = ''
					}
				}

				return this
			},

			clone: function(dataAndEvents, deepDataAndEvents) {
				dataAndEvents = dataAndEvents == null ? false : dataAndEvents
				deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents

				return this.map(function() {
					return POE.clone(this, dataAndEvents, deepDataAndEvents)
				})
			},

			html: function(value) {
				return access(this, function(value) {
					var elem = this[0] || {},
						i = 0,
						l = this.length

					if (value === undefined && elem.nodeType === 1) {
						return elem.innerHTML
					}

					// See if we can take a shortcut and just use innerHTML
					if (typeof value === 'string' && !rnoInnerhtml.test(value) &&
						!wrapMap[(rtagName.exec(value) || ['', ''])[1].toLowerCase()]) {

						value = POE.htmlPrefilter(value)

						try {
							for (; i < l; i++) {
								elem = this[i] || {}

								// Remove element nodes and prevent memory leaks
								if (elem.nodeType === 1) {
									POE.cleanData(getAll(elem, false))
									elem.innerHTML = value
								}
							}

							elem = 0

							// If using innerHTML throws an exception, use the fallback method
						} catch (e) {}
					}

					if (elem) {
						this.empty().append(value)
					}
				}, null, value, arguments.length)
			},

			replaceWith: function() {
				var ignored = []

				// Make the changes, replacing each non-ignored context element with the new content
				return domManip(this, arguments, function(elem) {
					var parent = this.parentNode

					if (POE.inArray(this, ignored) < 0) {
						POE.cleanData(getAll(this))
						if (parent) {
							parent.replaceChild(elem, this)
						}
					}

					// Force callback invocation
				}, ignored)
			}
		})



		each({
			parent: function(elem) {
				var parent = elem.parentNode
				return parent && parent.nodeType !== 11 ? parent : null
			},
			parents: function(elem) {
				return dir(elem, 'parentNode')
			},
			parentsUntil: function(elem, i, until) {
				return dir(elem, 'parentNode', until)
			},
			next: function(elem) {
				return sibling(elem, 'nextSibling')
			},
			prev: function(elem) {
				return sibling(elem, 'previousSibling')
			},
			nextAll: function(elem) {
				return dir(elem, 'nextSibling')
			},
			prevAll: function(elem) {
				return dir(elem, 'previousSibling')
			},
			nextUntil: function(elem, i, until) {
				return dir(elem, 'nextSibling', until)
			},
			prevUntil: function(elem, i, until) {
				return dir(elem, 'previousSibling', until)
			},
			siblings: function(elem) {
				return siblings((elem.parentNode || {}).firstChild, elem)
			},
			children: function(elem) {
				return siblings(elem.firstChild)
			},
			contents: function(elem) {
				if (nodeName(elem, 'iframe')) {
					return elem.contentDocument
				}
				if (nodeName(elem, 'template')) {
					elem = elem.content || elem
				}

				return POE.merge([], elem.childNodes)
			}
		}, function(fn, name) {
			POE.fn[name] = function(until, selector) {
				var matched = POE.map(this, fn, until)

				if (name.slice(-5) !== 'Until') {
					selector = until
				}

				if (selector && typeof selector === 'string') {
					matched = filter(selector, matched)
				}

				if (this.length > 1) {

					// Remove duplicates
					if (!guaranteedUnique[name]) {
						POE.uniqueSort(matched)
					}

					// Reverse order for parents* and prev-derivatives
					if (rparentsprev.test(name)) {
						matched.reverse()
					}
				}

				return this.pushStack(matched)
			}
		})


		each({
			appendTo: 'append',
			prependTo: 'prepend',
			insertBefore: 'before',
			insertAfter: 'after',
			replaceAll: 'replaceWith'
		}, function(original, name) {
			POE.fn[name] = function(selector) {
				var elems,
					ret = [],
					insert = POE(selector),
					last = insert.length - 1,
					i = 0

				for (; i <= last; i++) {
					elems = i === last ? this : this.clone(true)
					POE(insert[i])[original](elems)

					// Support: Android <=4.0 only, PhantomJS 1 only
					// .get() because push.apply(_, arraylike) throws on ancient WebKit
					push.apply(ret, elems.get())
				}

				return this.pushStack(ret)
			}
		})

		return POE
	})