define([
	'./toType',
	'./getAll',
	'./merge',
	'./htmlPrefilter',
	'./setGlobalEval',
	'./inArray',
	'./wrapMap',
	'../var/rtagName'
], function(toType, getAll, merge,htmlPrefilter,setGlobalEval,inArray,wrapMap,rtagName) {

	'use strict'

	var rhtml = /<|&#?\w+;/

	return function(elems, context, scripts, selection, ignored) {
		var elem, tmp, tag, wrap, contains,attached, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length

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
					tmp.innerHTML = wrap[1] + htmlPrefilter(elem) + wrap[2]

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


			// Skip elements already in the context collection (trac-4087)
			if (selection && inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem)
				}
				continue
			}

			contains = elem.ownerDocument && POE.contains( elem.ownerDocument, elem )
	
			tmp = getAll(fragment.appendChild(elem), 'script')
			
			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

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