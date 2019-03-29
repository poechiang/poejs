define([
	'./toType'
], (toType) => {
	'use strict'

	return obj => {
		return toType(obj) == 'number' && !isNaN(obj)
	}
})