define(function() {
	'use strict'

	return function(data) {
		var xml
		if (!data || typeof data !== 'string') {
			return null
		}

		try {
			xml = (new window.DOMParser()).parseFromString(data, 'text/xml')
		} catch (e) {
			xml = undefined
		}

		if (!xml || xml.getElementsByTagName('parsererror').length) {
			POE.con.error('Invalid XML: ' + data)
		}
		return xml
	};
})