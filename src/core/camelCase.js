define(function() {

	'use strict'
	
	var rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g



	function camelCase(string) {
		return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, function(all, letter) {
			return letter.toUpperCase()
		})
	}

	return camelCase

})