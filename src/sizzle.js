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
		escapeSelector: sizzle.escape
	})

	POE.expr[":"]= sizzle.selectors.pseudos

	return POE
})