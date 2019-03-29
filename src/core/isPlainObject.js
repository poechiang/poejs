define(function() {
	return function(obj) {
		var proto, ctor
		if (!obj || obj.toString() !== "[object Object]") {
			return false;
		}

		proto = Object.getPrototypeOf(obj)

		if (!proto) {
			return true;
		}

		ctor = proto.hasOwnProperty('constructor') && proto.constructor
		return typeof ctor === "function" && ctor.hasOwnProperty.toString() === Object.hasOwnProperty.toString()
	}
})