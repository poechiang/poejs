define([
	'./core',
	'./var/console'
], function(POE,console) {

	'use strict'


	var timeLogs = {
			_: false
		},
		color = {
			log: 'color:#616161;',
			info: 'color:#2196F3;',
			success: 'color:#4CAF50;',
			error: 'color:#FF5722;',
			warn: 'color:#FF9800;',
		},
		parseFormat = function(args) {

			var fmt = '%c'
			POE.map(args, function(item) {
				if (POE.isString(item)) {
					fmt += '%s '
				} else if (POE.isNumber(item)) {
					fmt += '%d '
				} else {
					fmt += '%o '
				}
			})
			return fmt
		}
	POE.con = {
		assert:function(msg, condi) {
			console.assert(condi, msg)
		},
		clear: console.clear,
		count:function(label, reset) {
			if (label === false) {
				console.countReset()
			} else if (reset === false) {
				!!label ? console.countReset(label) : console.countReset()
			} else {
				!!label ? console.count(label) : console.count()
			}
		},
		dir:function(obj, xml) {
			if (xml) {
				console.dir(obj)
			} else {
				console.dirxml(obj)
			}
		},
		error:function() {
			var args = POE.toArray(arguments)
			console.error.apply(console, [parseFormat(args),color.error].concat(args))
		},
		group:function(label, fn, collapsed) {
			if (collapsed) {
				console.groupCollapsed(label)
			} else {
				console.group(label)
			}
			if (POE.isFunction(fn)) {
				fn(POE.console)
			} else {
				console.log(fn)
			}
			console.groupEnd(label)
		},

		log:function() {
			var args = POE.toArray(arguments)
			console.log.apply(console, [parseFormat(args),color.log].concat(args))
		},
		info:function() {
			var args = POE.toArray(arguments)
			console.log.apply(console, [parseFormat(args),color.info].concat(args))
		},
		table: console.table,
		time:function(label, fn) {
			label = label || '_'
			if(timeLogs[label]){
				console.timeLog(label)
			}
			else{
				console.time(label)
				timeLogs[label]
			}

			if (fn) {
				fn(POE.console)
				console.timeEnd(label)
				delete timeLogs[label]
			}
		},
		debug:function(msg) {
			POE.support.debug && this.log(msg)
		},
		trace: console.trace,
		warn:function() {
			var args = POE.toArray(arguments)
			console.warn.apply(console, [parseFormat(args),color.warn].concat(args))
		},
	}

	return POE

})