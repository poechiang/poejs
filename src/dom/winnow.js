define([
	'./filter',
	'../core/isFunction',
	'../core/grep'
], function(filter, isFunction, grep) {
	'use strict'

	return function(elements, qualifier, not) {
		if (isFunction(qualifier)) {
			return grep(elements, function(elem, i) {
				return !!qualifier.call(elem, i, elem) !== not
			})
		}

		if (qualifier.nodeType) {
			return grep(elements, function(elem) {
				return (elem === qualifier) !== not
			})
		}

		if (typeof qualifier !== 'string') {
			return grep(elements, function(elem) {
				return (qualifier.indexOf(elem) > -1) !== not
			})
		}

		return filter(qualifier, elements, not)
	}
})