define([
	'./core',
	'./var/support',
], function(POE, support) {

	'use strict'


	POE.debug = function(debug) {
		support.debug = debug
	}

	POE.support = support
	return POE
})