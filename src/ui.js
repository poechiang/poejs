define([
	'./core',
	'./var/document',
	'./ui/_def_',
	'./ui/_cache_',
	'./ui/parseOptions',
	'./ui/options2class',
	'./ui/tpl/notifyHTML',
	'./ui/tpl/loadingHTML',
	'./ui/tpl/toastHTML',
	'./ui/tpl/modalHTML',
], function(POE,document,_def_,_cache_,parseOptions,options2class, notifyHTML,loadingHTML,toastHTML,modalHTML) {

	'use strict'
	
	var $$body = POE(document.body),

	applyOptions=function(ui,options){
		
		var _class_ = options2class(options)

		return ui.data('ref',options.ref).data('opt',options)
			.class(_class_)
	},
	removeOptions=function(ui){

		var options = ui.data('opt')
		var _class_ = '^' +options2class(options)
		return ui.class(_class_)

	},
	showUI=function(ui){

		var options = ui.data('opt')
		if (options.anim) {
			ui.class('showing',options.delay).class('hiding',options.delay+400)
		}
		else{
			ui.class('showing')
		}
		

		if (options.during>0) {
			hideUI(ui,options.during+options.delay+400)
		}
	},
	hideUI=function(ui,delay){
		var options = ui.data('opt')
		delay = delay||0
		if (options.anim) {
			ui.class('^showing',delay)
				.class('^hiding',delay+(options.delay+400),function(){

				if (options.autoRemove) {
					delete _cache_[options.ui][options.ref]
					ui.remove()
				}
				else{
					removeOptions(ui)
				}
			})
		}
		else{
			ui.class('^showing')

			if (options.autoRemove) {
				delete _cache_[options.ui][options.ref]
				ui.remove()
			}
			else{
				removeOptions(ui)
			}
		}
	}

	POE.ui = {
		modal:function(content, options) {
			
		},
		toast:function(content, options) {

			if(!content){
				if (content === undefined) {
					content = false
					options = {ref:'_def_'}
				} else if (content === false) {
					options = {ref:options}
				}
			}

			options = parseOptions(options,{
				ui:'toast',
				during:1500,
				mask:false,
			})

			var toast = _cache_.toast[options.ref] = _cache_.toast[options.ref] || POE(toastHTML[options.type](options.icon.paths).replace('{{color}}',options.icon.color)).appendTo($$body)

			if (content === false) {
				hideUI(toast)
			}
			else{
				applyOptions(toast,options)
				toast.find('.icon').html(toastHTML.svg(options.type).replace('{{color}}',options.icon.color))
				toast.find('.pui-content').html(content)
				showUI(toast)
			}
			return this
		},
		loading:function(content, options) {
			if(!content){
				if (content === undefined) {
					content = false
					options = {ref:'_def_'}
				} else if (content === false) {
					options = {ref:options}
				}
			}

			options = parseOptions(options,{
				ui:'loading',
				mask:false,
			})

			var loading = _cache_.loading[options.ref] = _cache_.loading[options.ref] || POE(loadingHTML).appendTo($$body)

			
			if (content === false) {
				hideUI(loading)
			}
			else{
				applyOptions(loading,options).find('.pui-content').html(content)
				showUI(loading)
			}
			return this
		},
		notify:function(content, options) {

			if(!content){
				if (content === undefined) {
					content = false
					options = {ref:'_def_'}
				} else if (content === false) {
					options = {ref:options}
				}
			}

			options = parseOptions(options,{
				ui:'notify',
				type:'info',
				align:'left',
				during:1500,
			})

			var notify = _cache_.notify[options.ref] = _cache_.notify[options.ref] || POE(notifyHTML).appendTo($$body)

			if (content === false) {
				hideUI(notify)
			}
			else{

				applyOptions(notify,options).find('.pui-content').html(content)
				showUI(notify)
			}

			return this
		},
		verif:function(content, options) {

		},
		input:function(content, options) {

		}
	}

	return POE
})