define(['../var/class2type'],function(class2type) {
	'use strict'
	return function(obj) {
		if (obj == null) {
			return obj + ""
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[obj.toString()] || "object" :
			typeof obj
	}
})