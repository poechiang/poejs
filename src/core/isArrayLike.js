define([
	'./toType',
	'./isFunction',
	'./isWindow'
], function(toType, isFunction, isWindow) {
	return function(obj) {
		var length = !!obj && "length" in obj && obj.length,
			type = toType(obj)

		if (isFunction(obj) || isWindow(obj)) {
			return false
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj
	}
})