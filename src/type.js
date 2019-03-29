define([
	'./core',
	'./core/toType',
	'./core/isWindow',
	'./core/isFunction',
	'./core/isNumber',
	'./core/hasOwn',
	'./core/toString',
	'./core/getProto',
	'./core/fnToString',
	'./core/likeArray',
	'./core/isPlainObject'
], function (POE, toType, isWindow, isFunction, isNumber, hasOwn, toString, getProto, fnToString, likeArray, isPlainObject) {

	'use strict'

	POE.type = {
		get: toType,
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
		isNumber: isNumber,
		isObject: function(obj) {
			return toType(obj) == 'object'
		},
		isNull: function(obj) {
			return obj === null
		},
		isUndefined: function(obj) {
			return obj === undefined
		},
		likeArray: likeArray,
		isEmpty: function(obj) {
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
		isPlainObject: isPlainObject
	}

	return POE.type
})