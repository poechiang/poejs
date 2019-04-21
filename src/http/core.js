define([
	'./var/xhr',
	'./send',
], function(getXhr, send) {
	'use strict'

	return {
		counter: 0,
		request: function(url, options) {
			options = POE.extend(true, {
				url: url,
			}, options || {})
			var xhr = getXhr(),
				fireGlobals = POE.event && options.global,
				callbackContext = options.context || options,
				globalEventContext = options.context && (callbackContext.nodeType || callbackContext.poe) ? POE(callbackContext) : POE.event,
				complete = options.complete



			if (fireGlobals) {

				options.complete = function(resp, xhr) {
					var isSuccess = xhr.status >= 200 && xhr.status < 300 || xhr.status === 304

					globalEventContext.trigger(isSuccess ? "ajaxsuccess" : "ajaxerror", [xhr, options, resp])
					globalEventContext.trigger("ajaxcomplete", [xhr, options])

					if (!(--POE.counter)) {
						POE.event.trigger("ajaxstop");
					}

					complete && complete.call(xhr, resp, xhr)
				}

				if (this.counter++ === 0) {
					POE.event.trigger('ajaxstart');
				}
			}

			return send(xhr, options)
		}
	}
})