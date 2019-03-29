/*
 * isWidnow
 */
define(()=>{
	
	'use strict'
	
	return obj => {
		return obj != null && obj === obj.window
	}
})