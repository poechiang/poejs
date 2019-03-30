define([
	'./toType',
	'./merge',
], function(toType, merge) {

	'use strict'

	var rhtml = /<|&#?\w+;/

	function getAll(context, tag) {

		var ret

		if (typeof context.getElementsByTagName !== 'undefined') {
			ret = context.getElementsByTagName(tag || '*')

		} else if (typeof context.querySelectorAll !== 'undefined') {
			ret = context.querySelectorAll(tag || '*')

		} else {
			ret = []
		}

		if (tag === undefined || tag && (context.nodeName && context.nodeName.toLowerCase() === tag.toLowerCase())) {
			return merge([context], ret)
		}

		return ret
	}

	return function(elems, context, scripts, selection, ignored) {
		var elem, tmp, tag, wrap, attached, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length,
			rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]*)/i)

		var wrapMap = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		}
		wrapMap.optgroup = wrapMap.option
		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead
		wrapMap.th = wrapMap.td

		for (; i < l; i++) {
			elem = elems[i]

			if (elem || elem === 0) {

				// Add nodes directly
				if (toType(elem) === 'object') {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					merge(nodes, elem.nodeType ? [elem] : elem)

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem))

					// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild(context.createElement('div'))

					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ['', ''])[1].toLowerCase()
					wrap = wrapMap[tag] || wrapMap._default
					tmp.innerHTML = wrap[1] + elem.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, "<$1></$2>") + wrap[2]

					// Descend through wrappers to the right content
					j = wrap[0]
					while (j--) {
						tmp = tmp.lastChild
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					merge(nodes, tmp.childNodes)

					// Remember the top-level container
					tmp = fragment.firstChild

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = ''
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = ''

		i = 0
		while ((elem = nodes[i++])) {

			tmp = getAll(fragment.appendChild(elem), 'script')

			if (scripts) {
				j = 0
				while ((elem = tmp[j++])) {
					if ((/^$|^module$|\/(?:java|ecma)script/i).test(elem.type || '')) {
						scripts.push(elem)
					}
				}
			}
		}

		return fragment
	}

})