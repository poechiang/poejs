define(function(){
	'use strict'

	return function (conditionFn, hookFn) {
		return {
			get: function() {
				if (conditionFn()) {

					delete this.get
					return
				}

				return (this.get = hookFn).apply(this, arguments)
			}
		}
	}
})