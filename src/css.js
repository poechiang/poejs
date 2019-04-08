define([
		'./core',
		'./core/access',
		'./core/camelCase',
		'./var/rcssNum',
		'./var/rnumnonpx',
		'./dom/finalPropName',
		'./dom/var/cssHooks',
		'./dom/var/cssNumber',
		'./dom/getStyles'
	],
	function(POE, access, camelCase,  
		rcssNum, rnumnonpx, finalPropName,
		cssHooks, cssNumber, getStyles) {

		'use strict'
		var rcustomProp = /^--/,
			adjustCSS = function(elem, prop, valueParts, tween) {
				var adjusted, scale,
					maxIterations = 20,
					currentValue = tween ?
					function() {
						return tween.cur()
					} :
					function() {
						return POE.css(elem, prop, '')
					},
					initial = currentValue(),
					unit = valueParts && valueParts[3] || (cssNumber[prop] ? '' : 'px'),

					// Starting value computation is required for potential unit mismatches
					initialInUnit = (cssNumber[prop] || unit !== 'px' && +initial) &&
					rcssNum.exec(POE.css(elem, prop))

				if (initialInUnit && initialInUnit[3] !== unit) {

					// Support: Firefox <=54
					// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
					initial = initial / 2

					// Trust units reported by POE.css
					unit = unit || initialInUnit[3]

					// Iteratively approximate from a nonzero starting point
					initialInUnit = +initial || 1

					while (maxIterations--) {

						// Evaluate and update our best guess (doubling guesses that zero out).
						// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
						POE.style(elem, prop, initialInUnit + unit)
						if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
							maxIterations = 0
						}
						initialInUnit = initialInUnit / scale

					}

					initialInUnit = initialInUnit * 2
					POE.style(elem, prop, initialInUnit + unit)

					// Make sure we update the tween properties later on
					valueParts = valueParts || []
				}

				if (valueParts) {
					initialInUnit = +initialInUnit || +initial || 0

					// Apply relative offset (+=/-=) if specified
					adjusted = valueParts[1] ?
						initialInUnit + (valueParts[1] + 1) * valueParts[2] :
						+valueParts[2]
					if (tween) {
						tween.unit = unit
						tween.start = initialInUnit
						tween.end = adjusted
					}
				}
				return adjusted
			},
			curCSS = function(elem, name, computed) {
				var width, minWidth, maxWidth, ret,
					style = elem.style

				computed = computed || getStyles(elem)

				if (computed) {
					ret = computed.getPropertyValue(name) || computed[name]

					if (ret === '' && !POE.contains(elem.ownerDocument, elem)) {
						ret = POE.style(elem, name)
					}

					if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {

						// Remember the original values
						width = style.width
						minWidth = style.minWidth
						maxWidth = style.maxWidth

						// Put in the new values to get a computed value out
						style.minWidth = style.maxWidth = style.width = ret
						ret = computed.width

						// Revert the changed values
						style.width = width
						style.minWidth = minWidth
						style.maxWidth = maxWidth
					}
				}

				return ret !== undefined ? ret + '' : ret
			}

		POE.extend({
			style: function(elem, name, value, extra) {

				// Don't set styles on text and comment nodes
				if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
					return
				}

				// Make sure that we're working with the right name
				var ret, type, hooks,
					origName = camelCase(name),
					isCustomProp = rcustomProp.test(name),
					style = elem.style

				// Make sure that we're working with the right name. We don't
				// want to query the value if it is a CSS custom property
				// since they are user-defined.
				if (!isCustomProp) {
					name = finalPropName(origName)
				}

				// Gets hook for the prefixed version, then unprefixed version
				hooks = cssHooks[name] || cssHooks[origName]

				// Check if we're setting a value
				if (value !== undefined) {
					type = typeof value

					// Convert '+=' or '-=' to relative numbers (#7345)
					if (type === 'string' && (ret = rcssNum.exec(value)) && ret[1]) {
						value = adjustCSS(elem, name, ret)

						// Fixes bug #9237
						type = 'number'
					}

					// Make sure that null and NaN values aren't set (#7116)
					if (value == null || value !== value) {
						return
					}

					// If a number was passed in, add the unit (except for certain CSS properties)
					if (type === 'number') {
						value += ret && ret[3] || (cssNumber[origName] ? '' : 'px')
					}

					// background-* props affect original clone's values
					if (!support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
						style[name] = 'inherit'
					}

					// If a hook was provided, use that value, otherwise just set the specified value
					if (!hooks || !('set' in hooks) ||
						(value = hooks.set(elem, value, extra)) !== undefined) {

						if (isCustomProp) {
							style.setProperty(name, value)
						} else {
							style[name] = value
						}
					}

				} else {

					// If a hook was provided get the non-computed value from there
					if (hooks && 'get' in hooks &&
						(ret = hooks.get(elem, false, extra)) !== undefined) {

						return ret
					}

					return style[name]
				}
			},
			css: function(elem, name, extra, styles) {
				var val, num, hooks,
					origName = camelCase(name),
					isCustomProp = rcustomProp.test(name)

				if (!isCustomProp) {
					name = finalPropName(origName)
				}

				// Try prefixed name followed by the unprefixed name
				hooks = cssHooks[name] || cssHooks[origName]

				// If a hook was provided get the computed value from there
				if (hooks && 'get' in hooks) {
					val = hooks.get(elem, true, extra)
				}

				// Otherwise, if a way to get the computed value exists, use that
				if (val === undefined) {
					val = curCSS(elem, name, styles)
				}

				// Convert 'normal' to computed value
				if (val === 'normal' && name in cssNormalTransform) {
					val = cssNormalTransform[name]
				}

				// Make numeric if forced or a qualifier was provided and val looks numeric
				if (extra === '' || extra) {
					num = parseFloat(val)
					return extra === true || isFinite(num) ? num || 0 : val
				}

				return val
			}
		})


		POE.fn.extend({
			css: function(name, value) {
				return access(this, function(elem, name, value) {
					var styles, len,
						map = {},
						i = 0

					if (POE.isArray(name)) {
						styles = getStyles(elem)
						len = name.length

						for (; i < len; i++) {
							map[name[i]] = POE.css(elem, name[i], false, styles)
						}

						return map
					}

					return value !== undefined ?
						POE.style(elem, name, value) :
						POE.css(elem, name)
				}, name, value, arguments.length > 1)
			},
		})
		return POE
	})