define([
	'./parseXML',
	'./allTypes',
], function(parseXML,allTypes) {
	'use strict'

	var allTypes = '*/'.concat('*')

	return {
		global: true,
		url: location.href,
		method: 'POST',
		cache: true,
		async: true,
		contentType: 'application/x-www-form-urlencoded',
		type: '', //xml|html|script|json|jsonp|text
		headers:{},
		processData:true,
		accepts: {
			'*': allTypes,
			text: 'text/plain',
			html: 'text/html',
			xml: 'application/xml, text/xml',
			json: 'application/json, text/javascript',
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/,
			script: /\b(?:java|ecma)script\b/
		},
		responseFields: {
			xml: 'responseXML',
			text: 'responseText',
			json: 'responseJSON'
		},
		converters: {
			'* text': String,
			'text html': true,
			'text json': JSON.parse,
			'text xml': parseXML,
			'text script': function(text) {
				POE.eval(text);
				return text;
			}
		},
	}
})