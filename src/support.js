define([
	'./core',
	'./var/document'
], function(POE, document) {

	'use strict'

	var canCreateHTMLDocument = function() {
			var body = document.implementation.createHTMLDocument('').body
			body.innerHTML = '<form></form><form></form>'
			return body.childNodes.length === 2
		}


	POE.support = {
		createHTMLDocument: canCreateHTMLDocument()
	}

	return POE
})