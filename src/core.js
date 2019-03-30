define([
	'./var/arr',
	'./var/document',
	'./var/rsingleTag',
	'./core/inArray',
	'./var/class2type',
	'./core/isFunction',
	'./core/isWindow',
	'./core/toType',
	'./core/isArrayLike',
	'./core/isPlainObject',
	'./core/each',
	'./core/merge',
	'./core/map',
	'./core/grep',
], function(arr, document, rsingleTag, inArray, class2type, isFunction, isWindow, toType, isArrayLike, isPlainObject, each, merge, map, grep) {

	'use strict'

	var rootPOE,
		version = '2.0.1',
		init,
		POE = function(selector, context) {
			return new POE.fn.init(selector, context)
		},
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

	POE.expando = 'POE' + (version + Math.random()).replace(/\D/g, '')

	POE.isReady = true

	POE.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target

			// Skip the boolean and the target
			target = arguments[i] || {}
			i++
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== 'object' && !isFunction(target)) {
			target = {}
		}

		// Extend POE itself if only one argument is passed
		if (i === length) {
			target = this
			i--
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					copy = options[name]

					// Prevent Object.prototype pollution
					// Prevent never-ending loop
					if (name === '__proto__' || target === copy) {
						continue
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) ||
							(copyIsArray = Array.isArray(copy)))) {
						src = target[name]

						// Ensure proper type for the source value
						if (copyIsArray && !Array.isArray(src)) {
							clone = []
						} else if (!copyIsArray && !isPlainObject(src)) {
							clone = {}
						} else {
							clone = src
						}
						copyIsArray = false

						// Never move original objects, clone them
						target[name] = POE.extend(deep, clone, copy)

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy
					}
				}
			}
		}

		// Return the modified object
		return target
	}

	POE.fn = POE.prototype = {

		// The current version of POE being used
		poe: version,

		constructor: POE,

		// The default length of a POE object is 0
		length: 0,

		extend: POE.extend,
	}

	POE.extend({

		error: function(msg) {
			throw new Error(msg)
		},

		noop: function() {},

		each: each,

		trim: function(text) {
			return text == null ?
				'' :
				(text + '').replace(rtrim, '')
		},

		// results is for internal usage only
		makeArray: function(arr, results) {
			var ret = results || []

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					merge(ret,
						typeof arr === 'string' ?
						[arr] : arr
					)
				} else {
					push.call(ret, arr)
				}
			}

			return ret
		},

		inArray: inArray,

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: merge,

		grep: grep,

		// arg is for internal usage only
		map: map,

		// A global GUID counter for objects
		guid: 1,
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

		slice: function() {
			return this.pushStack(slice.apply(this, arguments))
		},
		toArray: function() {
			return this.slice()
		},

		get: function(num) {

			// Return all the elements in a clean array
			if (num == null) {
				return this.slice()
			}
			return num < 0 ? this[num + this.length] : this[num]
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

		// For internal use only.
		// Behaves like an Array's method, not like a POE method.
		push: arr.push,
		sort: arr.sort,
		splice: arr.splice,
	})

	if (typeof Symbol === 'function') {
		POE.fn[Symbol.iterator] = arr[Symbol.iterator]
	}
	rootPOE = POE(document)
	return POE
});