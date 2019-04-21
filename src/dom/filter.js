define([
	'../core/grep',
], function(grep) {
	'use strict'

	return function(expr, elems, not) {
		var elem = elems[0]

		if (not) {
			expr = ':not(' + expr + ')'
		}

		if (elems.length === 1 && elem.nodeType === 1) {
			return POE.matchesSelector(elem, expr) ? [elem] : []
		}

		return POE.matches(expr, grep(elems, function(elem) {
			return elem.nodeType === 1
		}))
	}
})