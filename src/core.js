define([
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
		type:type,

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
})