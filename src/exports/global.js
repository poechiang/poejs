define([
	"../core"
], function(POE, noGlobal) {

	"use strict";

	var _POE = window.POE,
		_$$ = window.$$;

	POE.noConflict = function(deep) {
		if (window.$$ === POE) {
			window.$$ = _$$;
		}

		if (deep && window.POE === POE) {
			window.POE = _POE;
		}

		return POE;
	}

	if (!noGlobal) {
		POE.global = window
		window.POE = window.$$ = POE;
	}

})