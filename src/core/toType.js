define([
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
})