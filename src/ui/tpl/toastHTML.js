define(function(){
	'use strict'
	
	var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" version="1.1" {{size}}>{{path}}</svg>',
		success = svg.replace('{{path}}','<path d="M185.6 473.6L89.6 550.4l377.6 364.8s160-384 518.4-704l-32-44.8S646.4 364.8 403.2 640L185.6 473.6z" fill="{{color}}"/>'),
		error = svg.replace('{{path}}','<path xmlns="http://www.w3.org/2000/svg" d="M942.124224 88.935694l-54.013179-26.244206L81.871675 803.397489l75.214804 156.067786L942.124224 88.935694zM866.909419 959.465474l75.214804-156.067786L135.884055 62.691687l-54.01218 26.244206L866.909419 959.465474z" fill="{{color}}"/>'),
		info = svg.replace('{{path}}','<path xmlns="http://www.w3.org/2000/svg" d="M128.512 420.864z m-71.168 0zM615.424 420.864z m-71.68 0zM372.224 420.864z m-71.68 0zM627.2 175.104c0 60.928-49.664 110.592-110.592 110.592-60.928 0-110.592-49.664-110.592-110.592 0-60.928 49.664-110.592 110.592-110.592 61.44 0 110.592 49.664 110.592 110.592z m0 783.36h-221.184l33.28-608.768H593.92l33.28 608.768z" fill="{{color}}"/>'),
		warn = svg.replace('{{path}}','<path xmlns="http://www.w3.org/2000/svg" d="M573.12 736l34.88-640-192 0 35.584 640 121.536 0zM448 800l0 128 128 0 0-128-128 0z" fill="{{color}}"/>')

	var html = '<div class="pui-mask toast" ><div class="dp-table-cell ver-middle"><div class="pui-box"><div class="dp-table-cell ver-middle">'
	html += '<article class="pui-spinner icon">{{svg}}</article><footer class="pui-content"></footer></div></div></div></div>'	

	return {
		svg:function(type){
			switch(type){
				case 'error':return error
				case 'info':return info
				case 'warn':return warn
				default:return success
			}
		},
		success:function(paths){
			return html.replace('{{svg}}',paths||success)
		},
		error:function(paths){
			return html.replace('{{svg}}',paths||error)
		},
		info:function(paths){
			return html.replace('{{svg}}',paths||info)
		},
		warn:function(paths){
			return html.replace('{{svg}}',paths||warn)
		},
	}
})