/*!
 * POE JavaScript Library v@VERSION
 * https://poe.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://poe.org/license
 *
 * Date: @DATE
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get POE.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var POE = require("poe")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "POE requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of POE 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";
define( 'var/class2type',[],() => {
	'use strict'
	return {}
} );
define('core/toString',[
	'../var/class2type'
], (class2type) => {
	'use strict'

	return class2type.toString
});
define('core/toType',[
	'../var/class2type',
	'./toString'
], (class2type, toString) => {
	'use strict'

	return obj => {
		if (obj == null) {
			return obj + ''
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[toString.call(obj)] || "object" :
			typeof obj;
	}
});
/*
 * isWidnow
 */
define('core/isWindow',[],()=>{
	
	'use strict'
	
	return obj => {
		return obj != null && obj === obj.window
	}
});
define('core/isNumber',[
	'./toType'
], (toType) => {
	'use strict'

	return obj => {
		return toType(obj) == 'number' && !isNaN(obj)
	}
});
define( 'core/hasOwn',[
		'../var/class2type'
	], (class2type) => {
	'use strict'

	return class2type.hasOwnProperty
} );
define( 'core/getProto',[],() => {
	'use strict'

	return Object.getPrototypeOf
} );
define('core/fnToString',[
	'./hasOwn'
], (hasOwn) => {
	'use strict'

	return hasOwn.toString
});
define('core/type',[
	'../core',
	'./toType',
	'./isWindow',
	'./isNumber',
	'./hasOwn',
	'./toString',
	'./getProto',
	'./fnToString'
], (POE, toType, isWindow, isNumber, hasOwn, toString, getProto, fnToString) => {

	'use strict'

	POE.type = {
		get: toType,
		isFunction: obj => {
			return typeof obj === "function" && typeof obj.nodeType !== "number"
		},
		isWindow: isWindow,
		isString: obj => {
			return toType(obj) == 'string'
		},
		isArray: obj => {
			return Array.isArray(obj)
		},
		isBoolean: obj => {
			return toType(obj) == 'boolean'
		},
		isDate: obj => {
			return toType(obj) == 'date'
		},
		isNumber: isNumber,
		isObject: obj => {
			return toType(obj) == 'object'
		},
		isNull: obj => {
			return obj === null
		},
		isUndefined: obj => {
			return obj === undefined
		},
		likeArray: obj => {

			var length = !!obj && "length" in obj && obj.length,
				type = toType(obj)

			if (type === "function" || isWindow(obj)) {
				return false
			}

			return type === "array" || length === 0 ||
				typeof length === "number" && length > 0 && (length - 1) in obj
		},
		isEmpty: obj => {
			if (obj === '') {
				return true
			}
			if (isNumber(obj)) {
				return false
			}

			for (var name in obj) {
				return false
			}
			return true
		},
		isPlainObject: obj => {
			var proto, Ctor
			if (!obj || toString.call(obj) !== "[object Object]") {
				return false
			}
			if (!getProto) {
				return true;
			}
			Ctor = hasOwn.call(getProto, "constructor") && getProto.constructor;
			return typeof Ctor === "function" && fnToString.call(Ctor) === fnToString.call(Object);

		}
	}

	return POE.type
});
define('var/document',[],() => {

	'use strict'

	return window.document
});
define('core/DOMEval',[
	"../var/document"
], document => {
	"use strict";

	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval(code, node, doc) {
		doc = doc || document;

		var i, val,
			script = doc.createElement("script");

		script.text = code;
		if (node) {
			for (i in preservedScriptAttributes) {
				val = node[i] || node.getAttribute && node.getAttribute(i);
				if (val) {
					script.setAttribute(i, val);
				}
			}
		}
		doc.head.appendChild(script).parentNode.removeChild(script);
	}

	return DOMEval;
});
define('core/buildUuid',[],() => {
	return (len, radix) => {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [],
			i;
		radix = radix || chars.length;

		if (len) {
			// Compact form
			for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
		} else {
			// rfc4122, version 4 form
			var r;

			// rfc4122 requires these characters
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';

			// Fill in random data.  At i==19 set the high bits of clock sequence as
			// per rfc4122, sec. 4.1.5
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}

		return uuid.join('');
	}
});
define('core/each',[
		'./type'
	],(type)=>{
	return function( obj, callback ) {
			var length, i = 0;

			if ( obj && type.likeArray( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], obj[ i ], i ) === false ) {
						break
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], obj[ i ], i ) === false ) {
						break
					}
				}
			}

			return obj
		}
});
define('var/noop',[],() => {
	'use strict'

	return () => {}

});
define('core',[
	"./core/type",
	"./core/DOMEval",
	'./core/buildUuid',
	'./core/each',
	"./var/noop"
], function(type, DOMEval, buildUuid,each,noop ){
	'use strict'

	var version ='2.0.1',
		POE = function( selector, context ) {
			return new POE.fn.init( selector, context );
		},
		extend = function() {
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[ 0 ] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			// Handle a deep copy situation
			if ( typeof target === "boolean" ) {
				deep = target;

				// Skip the boolean and the target
				target = arguments[ i ] || {};
				i++;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if ( typeof target !== "object" && !type.isFunction(target) ) {
				target = {};
			}

			// Extend POE itself if only one argument is passed
			if ( i === length ) {
				target = this;
				i--;
			}

			for ( ; i < length; i++ ) {

				// Only deal with non-null/undefined values
				if ( ( options = arguments[ i ] ) != null ) {

					// Extend the base object
					for ( name in options ) {
						src = target[ name ];
						copy = options[ name ];

						// Prevent never-ending loop
						if ( target === copy ) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if ( deep && copy && ( type.isPlainObject( copy ) ||
							( copyIsArray = type.isArray( copy ) ) ) ) {

							if ( copyIsArray ) {
								copyIsArray = false;
								clone = src && type.isArray( src ) ? src : [];

							} else {
								clone = src && type.isPlainObject( src ) ? src : {};
							}

							// Never move original objects, clone them
							target[ name ] = extend( deep, clone, copy );

						// Don't bring in undefined values
						} else if ( copy !== undefined ) {
							target[ name ] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		}



	POE.fn = POE.prototype = {
		poe: version,
		constructor: POE,
		length: 0
	}

console.log(123)

	POE.extend = POE.fn.extend = extend


	POE.extend( {
		// Unique for each copy of POE on the page
		expando: "POE" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume POE is ready without the ready module
		isReady: true,

		guid: 1,

		noop: noop,
		eval:DOMEval,

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},
		each: each,

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : [].indexOf.call( arr, elem, i );
		},

		map: map,


		createObjectURL:function(file){
			return window.createObjectURL(file)
		},
		uuid:buildUuid,
		now: Date.now
	} )

	POE.fn.extend({

		toArray: function() {
			return arr.slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {

			// Return all the elements in a clean array
			if ( num == null ) {
				return [].slice.call( this );
			}

			// Return just the one element from the set
			return num < 0 ? this[ num + this.length ] : this[ num ];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new POE matched element set
			var ret = POE.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return POE.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( POE.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a POE method.
		push: arr.push,
		sort: arr.sort,
		splice: arr.splice,
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( POE( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( POE.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			ret = this.pushStack( [] );

			for ( i = 0; i < len; i++ ) {
				POE.find( selector, self[ i ], ret );
			}

			return len > 1 ? POE.uniqueSort( ret ) : ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					POE( selector ) :
					selector || [],
				false
			).length;
		}
	} );

	return POE
});
define( 'exports/amd',[
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

define( 'exports/global',[
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

define('poe',[
	'./core',
	'./exports/amd',
	'./exports/global',
],function( POE ){
	'use strict'


	// // 自动填写移动设备适配head内容
	// var $script = $('script[src*="/poe."][poe]').last()

	// if ( $$.support.isMobilePlatform ) {

	// 	// var opt = JSON.parse($script.data('opt'))
	// 	// console.log(opt)
	// 	$$.dom.meta({
	// 		viewport:'width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
	// 		appleMobileWebAppCapable:'yes',
	// 		appleMobileWebAppStatusBarStyle:'black',
	// 		formatDetection:'telephone=no'
	// 	})
	// 	$$.dom.link('144.png','apple-touch-icon-precomposed','144x144')
	// 	$$.dom.link('72.png','apple-touch-icon-precomposed','72x72')
	// 	$$.dom.link('57.png','apple-touch-icon-precomposed','57x57')
	// }


	// $(window).scroll(function(e){
 //        var $win=$(window),
 //        	doc = window.document,
 //            wh=$win.height(),
 //            dh=$(doc).height(),
 //            sh=$(doc).scrollTop()
 //        if (sh>=dh-wh) {
 //            var $ajaxLoader=$('.ajax-loader')

 //            $ajaxLoader.each(function(){
 //                var $this=$(this),
 //                	data = POE(this).data()
 //                if ($this.is('.auto-load')) {
 //                    //setTimeout(function(){
 //                        data.load();
 //                    //},1000)
 //                }
                
 //            })
 //        }
 //    })
    
 //    var $form = $('form.ajax-submit')

 //    $form.attr('novalidate',true).submit(function(){
 //        var uploader = $$('form').data()
 //        try{

 //            uploader.submit()
 //            return false
 //        }
 //        catch(err){
 //            POE.error(err)
 //            return false
 //        }
 //    })
    
    

    
	try {
		if (window.console && window.console.log) {
			console.log('欢迎使用POE前端框架，如有建议期待与您交流： \nhttps://poechiang.tech');
		}
	} catch (e) {}

	return POE
	
});

	return POE;
} );
