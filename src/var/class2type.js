define(function() {
	'use strict'

	var class2type = {}
	"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").map(function(name, i) {
		class2type["[object " + name + "]"] = name.toLowerCase()
	})
	return class2type
})