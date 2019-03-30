define([
	'./merge',
	'./isArrayLike'
], function(merge,isArrayLike) {
	'use strict'
	return function(arr, results) {
		var ret = results || [];

		if (arr != null) {
			if (isArrayLike(Object(arr))) {
				merge(ret,
					typeof arr === "string" ?
					[arr] : arr
				)
			} else {
				ret.push(arr)
			}
		}

		return ret
	}
})