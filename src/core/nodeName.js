define(function() {
	'use strict'

	return function(elem, name) {

		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()

	}
})