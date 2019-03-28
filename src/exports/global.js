define( [
	"../core"
], function( POE, noGlobal ) {

"use strict";

var

	// Map over POE in case of overwrite
	_POE = window.POE,

	// Map over the $$ in case of overwrite
	_$$ = window.$$;

POE.noConflict = function( deep ) {
	if ( window.$$ === POE ) {
		window.$$ = _$$;
	}

	if ( deep && window.POE === POE ) {
		window.POE = _POE;
	}

	return POE;
};

// Expose POE and $$ identifiers, even in AMD
// (#7102#comment:10, https://github.com/poe/poe/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	POE.global = window
	window.POE = window.$$ = POE;
}

} );
