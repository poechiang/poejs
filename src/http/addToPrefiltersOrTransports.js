define([
	'../var/rnothtmlwhite'
], function(rnothtmlwhite) {
	'use strict'

	return function(structure,dataTypeExpression, func) {

		if (typeof dataTypeExpression !== "string") {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

		if (POE.isFunction(func)) {

			// For each dataType in the dataTypeExpression
			while ((dataType = dataTypes[i++])) {

				// Prepend if requested
				if (dataType[0] === "+") {
					dataType = dataType.slice(1) || "*";
					(structure[dataType] = structure[dataType] || []).unshift(func);

					// Otherwise append
				} else {
					(structure[dataType] = structure[dataType] || []).push(func);
				}
			}
		}
	}
})