define(function(){
	'use strict'

	var html = '<div class="pui-mask loading" ><div class="dp-table-cell ver-middle"><div class="pui-box"><div class="dp-table-cell ver-middle">'
	html += '<article class="pui-spinner">'

	for(var i=0;i<12;i++){
		html += '<span class="pui-scale"></span>'
	}

	html += '</article>'
	html += '<footer class="pui-content">正在加载…</footer>'
	html += '</div></div></div></div>'

	return html
})