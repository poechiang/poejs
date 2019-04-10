define([
	'../core/extend'
], function(extend) {
	'use strict'
	var arr = [],
		concat = arr.concat,
		slice = arr.slice,
		splice = arr.splice,
		join = arr.join,
		push = arr.push,
		pop = arr.pop,
		unshift = arr.unshift,
		shift = arr.shift,
		indexOf = arr.indexOf

	extend(Array.prototype, {
		get: function(value, key) {
			var index = this.indexOf(value, key)
			return this[index]
		},
		contains: function(value, key) {
			return this.indexOf(value, key) >= 0
		},
		indexOf: function(value, key) {
			if (key) {
				for (var i = 0; i < this.length; i++) {
					if (this[i][key] == value.key || value) {
						return i
					}
				}
				return -1
			} else {
				return indexOf.apply(this, [value])
			}
		},
		append: function() {
			try {
				push.apply(this, arguments)
				return this
			} catch (err) {
				POE.con.error(err)
				return this
			}
		},
		insert: function(index) {
			try {
				index = parseInt(index || 0);

				var data = []

				for (var i = 1; i < arguments.length; i++) {
					push.call(data, arguments[i])
				}


				if (index <= 0) {
					unshift.apply(this, data)
				} else if (index < this.length) {
					splice.apply(this, [index, 0].concat(data))
				} else {
					this.append(data)
				}
				return this
			} catch (err) {
				POE.con.error(err)
				return this
			}
		},
		remove: function(index, length) {
			try {
				index = Math.max(parseInt(index || 0), 0)
				length = Math.min(parseInt(length || 1), this.length - index)

				return splice.apply(this, [index, length])
			} catch (err) {
				POE.con.error(err)
				return []
			}
		},
		delete: function(index, length) {

			try {
				index = Math.max(parseInt(index || 0), 0)
				length = Math.min(parseInt(length || 1), this.length - index)
				splice.apply(this, [index, length])
				return this
			} catch (err) {
				POE.con.error(err)
				return this
			}
		},
		all: function(value, attr) {
			if (value) {
				var rlt = true
				if (POE.isFunction(value)) {
					POE.each(this, function() {
						if (value.apply(this) === false) {
							rlt = false
							return false
						}
					})
					return rlt
				} else {
					POE.each(this, function() {
						if (attr && POE.isString(attr)) {
							if (this[attr] != value) {
								rlt = false
								return false
							}
						} else {

							if (this != value) {
								rlt = false
								return false
							}
						}
					})
				}
			}
			return true
		},
		any: function(value, attr) {
			if (value) {
				var rlt = false
				if (POE.isFunction(value)) {
					POE.each(this, function() {
						if (value.apply(this) === true) {
							rlt = true
							return false
						}
					})
					return rlt
				} else {
					POE.each(this, function() {
						if (attr && POE.isString(attr)) {
							if (this[attr] == value) {
								rlt = true
								return false
							}
						} else {

							if (this == value) {
								rlt = true
								return false
							}
						}
					})
				}
			}
			return false
		}
	})


})