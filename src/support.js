define([
	'./core',
	'./var/document',
	'./core/extend'
], function(POE, document, extend) {

	'use strict'



	POE.support = {debug: true}

	POE.debug = function(debug) {
		POE.support.debug = debug
	}

	;
	(function() {
		var pixelPositionVal,
			boxSizingReliableVal,
			scrollboxSizeVal,
			pixelBoxStylesVal,
			reliableMarginLeftVal,
			container = document.createElement('div'),
			div = document.createElement('div')


		if (!div.style) {
			return;
		}


		div.style.backgroundClip = 'content-box';
		div.cloneNode(true).style.backgroundClip = '';


		var roundPixelMeasures = function(measure) {
				return Math.round(parseFloat(measure));
			},
			canCreateHTMLDocument = function() {
				var body = document.implementation.createHTMLDocument('').body
				body.innerHTML = '<form></form><form></form>'
				return body.childNodes.length === 2
			},
			computeStyleTests = function() {

				if (!div) {
					return;
				}

				container.style.cssText = 'position:absolute;left:-11111px;width:60px;' +
					'margin-top:1px;padding:0;border:0';
				div.style.cssText =
					'position:relative;display:block;box-sizing:border-box;overflow:scroll;' +
					'margin:auto;border:1px;padding:1px;' +
					'width:60%;top:1%';
				documentElement.appendChild(container).appendChild(div);

				var divStyle = window.getComputedStyle(div);
				pixelPositionVal = divStyle.top !== '1%';

				// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
				reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;

				// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
				// Some styles come back with percentage values, even though they shouldn't
				div.style.right = '60%';
				pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;

				// Support: IE 9 - 11 only
				// Detect misreporting of content dimensions for box-sizing:border-box elements
				boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;

				// Support: IE 9 only
				// Detect overflow:scroll screwiness (gh-3699)
				div.style.position = 'absolute';
				scrollboxSizeVal = div.offsetWidth === 36 || 'absolute';

				documentElement.removeChild(container);

				// Nullify the div so it wouldn't be stored in the memory and
				// it will also be a sign that checks already performed
				div = null;
			}


		extend(true, POE.support, {
			createHTMLDocument: canCreateHTMLDocument(),
			clearCloneStyle: div.style.backgroundClip === 'content-box',
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelBoxStyles: function() {
				computeStyleTests();
				return pixelBoxStylesVal;
			},
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			},
			scrollboxSize: function() {
				computeStyleTests();
				return scrollboxSizeVal;
			}
		})
	})

	;
	(function() {

		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild(document.createElement("div")),
			input = document.createElement("input")

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio")
		input.setAttribute("checked", "checked")
		input.setAttribute("name", "t")

		div.appendChild(input);

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		POE.support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>"
		POE.support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue


	})()

	;
	(function() {
		var input = document.createElement("input"),
			select = document.createElement("select"),
			opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		POE.support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		POE.support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		POE.support.radioValue = input.value === "t";
	})()



	return POE
})