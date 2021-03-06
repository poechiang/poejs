define(function() {
	'use strict'


	return function(elem) {
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window
		}

		return view.getComputedStyle(elem)
	}

})