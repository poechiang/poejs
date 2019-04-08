define([
	'../var/rnothtmlwhite'
], function(rnothtmlwhite) {
	'use strict'



	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	return function(value) {
		var tokens = value.match(rnothtmlwhite) || []
		return tokens.join(' ')
	}

})