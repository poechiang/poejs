define([
	'./core',
	'./core/access',
], function(POE,access) {
	'use strict'


	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i

	POE.extend({
		prop: function(elem, name, value) {
			var ret, hooks,
				nType = elem.nodeType

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return
			}

			if (nType !== 1 || !POE.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = POE.propFix[name] || name
				hooks = POE.propHooks[name]
			}

			if (value !== undefined) {
				if (hooks && 'set' in hooks &&
					(ret = hooks.set(elem, value, name)) !== undefined) {
					return ret
				}

				return (elem[name] = value)
			}

			if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret
			}

			return elem[name]
		},

		propHooks: {
			tabIndex: {
				get: function(elem) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = POE.find.attr(elem, 'tabindex')

					if (tabindex) {
						return parseInt(tabindex, 10)
					}

					if (
						rfocusable.test(elem.nodeName) ||
						rclickable.test(elem.nodeName) &&
						elem.href
					) {
						return 0
					}

					return -1
				}
			}
		},

		propFix: {
			'for': 'htmlFor',
			'class': 'className'
		}
	})

	POE.fn.extend({
		prop: function(name, value) {
			if (value===null) {
				return this.removeProp(name)
			}
			else{
				return access(this, POE.prop, name, value, arguments.length > 1)
			}
			
		},

		removeProp: function(name) {
			return this.each(function() {
				delete this[POE.propFix[name] || name]
			})
		}
	})

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule 'no-unused-expressions' is disabled for this code
	// since it considers such accessions noop
	if (!POE.support.optSelected) {
		POE.propHooks.selected = {
			get: function(elem) {

				/* eslint no-unused-expressions: 'off' */

				var parent = elem.parentNode
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex
				}
				return null
			},
			set: function(elem) {

				/* eslint no-unused-expressions: 'off' */

				var parent = elem.parentNode
				if (parent) {
					parent.selectedIndex

					if (parent.parentNode) {
						parent.parentNode.selectedIndex
					}
				}
			}
		}
	}

	POE.each([
		'tabIndex',
		'readOnly',
		'maxLength',
		'cellSpacing',
		'cellPadding',
		'rowSpan',
		'colSpan',
		'useMap',
		'frameBorder',
		'contentEditable'
	], function() {
		POE.propFix[this.toLowerCase()] = this
	})

	return POE
})