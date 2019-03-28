define(function(){
	'use strict'

	var arr=[],
		proto = Object.prototype,
		version = "2.0.1",

		// Define a local copy of POE
		POE = function( selector, context ) {

			// The POE object is actually just the init constructor 'enhanced'
			// Need init if POE is called (just allow error to be thrown if not included)
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
			if ( typeof target !== "object" && !POE.isFunction(target) ) {
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
						if ( deep && copy && ( POE.isPlainObject( copy ) ||
							( copyIsArray = POE.isArray( copy ) ) ) ) {

							if ( copyIsArray ) {
								copyIsArray = false;
								clone = src && POE.isArray( src ) ? src : [];

							} else {
								clone = src && POE.isPlainObject( src ) ? src : {};
							}

							// Never move original objects, clone them
							target[ name ] = POE.extend( deep, clone, copy );

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

		// The current version of POE being used
		poe: version,

		constructor: POE,

		// The default length of a POE object is 0
		length: 0,


	}



	POE.extend = POE.fn.extend = extend


	POE.extend( {

		// Unique for each copy of POE on the page
		expando: "POE" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume POE is ready without the ready module
		isReady: true,


		// A global GUID counter for objects
		guid: 1,

		noop: function() {},

 		isString : function(arg){
 			return POE.type(arg) == 'string'
 		},
 		isObject : function(arg){
 			return POE.type(arg) == 'object'
 		},
 		isNumber : function (arg) {
			return POE.type(arg) == 'number' && !isNaN(arg);
		},
		isDate : function (arg) {
			return POE.type(arg) == 'date';
		},
		isArray : function (arg) {
			return Array.isArray(arg);
		},
		isBoolean : function (arg) {
			return POE.type(arg) == 'boolean';
		},
		isFunction : function (arg) {
			//return POE.type(arg) == 'function';
			return typeof arg === "function" && typeof arg.nodeType !== "number";
		},
		isNull : function (arg) {
			return arg === null;
		},
		isUndefined : function (arg) {
			return arg === undefined;
		},

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isEmpty: function( obj ) {

			if (obj === '') {
				return true
			}
			if (POE.isNumber(obj)) {
				return false
			}

			for ( var name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				obj[ obj.toString.call( obj ) ] || "object" :
				typeof obj;
		},
		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
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
		each: function( obj, callback ) {
			var length, i = 0;

			if ( obj && POE.likeArray( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : [].indexOf.call( arr, elem, i );
		},

	 	likeArray : function(obj) {

			var length = !!obj && "length" in obj && obj.length,
				type = POE.type(obj);

			if (type === "function" || POE.isWindow(obj)) {
				return false;
			}

			return type === "array" || length === 0 ||
				typeof length === "number" && length > 0 && (length - 1) in obj;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( obj && POE.likeArray(  ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},


		isPlainObject: function( obj ) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of POE.type to catch host objects
			if ( !obj || obj.toString.call( obj ) !== "[object Object]" ) {
				return false;
			}

			proto = Object.getPrototypeOf( obj );

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = obj.hasOwnProperty.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && obj.hasOwnProperty.toString.call( Ctor ) === obj.hasOwnProperty.toString.call( Object );
		},
		createObjectURL:function(file){
			return window.createObjectURL(file)
		},
		uuid:function(len,radix){
			//return (new Date).to()+''+Math.floor(Math.random()*999+1)
			var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		    var uuid = [], i;
		    radix = radix || chars.length;
		 
		    if (len) {
		      // Compact form
		      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
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
		          r = 0 | Math.random()*16;
		          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		        }
		      }
		    }
		 
		    return uuid.join('');
		},
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
		splice: arr.splice
	})

	POE.fn.extend( {
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
})