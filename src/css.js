define([
		'./core',
		'./core/access',
		'./core/camelCase',
		'./var/rcssNum',
		'./var/rnumnonpx',
		'./dom/finalPropName',
		'./dom/getStyles',
		'./dom/addGetHookIf',
	],
	function(POE, access, camelCase, rcssNum, rnumnonpx, finalPropName, getStyles,addGetHookIf) {

		'use strict'


		var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
			rcustomProp = /^--/,
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
					unit = valueParts && valueParts[3] || (POE.cssNumber[prop] ? '' : 'px'),

					// Starting value computation is required for potential unit mismatches
					initialInUnit = (POE.cssNumber[prop] || unit !== 'px' && +initial) &&
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

					if (!POE.support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {

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
			},
			swap = function(elem, options, callback, args) {
				var ret, name,
					old = {}

				// Remember the old values, and insert the new ones
				for (name in options) {
					old[name] = elem.style[name]
					elem.style[name] = options[name]
				}

				ret = callback.apply(elem, args || [])

				// Revert the old values
				for (name in options) {
					elem.style[name] = old[name]
				}

				return ret
			},
			setPositiveNumber=function( elem, value, subtract ) {

				var matches = rcssNum.exec( value );
				return matches ?
					Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
					value;
			},
			boxModelAdjustment = function(elem, dimension, box, isBorderBox, styles, computedVal) {
				var i = dimension === 'width' ? 1 : 0,
					extra = 0,
					delta = 0;

				// Adjustment may not be necessary
				if (box === (isBorderBox ? 'border' : 'content')) {
					return 0;
				}

				for (; i < 4; i += 2) {

					// Both box models exclude margin
					if (box === 'margin') {
						delta += POE.css(elem, box + cssExpand[i], true, styles);
					}

					// If we get here with a content-box, we're seeking 'padding' or 'border' or 'margin'
					if (!isBorderBox) {

						// Add padding
						delta += POE.css(elem, 'padding' + cssExpand[i], true, styles);

						// For 'border' or 'margin', add border
						if (box !== 'padding') {
							delta += POE.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);

							// But still keep track of it otherwise
						} else {
							extra += POE.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
						}

						// If we get here with a border-box (content + padding + border), we're seeking 'content' or
						// 'padding' or 'margin'
					} else {

						// For 'content', subtract padding
						if (box === 'content') {
							delta -= POE.css(elem, 'padding' + cssExpand[i], true, styles);
						}

						// For 'content' or 'padding', subtract border
						if (box !== 'margin') {
							delta -= POE.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
						}
					}
				}

				// Account for positive content-box scroll gutter when requested by providing computedVal
				if (!isBorderBox && computedVal >= 0) {

					// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
					// Assuming integer scroll gutter, subtract the rest and round down
					delta += Math.max(0, Math.ceil(
						elem['offset' + dimension[0].toUpperCase() + dimension.slice(1)] -
						computedVal -
						delta -
						extra -
						0.5

						// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
						// Use an explicit zero to avoid NaN (gh-3964)
					)) || 0;
				}

				return delta;
			},
			getWidthOrHeight = function(elem, dimension, extra) {

				// Start with computed style
				var styles = getStyles(elem),

					// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
					// Fake content-box until we know it's needed to know the true value.
					boxSizingNeeded = !POE.support.boxSizingReliable() || extra,
					isBorderBox = boxSizingNeeded &&
					POE.css(elem, 'boxSizing', false, styles) === 'border-box',
					valueIsBorderBox = isBorderBox,

					val = curCSS(elem, dimension, styles),
					offsetProp = 'offset' + dimension[0].toUpperCase() + dimension.slice(1);

				// Support: Firefox <=54
				// Return a confounding non-pixel value or feign ignorance, as appropriate.
				if (rnumnonpx.test(val)) {
					if (!extra) {
						return val;
					}
					val = 'auto';
				}


				// Fall back to offsetWidth/offsetHeight when value is 'auto'
				// This happens for inline elements with no explicit setting (gh-3571)
				// Support: Android <=4.1 - 4.3 only
				// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
				// Support: IE 9-11 only
				// Also use offsetWidth/offsetHeight for when box sizing is unreliable
				// We use getClientRects() to check for hidden/disconnected.
				// In those cases, the computed value can be trusted to be border-box
				if ((!POE.support.boxSizingReliable() && isBorderBox ||
						val === 'auto' ||
						!parseFloat(val) && POE.css(elem, 'display', false, styles) === 'inline') &&
					elem.getClientRects().length) {

					isBorderBox = POE.css(elem, 'boxSizing', false, styles) === 'border-box';

					// Where available, offsetWidth/offsetHeight approximate border box dimensions.
					// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
					// retrieved value as a content box dimension.
					valueIsBorderBox = offsetProp in elem;
					if (valueIsBorderBox) {
						val = elem[offsetProp];
					}
				}

				// Normalize '' and auto
				val = parseFloat(val) || 0;

				// Adjust for the element's box model
				return (val +
					boxModelAdjustment(
						elem,
						dimension,
						extra || (isBorderBox ? 'border' : 'content'),
						valueIsBorderBox,
						styles,

						// Provide the current computed size to request scroll gutter calculation (gh-3589)
						val
					)
				) + 'px';
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
				hooks = POE.cssHooks[name] || POE.cssHooks[origName]

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
						value += ret && ret[3] || (POE.cssNumber[origName] ? '' : 'px')
					}

					// background-* props affect original clone's values
					if (!POE.support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
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
				hooks = POE.cssHooks[name] || POE.cssHooks[origName]

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



		POE.each(['height', 'width'], function(dimension, i) {
			POE.cssHooks[dimension] = {
				get: function(elem, computed, extra) {
					if (computed) {

						// Certain elements can have dimension info if we invisibly show them
						// but it must have a current display style that would benefit
						return rdisplayswap.test(POE.css(elem, 'display')) &&

							(!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
							swap(elem, cssShow, function() {
								return getWidthOrHeight(elem, dimension, extra)
							}) :
							getWidthOrHeight(elem, dimension, extra)
					}
				},

				set: function(elem, value, extra) {
					var matches,
						styles = getStyles(elem),

						// Only read styles.position if the test has a chance to fail
						// to avoid forcing a reflow.
						scrollboxSizeBuggy = !POE.support.scrollboxSize() &&
						styles.position === 'absolute',

						// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
						boxSizingNeeded = scrollboxSizeBuggy || extra,
						isBorderBox = boxSizingNeeded &&
						POE.css(elem, 'boxSizing', false, styles) === 'border-box',
						subtract = extra ?
						boxModelAdjustment(
							elem,
							dimension,
							extra,
							isBorderBox,
							styles
						) :
						0

					// Account for unreliable border-box dimensions by comparing offset* to computed and
					// faking a content-box to get border and padding (gh-3699)
					if (isBorderBox && scrollboxSizeBuggy) {
						subtract -= Math.ceil(
							elem['offset' + dimension[0].toUpperCase() + dimension.slice(1)] -
							parseFloat(styles[dimension]) -
							boxModelAdjustment(elem, dimension, 'border', false, styles) -
							0.5
						)
					}

					// Convert to pixels if value adjustment is needed
					if (subtract && (matches = rcssNum.exec(value)) &&
						(matches[3] || 'px') !== 'px') {

						elem.style[dimension] = value
						value = POE.css(elem, dimension)
					}

					return setPositiveNumber(elem, value, subtract)
				}
			}
		})

		POE.cssHooks.marginLeft = addGetHookIf(POE.support.reliableMarginLeft,
			function(elem, computed) {
				if (computed) {
					return (parseFloat(curCSS(elem, 'marginLeft')) ||
						elem.getBoundingClientRect().left -
						swap(elem, {
							marginLeft: 0
						}, function() {
							return elem.getBoundingClientRect().left
						})
					) + 'px'
				}
			}
		)

		// These hooks are used by animate to expand properties
		POE.each({
			margin: '',
			padding: '',
			border: 'Width'
		}, function(suffix, prefix) {
			POE.cssHooks[prefix + suffix] = {
				expand: function(value) {
					var i = 0,
						expanded = {},

						// Assumes a single number if not a string
						parts = typeof value === 'string' ? value.split(' ') : [value]

					for (; i < 4; i++) {
						expanded[prefix + cssExpand[i] + suffix] =
							parts[i] || parts[i - 2] || parts[0]
					}

					return expanded
				}
			}

			if (prefix !== 'margin') {
				POE.cssHooks[prefix + suffix].set = setPositiveNumber
			}
		})



		return POE
	})