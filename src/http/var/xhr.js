define(function() {
	'use strict'

	return function(){
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			return new window.XMLHttpRequest();
		} else { // code for IE6, IE5
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}

})