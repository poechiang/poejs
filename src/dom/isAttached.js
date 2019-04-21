define([
	'../var/documentElement'
], function(documentElement) {
	'use strict'


	var isAttached = function(elem) {
			return POE.contains(elem.ownerDocument, elem)
		},
		composed = {
			composed: true
		}

	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	if (documentElement.attachShadow) {
		isAttached = function(elem) {
			return POE.contains(elem.ownerDocument, elem) ||
				elem.getRootNode(composed) === elem.ownerDocument
		}
	}
	return isAttached
})