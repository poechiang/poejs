define( [
	"./core",
	'./cache/core'
], function( POE, cache) {

	"use strict"

	POE.extend({
		cache:{
			local:function(key,value){
				if(key === false){
					cache.local.clear()
				}
				else if(/^\?\s*\w*/.test(key)){
					var key = key.match(/\w*/).trim()
					for(var i = 0; i<cache.local.length; i++){
						if (cache.local.key(i) == key) {
							return true
						}
					}
					return false
				}
				else if(key !== undefined){
					if ( value === null ) {
						cache.local.removeItem(key)
					}
					else if ( value === undefined ) {
						return POE.json(cache.local.getItem(key))
					}
					else{
						cache.local.setItem(key, POE.json(value))
					}
					
				}
				return cache.local
			},
			session:function(key,value){
				if(key === false){
					cache.session.clear()
				}
				else if(/^\?\s*\w*/.test(key)){
					var key = key.match(/\w*/).trim()
					for(var i = 0; i<cache.session.length; i++){
						if (cache.session.key(i) == key) {
							return true
						}
					}
					return false
				}
				else if(key !== undefined){
					if ( value === null ) {
						cache.session.removeItem(key)
					}
					else if ( value === undefined ) {
						return POE.json(cache.session.getItem(key))
					}
					else{
						cache.session.setItem(key,POE.json(value))
					}
					
				}
				return cache.session
			}
		}
	})
} )
