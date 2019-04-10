define([
	'../core/extend'
], function(extend) {
	'use strict'

	extend(String.prototype, {
		endWith: function(suffix) {
			suffix += ''
			if (POE.isEmpty(suffix)) {
				return true
			}
			return this.substr(this.length - suffix.length, suffix.length) == suffix
		},
		startWith: function(prefix) {
			prefix += ''
			if (POE.isEmpty(prefix)) {
				return true
			}
			return this.substr(0, prefix.length) == prefix
		},
		ltrim: function() {
			return this.replace(/^\s*/g, '')
		},
		rtrim: function() {
			return this.replace(/\s*$/g, '')
		},
		isPhoneNumber: function() {
			return /^1\d{10}$/.test(this)
		},
		isEmail: function() {
			return /^\w+@\w+\.\w+$/.test(this)
		}
	})



})