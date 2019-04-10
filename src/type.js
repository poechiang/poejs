define([
	'./core',
	'./core/toType',
	'./core/isWindow',
	'./core/isFunction',
	'./core/isArrayLike',
	'./core/isPlainObject',

	'./type/array',
	'./type/string',
	'./type/date'
], function (POE, toType, isWindow, isFunction, isArrayLike, isPlainObject) {

	'use strict'

	POE.extend({
		type: toType,
		isFunction: isFunction,
		isWindow: isWindow,
		isString: function(obj) {
			return toType(obj) == 'string'
		},
		isArray: function(obj) {
			return Array.isArray(obj)
		},
		isBoolean: function(obj) {
			return toType(obj) == 'boolean'
		},
		isDate: function(obj) {
			return toType(obj) == 'date'
		},
		isNumber: function(obj){
			return toType(obj) =='number'
		},
		isObject: function(obj) {
			return toType(obj) == 'object'
		},
		isNull: function(obj) {
			return obj === null
		},
		isUndefined: function(obj) {
			return obj === undefined
		},
		likeArray: isArrayLike,
		isEmpty: function(obj) {
			if (obj === '') {
				return true
			}
			if (toType(obj) == 'number') {
				return false
			}

			for (var name in obj) {
				return false
			}
			return true
		},
		isPlainObject: isPlainObject,
		isEmptyObject: function( obj ) {
			var name;

			for ( name in obj ) {
				return false;
			}
			return true;
		},
	})
	return POE
})