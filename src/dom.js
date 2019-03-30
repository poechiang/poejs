define([
		'./core',
		'./var/document',
		'./var/rsingleTag',
		'./core/buildFragment',
	],
	function(POE, document, rsingleTag, buildFragment) {

		'use strict'

		POE.extend({
			parseHTML: function(data, context, keepScripts) {
				if (typeof data !== 'string') {
					return []
				}
				if (typeof context === 'boolean') {
					keepScripts = context
					context = false
				}

				var base, parsed, scripts

				if (!context) {

					if (POE.support.createHTMLDocument) {
						context = document.implementation.createHTMLDocument('')

						base = context.createElement('base')
						base.href = document.location.href
						context.head.appendChild(base)
					} else {
						context = document
					}
				}

				parsed = rsingleTag.exec(data)
				scripts = !keepScripts && []

				// Single tag
				if (parsed) {
					return [context.createElement(parsed[1])]
				}

				parsed = buildFragment([data], context, scripts)

				if (scripts && scripts.length) {
					POE(scripts).remove()
				}

				return POE.merge([], parsed.childNodes)
			},
			filter: function(expr, elems, not) {
				var elem = elems[0]

				if (not) {
					expr = ':not(' + expr + ')'
				}

				if (elems.length === 1 && elem.nodeType === 1) {
					return POE.find.matchesSelector(elem, expr) ? [elem] : []
				}

				return POE.find.matches(expr, POE.grep(elems, function(elem) {
					return elem.nodeType === 1
				}))
			}
		})
		
		function winnow(elements, qualifier, not) {
			if (POE.isFunction(qualifier)) {
				return POE.grep(elements, function(elem, i) {
					return !!qualifier.call(elem, i, elem) !== not
				})
			}

			if (qualifier.nodeType) {
				return POE.grep(elements, function(elem) {
					return (elem === qualifier) !== not
				})
			}

			if (typeof qualifier !== 'string') {
				return POE.grep(elements, function(elem) {
					return (qualifier.indexOf(elem) > -1) !== not
				})
			}

			return POE.filter(qualifier, elements, not)
		}

		POE.fn.extend({
			find: function(selector) {
				var i, ret,
					len = this.length,
					self = this

				if (typeof selector !== 'string') {
					return this.pushStack(POE(selector).filter(function() {
						for (i = 0; i < len; i++) {
							if (POE.contains(self[i], this)) {
								return true
							}
						}
					}))
				}

				ret = this.pushStack([])

				for (i = 0; i < len; i++) {
					POE.find(selector, self[i], ret)
				}

				return len > 1 ? POE.uniqueSort(ret) : ret
			},
			filter: function(selector) {
				return this.pushStack(winnow(this, selector || [], false))
			},
			not: function(selector) {
				return this.pushStack(winnow(this, selector || [], true))
			},
			is: function(selector) {
				return !!winnow(
					this,
					typeof selector === 'string' && POE.expr.match.needsContext.test(selector) ?
					POE(selector) :
					selector || [],
					false
				).length
			}
		})

		return POE
	})