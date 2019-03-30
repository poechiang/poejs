define(function(){
	'use strict'

	return function( elem, arr, i ) {
		return arr == null ? -1 : arr.indexOf(elem, i )
	}
})