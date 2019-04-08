define([
	'../var/document',
	'./var/cssProps',
], function(document, cssProps) {
	'use strict'

	var emptyStyle = document.createElement('div').style
	var vendorPropName = function(name) {
		if (name in emptyStyle) {
			return name
		}
		var capName = name[0].toUpperCase() + name.slice(1),
			i = cssPrefixes.length

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name
			}
		}
	}


	return function(name) {
		var ret = cssProps[name]
		if (!ret) {
			ret = cssProps[name] = vendorPropName(name) || name
		}
		return ret
	}
})