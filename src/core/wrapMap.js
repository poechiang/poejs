define(function() {

	'use strict'


	var wrapMap = {
		option: [1, '<select multiple="multiple">', '</select>'],
		thead: [1, '<table>', '</table>'],
		col: [2, '<table><colgroup>', '</colgroup></table>'],
		tr: [2, '<table><tbody>', '</tbody></table>'],
		td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
		_default: [0, '', '']
	}
	wrapMap.optgroup = wrapMap.option
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead
	wrapMap.th = wrapMap.td

	return wrapMap

})