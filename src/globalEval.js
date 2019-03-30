define([
	'./core',
	'./var/document'
], function(POE,document) {
	
	'use strict'

	POE.eval=function(code, node, doc) {
		doc = doc || document

		var script = doc.createElement('script')

		script.text = code

		if (node) {
			POE.each(['type','src','nonce','noModule'],function(item){
				var val = node[item] || node.getAttribute && node.getAttribute(item)
				if (val) {
					script.setAttribute(item, val)
				}
			})
		}
		
		doc.head.appendChild(script).parentNode.removeChild(script)
	}
})