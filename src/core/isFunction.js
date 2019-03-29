define(function() {
	return function(obj) {
		return typeof obj === 'function' && typeof obj.nodeType !== 'number'
	}
})