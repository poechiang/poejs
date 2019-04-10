define([
'./indexOf'
	],function(indexOf) {
	'use strict'

	return function(elem, arr, i) {
		return arr == null ? -1 : indexOf.call( arr, elem, i )
	}
})