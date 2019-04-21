define([
	'./core',
	'./http/core',
], function(POE, http) {
	'use strict'

	POE._evalUrl = function(url, options) {
		return http.request(url,{
			method: 'GET',
			type: 'script',
			cache: true,
			async: false,
			global: false,

			converters: {
				'text script': function() {}
			},
			dataFilter: function(response) {
				POE.eval(response, options)
			}
		})
	}

	http.get=function(url,options){
		options = options||{}
		options.method='GET'
		return http.request(url,options)
	}

	http.post=function(url,data,options){

		options = options||{}
		options.data = data
		return http.request(url,options)
	}

	POE.http = http
	return POE
})