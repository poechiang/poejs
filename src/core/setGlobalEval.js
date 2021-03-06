define(function() {
	'use strict'

	return function(elems, refElements) {
		var i = 0,
			l = elems.length

		for (; i < l; i++) {
			dataPriv.set(
				elems[i],
				'globalEval', !refElements || dataPriv.get(refElements[i], 'globalEval')
			)
		}
	}
})