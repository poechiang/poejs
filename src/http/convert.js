define(function() {

	'use strict'

	return function(options, response, xhr, isSuccess) {
		var 
			respHeaders = xhr.getAllResponseHeaders(),
			respHeader=xhr.getResponseHeader('Content-Type'),
			dataType = (options.type||respHeader).match(/text|html|json|jsonp|script/g)[0]

		switch(dataType){
			case 'json':
				return JSON.parse(response)
			default://text|html
				return response
		}

	}
})