define([
	'./toType',
	'./isWindow',
	'./isNumber',
	'./hasOwn',
	'./toString',
	'./getProto',
	'./fnToString'
], (toType, isWindow, isNumber, hasOwn, toString, getProto, fnToString) => {

	'use strict'

	return {
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
})