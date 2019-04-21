define([
	'./param',
	'./convert',
	'./var/settings',
	'./var/allTypes',
	'../core/extend',
	'../var/rnothtmlwhite'
], function(param, convert, settings, allTypes, extend, rnothtmlwhite) {
	'use strict'



	return function(xhr, options) {
		var url,timeoutTimer,cacheURL,uncached,urlAnchor,rquery=( /\?/ ),

			originAnchor = document.createElement( "a" ),

			def = extend(true, {}, settings, {
				cache: !(options.type == 'script' || options.type == 'jsonp')
			})

		originAnchor.href = location.href

		options = extend(true, def, options || {})
		options.dataTypes = (options.type || "*").toLowerCase().match(rnothtmlwhite) || [""]

		options.hasContent = !/^(?:GET|HEAD)$/.test(options.method)

		if ( options.data && options.processData && typeof options.data !== "string" ) {
			options.data = param( options.data, options.traditional );
		}
		cacheURL = options.url.replace(  /#.*$/, "" )

		if ( !options.hasContent ) {
			// Remember the hash so we can put it back
			uncached = options.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( options.data && ( options.processData || typeof options.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + options.data;

				delete options.data;
			}

			if ( options.cache === false ) {
				cacheURL = cacheURL.replace( /([?&])_=[^&]*/, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" +  Math.random() + uncached

			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			options.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( options.data && options.processData &&
			( options.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			options.data = options.data.replace( /%20/g, "+" );
		}

		url = options.url

		if (options.async) {
			xhr.onreadystatechange = function() {
				switch (xhr.readyState) {
					case 1:
						options.connect && options.connect.call(xhr, xhr)
						options.debug && POE.con.log(url, '请求已连接')
						break
					case 2:
						options.received && options.received.call(xhr, xhr)
						options.debug && POE.con.log(url, '请求已接收')
						break
					case 3:
						options.process && options.process.call(xhr, xhr)
						options.debug && POE.con.log(url, '请求处理中')
						break
					case 4:
						var modified, status, statusText, success, error,
							resp = convert(options, xhr.responseText, xhr, isSuccess),
							isSuccess = xhr.status == 200 && xhr.status < 300 || xhr.status == 304



						if (isSuccess) {
							if (options.modi) {
								modified = xhr.getResponseHeader('Last-Modified')
								if (modified) {
									POE.http.lastModified[cacheURL] = modified
								}
								modified = xhr.getResponseHeader('etag')
								if (modified) {
									POE.http.etag[cacheURL] = modified
								}
							}


							// if no content
							if (status === 204 || options.type === "HEAD") {
								statusText = "nocontent";

								// if not modified
							} else if (status === 304) {
								statusText = "notmodified";

								// If we have data, let's convert it
							} else {
								statusText = '成功';
								success = resp;
							}

							//resp = options.type == 'json' ? JSON.parse(resp) : resp

							options.success && options.success.call(xhr, success, xhr)
						} else {

							// Extract error from statusText and normalize for non-aborts
							error = statusText;
							if (status || !statusText) {
								statusText = "error";
								if (status < 0) {
									status = 0;
								}
							}

							options.fail && options.fail.call(xhr, error, xhr)
							POE.con.error(url, '请求出错', error, xhr.readyState, xhr.status, xhr.statusText)
						}
						resp = isSuccess ? success : error
						options.complete && options.complete.call(xhr, resp, xhr)
						options.debug && POE.con.log(url, '请求已完成', resp)
						if (timeoutTimer) {
							window.clearTimeout(timeoutTimer);
						}
						break
				}
				options.stateChange && options.stateChange.call(xhr, xhr.readyState, xhr.status, xhr.statusText)
				options.debug && POE.con.log(url, '状态已更改', xhr.readyState, xhr.status, xhr.statusText)
			}
		}

		xhr.open(options.method, url, options.async);

		if (options.modi) {
			if (POE.http.lastModified[cacheURL]) {
				xhr.setRequestHeader('If-Modified-Since', POE.http.lastModified[cacheURL]);
			}
			if (POE.http.etag[cacheURL]) {
				xhr.setRequestHeader('If-None-Match', POE.http.etag[cacheURL]);
			}
		}

		xhr.setRequestHeader("Accept", options.dataTypes[0] && options.accepts[options.dataTypes[0]] ?
			options.accepts[options.dataTypes[0]] + (options.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
			options.accepts["*"]
		)

		if ( options.crossDomain === undefined) {
			urlAnchor = document.createElement( "a" )
			try {
				urlAnchor.href = url
				urlAnchor.href = urlAnchor.href
				options.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==urlAnchor.protocol + "//" + urlAnchor.host
				
			} catch ( e ) {
				options.crossDomain = true
			}
		}

		// if ( !options.crossDomain && !options.headers[ "X-Requested-With" ] || options.XMLHttpRequest) {
		// 	options.headers[ "X-Requested-With" ] = "XMLHttpRequest"
		// }
		// options.headers[ "X-Requested-With" ] = options.headers[ "X-Requested-With" ] || "XMLHttpRequest"
		
		if ( options.crossDomain || options.XMLHttpRequest) {
			options.headers[ "X-Requested-With" ] = options.XMLHttpRequest?"XMLHttpRequest":(options.headers[ "X-Requested-With" ] || "XMLHttpRequest"
)
		}

		


		for (var i in options.headers) {
			xhr.setRequestHeader(i, options.headers[i])
		}
		if ( options.xhrFields ) {
			for ( i in options.xhrFields ) {
				xhr[ i ] = options.xhrFields[ i ];
			}
		}
		if (options.data && options.hasContent && options.contentType !== false || options.contentType) {
			xhr.setRequestHeader("Content-Type", options.contentType);
		}

		if (options.ready && (options.ready.call(options.context || options, xhr, options) === false)) {
			return xhr.abort();
		}


			POE.con.log(options)

		// Timeout
		if (options.async && options.timeout > 0) {
			timeoutTimer = window.setTimeout(function() {
				xhr.abort('timeout')
			}, options.timeout)
		}
		if (options.method == 'POST' && options.data) {
			xhr.send(options.data)
		} else {
			xhr.send()
		}


		return options.async ? xhr : xhr.responseText

	}
})