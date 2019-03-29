define([
	'./core',
	'./core/init'
],function( POE ){
	'use strict'

	try {
		if (window.console && window.console.log) {
			console.log('欢迎使用POE前端框架，如有建议期待与您交流： \nhttps://poechiang.tech');
		}
	} catch (e) {}

	return POE
	
})