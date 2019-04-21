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
], function(POE, document, _def_, _cache_, parseOptions, options2class, notifyHTML, loadingHTML, toastHTML, modalHTML) {

	'use strict'

	var $$body = POE(document.body),

		applyOptions = function(ui, options) {

			var _class_ = options2class(options)

			ui.data('ref', options.ref).data('opt', options)
				.class(_class_)


			if (options.ui == 'modal') {
				

				if (options.title) {
					ui.find('.pui-title').class('hor-' + options.title.align).html(options.title.text)
				}

				if (options.abort === false && options.cancel === false && options.confirm === false) {
					options.during = options.during || 1500
				} else {
					if (options.abort !== false) {
						var abort = ui.find('.pui-btn-abort').text(options.abort.text)
						abort.click(function() {
							var rlt = options.abort.cb ? options.abort.cb.call(ui, abort) : true

							if (rlt !== false) {
								hideUI(ui)
							}
						})
						if (options.abort.color) {
							abort.css('color', options.abort.color)
						}
					}
					if (options.cancel !== false) {
						var cancel = ui.find('.pui-btn-cancel').text(options.cancel.text)
						cancel.click(function() {
							var rlt = options.cancel.cb ? options.cancel.cb.call(ui, cancel) : true

							if (rlt !== false) {
								hideUI(ui)
							}
						})
						if (options.cancel.color) {
							cancel.css('color', options.cancel.color)
						}
					}
					if (options.confirm !== false) {
						var confirm = ui.find('.pui-btn-confirm').text(options.confirm.text)
						confirm.click(function() {
							var rlt = options.confirm.cb ? options.confirm.cb.call(ui, confirm) : true

							if (rlt !== false) {
								hideUI(ui)
							}
						})
						if (options.confirm.color) {
							confirm.css('color', options.confirm.color)
						}
					}
				}


				if (ui.is('.movable')) {
					ui.on('mousedown mousemove mouseup', function(e){
						if(POE(e.target).is('button')){
							return
						}
						if (e.type=='mousedown' && (options.title===false ||options.title.text==='' || POE(e.target).is('.pui-title'))) {
							ui.data({
								org: {
									left: e.offsetX,
									top: e.offsetY
								}
							})
						} else if (e.type=='mousemove') {
							var org = ui.data().org
							org && ui.find('.pui-box').offset({
								left: e.clientX - org.left,
								top: e.clientY - org.top
							})
						} else {
							ui.data('org',null)
						}
					})
				}

			}

			return ui
		},

		showUI = function(ui) {

			var options = ui.data('opt')
			if (options.anim) {
				ui.class('showing', options.delay).class('hiding', options.delay + 400)
			} else {
				ui.class('showing')
			}


			if (options.during > 0) {
				hideUI(ui, options.during + options.delay + 400)
			}
		},
		hideUI = function(ui, delay) {
			var options = ui.data('opt')
			delay = delay || 0
			if (options.anim) {
				ui.class('^showing', delay)
					.class('^hiding', delay + (options.delay + 400), function() {

						delete _cache_[options.ui][options.ref]
						ui.remove()

					})
			} else {
				ui.class('^showing')
				delete _cache_[options.ui][options.ref]
				ui.remove()
			}
		}

	POE.ui = {
		modal: function(content, options) {

			if (!content) {
				if (content === undefined) {
					content = false
					options = {
						ref: '_def_'
					}
				} else if (content === false) {
					options = {
						ref: options
					}
				}
			}

			options = parseOptions(options, {
				ui: 'modal',
				abort: false
			})

			var modal = _cache_.modal[options.ref] = _cache_.modal[options.ref] || POE(modalHTML).appendTo($$body)

			if (content === false) {
				hideUI(modal)
			} else {
				applyOptions(modal, options)
				modal.find('.pui-content').html(content)
				showUI(modal)
			}
			return this
		},
		toast: function(content, options) {

			if (!content) {
				if (content === undefined) {
					content = false
					options = {
						ref: '_def_'
					}
				} else if (content === false) {
					options = {
						ref: options
					}
				}
			}

			options = parseOptions(options, {
				ui: 'toast',
				during: 1500,
				mask: false,
			})

			var toast = _cache_.toast[options.ref] = _cache_.toast[options.ref] || POE(toastHTML[options.type](options.icon.paths).replace('{{color}}', options.icon.color)).appendTo($$body)

			if (content === false) {
				hideUI(toast)
			} else {
				applyOptions(toast, options)
				toast.find('.icon').html(toastHTML.svg(options.type).replace('{{color}}', options.icon.color))
				toast.find('.pui-content').html(content)
				showUI(toast)
			}
			return this
		},
		loading: function(content, options) {
			if (!content) {
				if (content === undefined) {
					content = false
					options = {
						ref: '_def_'
					}
				} else if (content === false) {
					options = {
						ref: options
					}
				}
			}

			options = parseOptions(options, {
				ui: 'loading',
				mask: false,
			})

			var loading = _cache_.loading[options.ref] = _cache_.loading[options.ref] || POE(loadingHTML).appendTo($$body)


			if (content === false) {
				hideUI(loading)
			} else {
				applyOptions(loading, options).find('.pui-content').html(content)
				showUI(loading)
			}
			return this
		},
		notify: function(content, options) {

			if (!content) {
				if (content === undefined) {
					content = false
					options = {
						ref: '_def_'
					}
				} else if (content === false) {
					options = {
						ref: options
					}
				}
			}

			options = parseOptions(options, {
				ui: 'notify',
				type: 'info',
				align: 'left',
				during: 1500,
			})

			var notify = _cache_.notify[options.ref] = _cache_.notify[options.ref] || POE(notifyHTML).appendTo($$body)

			if (content === false) {
				hideUI(notify)
			} else {

				applyOptions(notify, options).find('.pui-content').html(content)
				showUI(notify)
			}

			return this
		},
		verif: function(content, options) {

		},
		input: function(content, options) {

		}
	}

	return POE
})