define([
	'./core',
	'./exports/amd',
	'./exports/global',
],function( POE ){
	'use strict'


	// // 自动填写移动设备适配head内容
	// var $script = $('script[src*="/poe."][poe]').last()

	// if ( $$.support.isMobilePlatform ) {

	// 	// var opt = JSON.parse($script.data('opt'))
	// 	// console.log(opt)
	// 	$$.dom.meta({
	// 		viewport:'width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
	// 		appleMobileWebAppCapable:'yes',
	// 		appleMobileWebAppStatusBarStyle:'black',
	// 		formatDetection:'telephone=no'
	// 	})
	// 	$$.dom.link('144.png','apple-touch-icon-precomposed','144x144')
	// 	$$.dom.link('72.png','apple-touch-icon-precomposed','72x72')
	// 	$$.dom.link('57.png','apple-touch-icon-precomposed','57x57')
	// }


	// $(window).scroll(function(e){
 //        var $win=$(window),
 //        	doc = window.document,
 //            wh=$win.height(),
 //            dh=$(doc).height(),
 //            sh=$(doc).scrollTop()
 //        if (sh>=dh-wh) {
 //            var $ajaxLoader=$('.ajax-loader')

 //            $ajaxLoader.each(function(){
 //                var $this=$(this),
 //                	data = POE(this).data()
 //                if ($this.is('.auto-load')) {
 //                    //setTimeout(function(){
 //                        data.load();
 //                    //},1000)
 //                }
                
 //            })
 //        }
 //    })
    
 //    var $form = $('form.ajax-submit')

 //    $form.attr('novalidate',true).submit(function(){
 //        var uploader = $$('form').data()
 //        try{

 //            uploader.submit()
 //            return false
 //        }
 //        catch(err){
 //            POE.error(err)
 //            return false
 //        }
 //    })
    
    

    
	try {
		if (window.console && window.console.log) {
			console.log('欢迎使用POE前端框架，如有建议期待与您交流： \nhttps://poechiang.tech');
		}
	} catch (e) {}

	return POE
	
})