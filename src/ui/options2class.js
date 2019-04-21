define(function(){
	'use strict'

	return function(options){
		var _class_ = ''
		if (options.mask) {
			_class_ += 'mask'
		}
		if (options.anim) {
			_class_ += ' anim'
		}

		if (options.align) {
			_class_ += ' hor-'+options.align
		}
		if (options.type) {
			_class_ += ' '+options.type
		}
		if (options.movable) {
			_class_ += ' movable'
		}

		return _class_
	}
})