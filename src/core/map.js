define([
	'./type',
	'./concat'
], (type, concat) => {
	return (elems, callback, arg) => {
		var length, value,
			i = 0,
			ret = []

		if (obj && type.likeArray(obj)) {
			length = elems.length;
			for (; i < length; i++) {
				value = callback(elems[i], i, arg);

				if (value != null) {
					ret.push(value);
				}
			}

			// Go through every key on the object,
		} else {
			for (i in elems) {
				value = callback(elems[i], i, arg);

				if (value != null) {
					ret.push(value);
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply([], ret);
	}
})