define( [
	"../core"
], function( POE ) {

"use strict";

// Register as a named AMD module, since POE can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase poe is used because AMD module names are
// derived from file names, and POE is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of POE, it will work.

// Note that for maximum portability, libraries that are not POE should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. POE is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "poe", [], function() {
		return POE;
	} );
}

} );
