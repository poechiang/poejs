define([
	'../core'
], function(POE) {

	'use strict'
	var rootPOE,
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
		init = POE.fn.init = function(selector, context, root) {
			return POE.makeArray(selector, this)
		}

	init.prototype = POE.fn

	rootPOE = POE(document)

	return init

})