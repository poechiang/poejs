define(function(){
	'use strict'

	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi

	return function(html) {
		return html.replace(rxhtmlTag, "<$1></$2>");
	}
})