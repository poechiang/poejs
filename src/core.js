define([
	'./var/arr',
	'./var/expando',
	'./var/version',
	'./var/document',
	'./var/rsingleTag',
	'./core/inArray',
	'./core/extend',
	'./var/class2type',
	'./core/isFunction',
	'./core/isWindow',
	'./core/toType',
	'./core/isArrayLike',
	'./core/isPlainObject',
	'./core/each',
	'./core/merge',
	'./core/makeArray',
	'./core/map',
	'./core/grep',
	'./core/slice',
	'./core/push',
	'./dom/var/cssHooks',
	'./dom/var/cssNumber',
], function(arr, expando,version, document, rsingleTag, inArray, extend, class2type, isFunction, isWindow, toType,
	isArrayLike, isPlainObject, each, merge, makeArray, map, grep, slice, push,cssHooks, cssNumber) {

	'use strict'

	var rootPOE,
		init,
		POE = function(selector, context) {
			return new POE.fn.init(selector, context)
		},
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

	POE.extend = extend

	POE.fn = POE.prototype = {

		// The current version of POE being used
		poe: version,

		constructor: POE,

		// The default length of a POE object is 0
		length: 0,

		extend: POE.extend,
	}

	POE.extend({
		// A global GUID counter for objects
		guid: 1,
		expando:expando,
		isReady:true,
		noop: function() {},

		each: each,
		makeArray: makeArray,
		inArray: inArray,
		merge: merge,
		grep: grep,
		map: map,


		cssHooks: cssHooks,
		cssNumber: cssNumber,

		delay: function(fn, delay, args, context) {
			if (delay === undefined) {
				fn.apply(context, POE.toArray(args))
			} else {
				setTimeout(function() {
					fn.apply(context, POE.toArray(args))
				}, delay || 0)
			}
		},
		eval: function(code, node, doc) {
			doc = doc || document

			var script = doc.createElement('script')

			script.text = code

			if (node) {
				each(['type', 'src', 'nonce', 'noModule'], function(item) {
					var val = node[item] || node.getAttribute && node.getAttribute(item)
					if (val) {
						script.setAttribute(item, val)
					}
				})
			}

			doc.head.appendChild(script).parentNode.removeChild(script)
		},
		trim: function(text) {
			return text == null ?
				'' :
				(text + '').replace(rtrim, '')
		},
		toArray: function(obj) {
			if (isArrayLike(obj)) {
				return [].slice.call(obj)
			} else {
				var arr = []
				for (var x in obj) {
					if (isFunction(obj[x])) {
						continue
					}
					arr.push(obj[x])
				}
				return arr
			}
		},
		proxy: function(fn, context) {
			var tmp, args, proxy

			if (typeof context === 'string') {
				tmp = fn[context]
				context = fn
				fn = tmp
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!isFunction(fn)) {
				return undefined
			}

			// Simulated bind
			args = slice.call(arguments, 2)
			proxy = function() {
				return fn.apply(context || this, args.concat(slice.call(arguments)))
			}

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || POE.guid++

				return proxy
		},
	})
	init = POE.fn.init = function(selector, context, root) {
		var match, elem

		if (!selector) {
			return this
		}

		root = root || rootPOE

		if (typeof selector === 'string') {
			if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {
				match = [null, selector, null]

			} else {
				match = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/.exec(selector)
			}

			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof POE ? context[0] : context

					merge(this, POE.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					))

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (isFunction(this[match])) {
								this[match](context[match])

								// ...and otherwise set as attributes
							} else {
								this.attr(match, context[match])
							}
						}
					}

					return this

					// HANDLE: $(#id)
				} else {
					elem = document.getElementById(match[2])

					if (elem) {

						// Inject the element directly into the POE object
						this[0] = elem
						this.length = 1
					}
					return this
				}
			} else if (!context || context.POE) {
				return (context || root).find(selector)
			} else {
				return this.constructor(context).find(selector)
			}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
			this[0] = selector
			this.length = 1
			return this

			// HANDLE: $(function)
			// Shortcut for document ready
		} else if (isFunction(selector)) {
			return root.ready !== undefined ?
				root.ready(selector) : selector(POE)
		}

		return POE.makeArray(selector, this)
	}


	init.prototype = POE.fn

	POE.fn.extend({
		pushStack: function(elems) {

			// Build a new POE matched element set
			var ret = POE.merge(this.constructor(), elems)

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this

			// Return the newly-formed element set
			return ret
		},
		toArray: function() {
			return this.slice()
		},


		slice: function() {
			return this.pushStack(slice.apply(this, arguments))
		},

		// Execute a callback for every element in the matched set.
		each: function(callback) {
			return each(this, callback)
		},

		map: function(callback) {
			return this.pushStack(POE.map(this, function(elem, i) {
				return callback.call(elem, elem, i)
			}))
		},



		// For internal use only.
		// Behaves like an Array's method, not like a POE method.
		push: push,
		sort: arr.sort,
		splice: arr.splice,
	})

	if (typeof Symbol === 'function') {
		POE.fn[Symbol.iterator] = arr[Symbol.iterator]
	}
	rootPOE = POE(document)
	return POE
})