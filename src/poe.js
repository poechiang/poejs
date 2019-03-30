define([
	'./core',
	'./selector',
	'./callbacks',
	'./dom',
	'./deferred',
	'./globalEval',
	'./support',
	'./type',
	'./exports/amd',
	'./exports/global'

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
		if (window.console && window.console.log) {
			console.log('欢迎使用POE前端框架\n框架作者： \t\thttps://poechiang.tech\n文档及API说明： \thttps://poejs.poechiang.tech');
		}
	} catch (e) {}

	return POE

})