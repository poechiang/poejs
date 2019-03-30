define([
	'./core',
], function(POE) {

	'use strict'

	function Identity(v) {
		return v
	}

	function Thrower(ex) {
		throw ex
	}

	function adoptValue(value, resolve, reject, noValue) {
		var method

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if (value && POE.isFunction((method = value.promise))) {
				method.call(value).done(resolve).fail(reject)

				// Other thenables
			} else if (value && POE.isFunction((method = value.then))) {
				method.call(value, resolve, reject)
			} else {
				resolve.apply(undefined, [value].slice(noValue))
			}

		} catch (value) {

			reject.apply(undefined, [value])
		}
	}

	POE.extend({

		Deferred: function(func) {
			var tuples = [

					['notify', 'progress', POE.Callbacks('memory'),
						POE.Callbacks('memory'), 2
					],
					['resolve', 'done', POE.Callbacks('once memory'),
						POE.Callbacks('once memory'), 0, 'resolved'
					],
					['reject', 'fail', POE.Callbacks('once memory'),
						POE.Callbacks('once memory'), 1, 'rejected'
					]
				],
				state = 'pending',
				promise = {
					state: function() {
						return state
					},
					always: function() {
						deferred.done(arguments).fail(arguments)
						return this
					},
					'catch': function(fn) {
						return promise.then(null, fn)
					},

					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments

						return POE.Deferred(function(newDefer) {
							POE.each(tuples, function(tuple) {

								var fn = POE.isFunction(fns[tuple[4]]) && fns[tuple[4]]

								deferred[tuple[1]](function() {
									var returned = fn && fn.apply(this, arguments)
									if (returned && POE.isFunction(returned.promise)) {
										returned.promise()
											.progress(newDefer.notify)
											.done(newDefer.resolve)
											.fail(newDefer.reject)
									} else {
										newDefer[tuple[0] + 'With'](
											this,
											fn ? [returned] : arguments
										)
									}
								})
							})
							fns = null
						}).promise()
					},
					then: function(onFulfilled, onRejected, onProgress) {
						var maxDepth = 0

						function resolve(depth, deferred, handler, special) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then

										if (depth < maxDepth) {
											return
										}

										returned = handler.apply(that, args)

										if (returned === deferred.promise()) {
											throw new TypeError('Thenable self-resolution')
										}

										then = returned &&

											(typeof returned === 'object' ||
												typeof returned === 'function') &&
											returned.then

										if (POE.isFunction(then)) {

											if (special) {
												then.call(
													returned,
													resolve(maxDepth, deferred, Identity, special),
													resolve(maxDepth, deferred, Thrower, special)
												)

											} else {

												maxDepth++

												then.call(
													returned,
													resolve(maxDepth, deferred, Identity, special),
													resolve(maxDepth, deferred, Thrower, special),
													resolve(maxDepth, deferred, Identity,
														deferred.notifyWith)
												)
											}

										} else {

											if (handler !== Identity) {
												that = undefined
												args = [returned]
											}

											(special || deferred.resolveWith)(that, args)
										}
									},

									process = special ?
									mightThrow :
									function() {
										try {
											mightThrow()
										} catch (e) {

											if (POE.Deferred.exceptionHook) {
												POE.Deferred.exceptionHook(e,
													process.stackTrace)
											}

											if (depth + 1 >= maxDepth) {

												if (handler !== Thrower) {
													that = undefined
													args = [e]
												}

												deferred.rejectWith(that, args)
											}
										}
									}

								if (depth) {
									process()
								} else {

									if (POE.Deferred.getStackHook) {
										process.stackTrace = POE.Deferred.getStackHook()
									}
									window.setTimeout(process)
								}
							}
						}

						return POE.Deferred(function(newDefer) {

							tuples[0][3].add(
								resolve(
									0,
									newDefer,
									POE.isFunction(onProgress) ?
									onProgress :
									Identity,
									newDefer.notifyWith
								)
							)

							tuples[1][3].add(
								resolve(
									0,
									newDefer,
									POE.isFunction(onFulfilled) ?
									onFulfilled :
									Identity
								)
							)


							tuples[2][3].add(
								resolve(
									0,
									newDefer,
									POE.isFunction(onRejected) ?
									onRejected :
									Thrower
								)
							)
						}).promise()
					},

					promise: function(obj) {
						return obj != null ? POE.extend(obj, promise) : promise
					}
				},
				deferred = {}

			// Add list-specific methods
			POE.each(tuples, function(tuple,i) {
				var list = tuple[2],
					stateString = tuple[5]

				promise[tuple[1]] = list.add

				// Handle state
				if (stateString) {
					list.add(
						function() {

							state = stateString
						},

						tuples[3 - i][2].disable,

						tuples[3 - i][3].disable,

						tuples[0][2].lock,
						
						tuples[0][3].lock
					)
				}

				list.add(tuple[3].fire)

				deferred[tuple[0]] = function() {
					deferred[tuple[0] + 'With'](this === deferred ? undefined : this, arguments)
					return this
				}

				deferred[tuple[0] + 'With'] = list.fireWith
			})

			// Make the deferred a promise
			promise.promise(deferred)

			// Call given func if any
			if (func) {
				func.call(deferred, deferred)
			}

			// All done!
			return deferred
		},

		// Deferred helper
		when: function(singleValue) {
			var

				// count of uncompleted subordinates
				remaining = arguments.length,

				// count of unprocessed arguments
				i = remaining,

				// subordinate fulfillment data
				resolveContexts = Array(i),
				resolveValues = arguments.slice(),

				// the master Deferred
				master = POE.Deferred(),

				// subordinate callback factory
				updateFunc = function(i) {
					return function(value) {
						resolveContexts[i] = this
						resolveValues[i] = arguments.length > 1 ? arguments.slice() : value
						if (!(--remaining)) {
							master.resolveWith(resolveContexts, resolveValues)
						}
					}
				}

			// Single- and empty arguments are adopted like Promise.resolve
			if (remaining <= 1) {
				adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining)

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if (master.state() === 'pending' ||
					POE.isFunction(resolveValues[i] && resolveValues[i].then)) {

					return master.then()
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while (i--) {
				adoptValue(resolveValues[i], updateFunc(i), master.reject)
			}

			return master.promise()
		}
	})

	return POE
})