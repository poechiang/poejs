define(['./version'],function(version){
	'use strict'

	var expando = 'POE' + (version + Math.random()).replace(/\D/g, '')

	return expando||(expando='POE' + (version + Math.random()).replace(/\D/g, ''))
})