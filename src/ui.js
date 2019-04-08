define([
	'./core'
], function(POE) {

	'use strict'

	const modalHTML = ''
	const notifyHTML = '<div class="poe-notify {{type}}"><p>{{content}}</p></div>'
	var _def_ = {
		ref:'_def_',
		head:{
			text:false,
			min:false,
			close:false
		},
		anim:false,
		mask:true,
		align:'center',
		during:400,
		delay:0,
		cancel:{
			text:'取消',
			cb:function(){},
			color:'#888888',
		},
		confirm:{
			text:'确认',
			cb:function(){},
			color:'#414141',
		}
	},
	uiInst = {
		notify:{},
		modal:{},
		toast:{},
		loading:{},
		verif:{},
		input:{}
	},
	initDom = function(type){
		switch(type){
			case 'notify':

			default:
		}
	},

	POE.ui = {
		modal(content, options) {
			
		},
		toast(content, options) {

		},
		loading(content, options) {

		},
		notify(content, options) {
			if (POE.isString(options)) {
				options = POE.extend(_def_,{ref:options})
			}
		},
		verif(content, options) {

		},
		input(content, options) {

		}
	}

})