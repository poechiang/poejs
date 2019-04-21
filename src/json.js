define([
	'./core',
	'./json/core'
], function(POE, json) {
	'use strict'

	POE.JSON = window.JSON || (window.JSON = json)

	POE.extend({
		json: function(arg) {
			var test = false
			try {

				if (POE.isString(arg)) {
					if(arg.startWith('?')){
						test = true
						arg = arg.substr(1)
						POE.JSON.parse(arg)
						return true
					}
					else{
						return POE.JSON.parse(arg)
					}
					
				} else if (POE.isPlainObject(arg)) {
					return POE.JSON.stringify(arg)
				} else {
					throw '无效的json字符串或对象格式'
				}
			} catch (err) {
				if (test) {
					return false
				}
				else{
					POE.con.error(err)
				}
			}
		}
	})

	return POE
})