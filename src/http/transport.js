define([
	'./addToPrefilterOrTransports'
], function(addToPrefilterOrTransports) {
	'use strict'

	var transports = {}


	addToPrefilterOrTransports(transports, function(options) {
		var callback, errorCallback

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function(headers, complete) {
					var i,
						xhr = options.xhr()

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers['X-Requested-With']) {
						headers['X-Requested-With'] = 'XMLHttpRequest';
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					callback = function(type) {
						return function() {
							if (callback) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

								if (type === 'abort') {
									xhr.abort();
								} else if (type === 'error') {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== 'number') {
										complete(0, 'error');
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[xhr.status] || xhr.status,
										xhr.statusText,

										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										(xhr.responseType || 'text') !== 'text' ||
										typeof xhr.responseText !== 'string' ? {
											binary: xhr.response
										} : {
											text: xhr.responseText
										},
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = xhr.ontimeout = callback('error');

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function() {
									if (callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					callback = callback('abort');

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (callback) {
							throw e;
						}
					}
				},

				abort: function() {
					if (callback) {
						callback();
					}
				}
			};
		}
	})

	addToPrefilterOrTransports(transports, 'script', function(s) {

		// This transport only deals with cross domain or forced-by-attrs requests
		if (s.crossDomain || s.scriptAttrs) {
			var script, callback;
			return {
				send: function(_, complete) {
					script = POE('<script>')
						.attr(s.scriptAttrs || {})
						.prop({
							charset: s.scriptCharset,
							src: s.url
						})
						.on('load error', callback = function(evt) {
							script.remove();
							callback = null;
							if (evt) {
								complete(evt.type === 'error' ? 404 : 200, evt.type);
							}
						});

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function() {
					if (callback) {
						callback();
					}
				}
			};
		}
	})

})