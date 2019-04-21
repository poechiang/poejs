define([
	'./core',
	'../external/sizzle'
], function(POE, sizzle) {
	'use strict'
	POE.extend({
		find: sizzle,
		expr: sizzle.selectors,
		uniqueSort: sizzle.uniqueSort,
		unique: sizzle.uniqueSort,
		text: sizzle.getText,
		isXMLDoc: sizzle.isXML,
		contains: sizzle.contains,
		escapeSelector: sizzle.escape,
		matchesSelector:sizzle.matchesSelector,
	})

	POE.expr[':']= sizzle.selectors.pseudos




	POE.expr.pseudos.hidden = function(elem) {
		return !POE.expr.pseudos.visible(elem)
	}
	POE.expr.pseudos.visible = function(elem) {
		return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
	}


	return POE
})