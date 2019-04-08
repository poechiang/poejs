define([
	'./core',
	'./core/isFunction',
	'./core/stripAndCollapse',
	'./var/rnothtmlwhite',
], function(POE, isFunction, stripAndCollapse,rnothtmlwhite) {
	'use strict'

	var getClass = function(elem) {
			return elem.getAttribute && elem.getAttribute('class') || ''
		},
		classesToArray = function(value) {
			if (Array.isArray(value)) {
				return value
			}
			if (typeof value === 'string') {
				return value.match(rnothtmlwhite) || []
			}
			return []
		}




	POE.fn.extend({
		addClass: function(value) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0

			if (isFunction(value)) {
				return this.each(function(j) {
					POE(this).addClass(value.call(this, getClass(this)))
				})
			}

			classes = classesToArray(value)

			if (classes.length) {
				while ((elem = this[i++])) {
					curValue = getClass(elem)
					cur = elem.nodeType === 1 && (' ' + stripAndCollapse(curValue) + ' ')

					if (cur) {
						j = 0
						while ((clazz = classes[j++])) {
							if (cur.indexOf(' ' + clazz + ' ') < 0) {
								cur += clazz + ' '
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur)
						if (curValue !== finalValue) {
							elem.setAttribute('class', finalValue)
						}
					}
				}
			}

			return this
		},

		removeClass: function(value) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0

			if (isFunction(value)) {
				return this.each(function(j) {
					POE(this).removeClass(value.call(this, getClass(this)))
				})
			}

			if (!arguments.length) {
				return this.attr('class', '')
			}

			classes = classesToArray(value)

			if (classes.length) {
				while ((elem = this[i++])) {
					curValue = getClass(elem)

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && (' ' + stripAndCollapse(curValue) + ' ')

					if (cur) {
						j = 0
						while ((clazz = classes[j++])) {

							// Remove *all* instances
							while (cur.indexOf(' ' + clazz + ' ') > -1) {
								cur = cur.replace(' ' + clazz + ' ', ' ')
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur)
						if (curValue !== finalValue) {
							elem.setAttribute('class', finalValue)
						}
					}
				}
			}

			return this
		},

		toggleClass: function(value, stateVal) {
			var type = typeof value,
				isValidValue = type === 'string' || Array.isArray(value)

			if (typeof stateVal === 'boolean' && isValidValue) {
				return stateVal ? this.addClass(value) : this.removeClass(value)
			}

			if (isFunction(value)) {
				return this.each(function(i) {
					POE(this).toggleClass(
						value.call(this, getClass(this), stateVal),
						stateVal
					)
				})
			}

			return this.each(function() {
				var className, i, self, classNames

				if (isValidValue) {

					// Toggle individual class names
					i = 0
					self = POE(this)
					classNames = classesToArray(value)

					while ((className = classNames[i++])) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className)
						} else {
							self.addClass(className)
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === 'boolean') {
					className = getClass(this)
					if (className) {

						// Store className if set
						dataPriv.set(this, '__className__', className)
					}
					if (this.setAttribute) {
						this.setAttribute('class',
							className || value === false ?
							'' :
							dataPriv.get(this, '__className__') || ''
						)
					}
				}
			})
		},

		hasClass: function(selector) {
			var className, elem,
				i = 0

			className = ' ' + selector + ' '
			while ((elem = this[i++])) {
				if (elem.nodeType === 1 &&
					(' ' + stripAndCollapse(getClass(elem)) + ' ').indexOf(className) > -1) {
					return true
				}
			}

			return false
		},
		class:function(selector,delay){
			if (POE.isString(selector)) {
				selector = [selector]
			}
			var has,that = this
			POE.each(selector,function(sel){
				var op = sel[0]
				sel = sel.slice(1).trim()

				switch(op){
					case '?':
						has = that.hasClass(sel)
					case '!':
						POE.delay(that.toggleClass,delay||0,[sel],that)
					case '^':
						POE.delay(that.removeClass,delay||0,[sel],that)
					default://&
						POE.delay(that.addClass,delay||0,[op=='&'?sel:op+sel],that)

				}
			})

			return has || this

		}
	})
	return POE
})