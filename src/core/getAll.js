define([
	'./merge'
], function(merge) {
	'use strict'

	return function(context, tag) {

		var ret

		if (typeof context.getElementsByTagName !== 'undefined') {
			ret = context.getElementsByTagName(tag || '*')

		} else if (typeof context.querySelectorAll !== 'undefined') {
			ret = context.querySelectorAll(tag || '*')

		} else {
			ret = []
		}

		if (tag === undefined || tag && (context.nodeName && context.nodeName.toLowerCase() === tag.toLowerCase())) {
			return merge([context], ret)
		}

		return ret
	}
})