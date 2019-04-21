define(function() {
	'use strict'

	function buildParams(key, obj, traditional, add) {
		var name

		if (Array.isArray(obj)) {

			// Serialize array item.
			POE.each(obj, function(v, i) {
				if (traditional || rbracket.test(key)) {

					// Treat each array item as a scalar.
					add(key, v)

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						key + '[' + (typeof v === 'object' && v != null ? i : '') + ']',
						v,
						traditional,
						add
					)
				}
			})

		} else if (!traditional && POE.type(obj) === 'object') {

			// Serialize object item.
			for (name in obj) {
				buildParams(key + '[' + name + ']', obj[name], traditional, add)
			}

		} else {

			// Serialize scalar item.
			add(key, obj)
		}
	}



	return function(a, traditional) {
		var key,
			s = [],
			add = function(key, valueOrFunction) {

				// If value is a function, invoke it and use its return value
				var value = POE.isFunction(valueOrFunction) ?
					valueOrFunction() :
					valueOrFunction;

				s[s.length] = encodeURIComponent(key) + "=" +
					encodeURIComponent(value == null ? "" : value);
			};

		if (a == null) {
			return "";
		}

		// If an array was passed in, assume that it is an array of form elements.
		if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {

			// Serialize the form elements
			jQuery.each(a, function() {
				add(this.name, this.value);
			});

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (key in a) {
				buildParams(key, a[key], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&");
	}
})