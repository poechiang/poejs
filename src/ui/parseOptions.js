define([
'./_def_'
	],function(_def_){
	'use strict'

	return function(options,uiOpt){
		if (!options || POE.isString(options)) {
			if (uiOpt.ui=='notify') {
				options = {type:options||'info'}
			} else if (uiOpt.ui=='toast') {
				options = {type:options||'success'}
			}else if (uiOpt.ui=='modal') {
				options = {title:options||false}
			}
			else{
				options = {ref:options||'_def_'}	
			}
		}

		options = POE.extend(true,{},_def_,uiOpt||{},options||{})

		var title = options.title||false,
			abort = options.abort,
			cancel = options.cancel,
			confirm = options.confirm,
			icon = options.icon||{color:'#ffffff'}

		if (POE.isString(title)) {
			title = {text:title}
		}
		options.title =title

		if (icon && POE.isString(icon)) {
			icon = {color:icon}
		}
		options.icon = icon

		if (POE.isString(abort)) {
			if (abort.startWith('#')) {
				abort = {color:abort}
			}
			else{
				abort = {text:abort}
			}
		}
		else if (POE.isFunction(abort)){
			abort = {cb:abort}
		}
		options.abort = abort===false?false:(abort||{})

		if (POE.isString(cancel)) {
			if (cancel.startWith('#')) {
				cancel = {color:cancel}
			}
			else{
				cancel = {text:cancel}
			}
		}
		else if (POE.isFunction(cancel)){
			cancel = {cb:cancel}
		}
		options.cancel = cancel===false?false:(cancel||{})

		if (POE.isString(confirm)) {
			if (confirm.startWith('#')) {
				confirm = {color:confirm}
			}
			else{
				confirm = {text:confirm}
			}
		}
		else if (POE.isFunction(confirm)){
			confirm = {cb:confirm}
		}
		options.confirm = confirm===false?false:(confirm||{})

		return POE.extend(true,{},_def_,options)
	}
})