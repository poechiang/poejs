define([
	'./isAttached'
], function(isAttached) {
	'use strict'
	return function(elem, el) {

		// isHiddenWithinTree might be called from POE#filter function
		// in that case, element will be second argument
		elem = el || elem

		// Inline style trumps all
		return elem.style.display === 'none' ||
			elem.style.display === '' &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached(elem) &&

			POE.css(elem, 'display') === 'none'
	}
})