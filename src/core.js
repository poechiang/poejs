define([
	'./core/isFunction',
	'./core/isPlainObject'
], function(isFunction, isPlainObject) {
	'use strict'

	var version = '2.0.1',
		POE = function(selector, context) {
			return new POE.fn.init(selector, context);
		},
		extend = function() {
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			// Handle a deep copy situation
			if (typeof target === "boolean") {
				deep = target;

				// Skip the boolean and the target
				target = arguments[i] || {};
				i++;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if (typeof target !== "object" && !isFunction(target)) {
				target = {};
			}

			// Extend POE itself if only one argument is passed
			if (i === length) {
				target = this;
				i--;
			}

			for (; i < length; i++) {

				// Only deal with non-null/undefined values
				if ((options = arguments[i]) != null) {

					// Extend the base object
					for (name in options) {
						src = target[name];
						copy = options[name];

						// Prevent never-ending loop
						if (target === copy) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) ||
								(copyIsArray = Array.isArray(copy)))) {

							if (copyIsArray) {
								copyIsArray = false;
								clone = src && Array.isArray(src) ? src : [];

							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);

							// Don't bring in undefined values
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		}



	POE.fn = POE.prototype = {
		poe: version,
		constructor: POE,
		length: 0
	}


	POE.extend = POE.fn.extend = extend


	POE.extend({
		// Unique for each copy of POE on the page
		expando: "POE" + (version + Math.random()).replace(/\D/g, ""),

		// Assume POE is ready without the ready module
		isReady: true,

		guid: 1,
		now: Date.now
	})

	return POE
})