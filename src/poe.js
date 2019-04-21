define([
	'./core',
	'./support',
	'./type',
	'./sizzle',

	'./attr',
	'./cache',
	'./callbacks',
	'./class',
	'./console',
	'./css',
	'./data',
	'./dom',
	'./event',
	'./deferred',
	'./json',
	'./md5',
	'./prop',
	'./http',
	'./ui',
], function(POE) {
	'use strict'


	var readyList = POE.Deferred(),
		doc = window.document

	POE.fn.ready = function(fn) {

		readyList.then(fn).catch(function(error) {
			setTimeout(function() {
				throw error
			})
		})

		return this
	}
	POE.extend({

		isReady: false,

		readyWait: 1,

		ready: function(wait) {

			if (wait === true ? --POE.readyWait : POE.isReady) {
				return
			}

			POE.isReady = true

			if (wait !== true && --POE.readyWait > 0) {
				return
			}

			readyList.resolveWith(document, [POE])
		}
	})

	POE.ready.then = readyList.then

	function completed() {
		doc.removeEventListener('DOMContentLoaded', completed)
		window.removeEventListener('load', completed)
		POE.ready()
	}

	if (doc.readyState === 'complete' || (doc.readyState !== 'loading' && !doc.documentElement.doScroll)) {

		window.setTimeout(POE.ready)

	} else {

		doc.addEventListener('DOMContentLoaded', completed)

		window.addEventListener('load', completed)
	}


	try {



		var win = window
		POE.createObjectURL = window.createObjectURL || window.URL && window.URL.createObjectURL || window.webkitURL && window.webkitURL.createObjectURL



		POE.con.info('欢迎使用POE前端框架\n框架作者： \t\thttps://poechiang.tech\n文档及API说明： \thttps://poejs.poechiang.tech')

	} catch (e) {
		throw e
	}


	if (typeof define === 'function' && define.amd) {
		define('poe', [], function() {
			return POE
		})
	}



	var

		// Map over POE in case of overwrite
		_POE = window.POE,

		// Map over the $ in case of overwrite
		_$$ = window.$$

	POE.noConflict = function(deep) {
		if (window.$$ === POE) {
			window.$$ = _$$
		}

		if (deep && window.POE === POE) {
			window.POE = _POE
		}

		return POE
	}

	if (!noGlobal) {
		window.POE = window.$$ = POE
	}



	return POE

})