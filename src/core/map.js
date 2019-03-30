define([
	'./isArrayLike'
], function(isArrayLike) {
	'use strict'
	return function(elems, callback, arg) {
		var length, value,
			i = 0,
			ret = []

		// Go through the array, translating each of the items to their new values
		if (isArrayLike(elems)) {
			length = elems.length
			for (; i < length; i++) {
				value = callback(elems[i], i, arg)

				if (value != null) {
					ret.push(value)
				}
			}

			// Go through every key on the object,
		} else {
			for (i in elems) {
				value = callback(elems[i], i, arg)

				if (value != null) {
					ret.push(value)
				}
			}
		}

		// Flatten any nested arrays
		return [].concat(ret)
	}
})