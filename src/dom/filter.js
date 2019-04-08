define([
	'../../external/sizzle',
	'../core/grep'
], function(sizzle, grep) {
	'use strict'

	return function(expr, elems, not) {
		var elem = elems[0]

		if (not) {
			expr = ':not(' + expr + ')'
		}

		if (elems.length === 1 && elem.nodeType === 1) {
			return sizzle.matchesSelector(elem, expr) ? [elem] : []
		}

		return sizzle.matches(expr, grep(elems, function(elem) {
			return elem.nodeType === 1
		}))
	}
})