;(function() {
/*!
 * POE JavaScript Library v@VERSION
 * https://poe.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://poe.org/license
 *
 * Date: @DATE
 */
var var_arr, var_document, var_rsingleTag, core_indexOf, core_inArray, core_isFunction, core_isPlainObject, core_extend, var_class2type, core_isWindow, core_toType, core_isArrayLike, core_each, core_merge, core_makeArray, core_map, core_grep, core_slice, core_push, core, core_access, attr, var_rnothtmlwhite, callbacks, core_stripAndCollapse, _class, var_console, console, core_camelCase, var_pnum, var_rcssNum, var_rnumnonpx, dom_var_cssProps, dom_finalPropName, dom_var_cssHooks, dom_var_cssNumber, dom_getStyles, css, core_acceptData, data_core, data_dataPriv, data_dataUser, data, core_nodeName, core_concat, core_getAll, core_htmlPrefilter, core_setGlobalEval, core_wrapMap, var_rtagName, core_buildFragment, var_rparentsprev, dom___external_sizzle, dom_filter, dom_winnow, dom_sibling, support, dom, event_returnTrue, event_returnFalse, event_core, event_removeEvent, event, deferred, prop, external_sizzle, sizzle, type_array, type_string, type_date, type, ui__def_, ui__cache_, ui_parseOptions, ui_options2class, ui_tpl_notifyHTML, ui_tpl_loadingHTML, ui_tpl_toastHTML, ui_tpl_modalHTML, ui, poe;
(function (global, factory) {
  'use strict';
  if (typeof module === 'object' && typeof module.exports === 'object') {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get POE.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var POE = require("poe")(window);
    // See ticket #14549 for more info.
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error('POE requires a window with a document');
      }
      return factory(w);
    };
  } else {
    factory(global);
  }  // Pass this if window is not defined yet
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
  // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
  // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
  // arguments.callee.caller (trac-13335). But as of POE 3.0 (2016), strict mode should be common
  // enough that all such attempts are guarded in a try block.
  'use strict';
  var_arr = [];
  var_document = window.document;
  var_rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  core_indexOf = function (arr) {
    return arr.indexOf;
  }(var_arr);
  core_inArray = function (indexOf) {
    return function (elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    };
  }(core_indexOf);
  core_isFunction = function (obj) {
    return typeof obj === 'function' && typeof obj.nodeType !== 'number';
  };
  core_isPlainObject = function (obj) {
    var proto, ctor;
    if (!obj || obj.toString() !== '[object Object]') {
      return false;
    }
    proto = Object.getPrototypeOf(obj);
    if (!proto) {
      return true;
    }
    ctor = proto.hasOwnProperty('constructor') && proto.constructor;
    return typeof ctor === 'function' && ctor.hasOwnProperty.toString() === Object.hasOwnProperty.toString();
  };
  core_extend = function (isFunction, isPlainObject) {
    var extend = function () {
      var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
      // Handle a deep copy situation
      if (typeof target === 'boolean') {
        deep = target;
        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
      }
      // Handle case when target is a string or something (possible in deep copy)
      if (typeof target !== 'object' && !isFunction(target)) {
        target = {};
      }
      // Extend POE itself if only one argument is passed
      if (i === length) {
        target = this;
        i--;
      }
      for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
          // Extend the base object
          for (name in options) {
            src = target[name];
            copy = options[name];
            // Prevent never-ending loop
            if (target === copy) {
              continue;
            }
            // Recurse if we're merging plain objects or arrays
            if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && Array.isArray(src) ? src : [];
              } else {
                clone = src && isPlainObject(src) ? src : {};
              }
              // Never move original objects, clone them
              target[name] = extend(deep, clone, copy)  // Don't bring in undefined values
;
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }
      // Return the modified object
      return target;
    };
    return extend;
  }(core_isFunction, core_isPlainObject);
  var_class2type = function () {
    var class2type = {};
    'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ').map(function (name, i) {
      class2type['[object ' + name + ']'] = name.toLowerCase();
    });
    return class2type;
  }();
  core_isWindow = function (obj) {
    return obj != null && obj === obj.window;
  };
  core_toType = function (class2type) {
    return function (obj) {
      if (obj == null) {
        return obj + '';
      }
      return typeof obj === 'object' || typeof obj === 'function' ? class2type[obj.toString()] || 'object' : typeof obj;
    };
  }(var_class2type);
  core_isArrayLike = function (toType, isFunction, isWindow) {
    return function (obj) {
      var length = !!obj && 'length' in obj && obj.length, type = toType(obj);
      if (isFunction(obj) || isWindow(obj)) {
        return false;
      }
      return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
    };
  }(core_toType, core_isFunction, core_isWindow);
  core_each = function (isArrayLike) {
    return function (obj, callback) {
      var length, i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], obj[i], i) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], obj[i], i) === false) {
            break;
          }
        }
      }
      return obj;
    };
  }(core_isArrayLike);
  core_merge = function (first, second) {
    var len = +second.length, j = 0, i = first.length;
    for (; j < len; j++) {
      first[i++] = second[j];
    }
    first.length = i;
    return first;
  };
  core_makeArray = function (merge, isArrayLike) {
    return function (arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          merge(ret, typeof arr === 'string' ? [arr] : arr);
        } else {
          ret.push(arr);
        }
      }
      return ret;
    };
  }(core_merge, core_isArrayLike);
  core_map = function (isArrayLike) {
    return function (elems, callback, arg) {
      var length, value, i = 0, ret = [];
      // Go through the array, translating each of the items to their new values
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }  // Go through every key on the object,
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      // Flatten any nested arrays
      return [].concat(ret);
    };
  }(core_isArrayLike);
  core_grep = function (elems, callback, invert) {
    var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
    // Go through the array, only saving the items
    // that pass the validator function
    for (; i < length; i++) {
      callbackInverse = !callback(elems[i], i);
      if (callbackInverse !== callbackExpect) {
        matches.push(elems[i]);
      }
    }
    return matches;
  };
  core_slice = function (arr) {
    return arr.slice;
  }(var_arr);
  core_push = function (arr) {
    return arr.push;
  }(var_arr);
  core = function (arr, document, rsingleTag, inArray, extend, class2type, isFunction, isWindow, toType, isArrayLike, isPlainObject, each, merge, makeArray, map, grep, slice, push) {
    var rootPOE, version = '2.0.1', init, POE = function (selector, context) {
        return new POE.fn.init(selector, context);
      }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    POE.expando = 'POE' + (version + Math.random()).replace(/\D/g, '');
    POE.extend = extend;
    POE.isReady = true;
    POE.fn = POE.prototype = {
      // The current version of POE being used
      poe: version,
      constructor: POE,
      // The default length of a POE object is 0
      length: 0,
      extend: POE.extend
    };
    POE.extend({
      // A global GUID counter for objects
      guid: 1,
      noop: function () {
      },
      each: each,
      makeArray: makeArray,
      inArray: inArray,
      merge: merge,
      grep: grep,
      map: map,
      delay: function (fn, delay, args, context) {
        if (delay === undefined) {
          fn.apply(context, POE.toArray(args));
        } else {
          setTimeout(function () {
            fn.apply(context, POE.toArray(args));
          }, delay || 0);
        }
      },
      eval: function (code, node, doc) {
        doc = doc || document;
        var script = doc.createElement('script');
        script.text = code;
        if (node) {
          each([
            'type',
            'src',
            'nonce',
            'noModule'
          ], function (item) {
            var val = node[item] || node.getAttribute && node.getAttribute(item);
            if (val) {
              script.setAttribute(item, val);
            }
          });
        }
        doc.head.appendChild(script).parentNode.removeChild(script);
      },
      trim: function (text) {
        return text == null ? '' : (text + '').replace(rtrim, '');
      },
      toArray: function (obj) {
        if (isArrayLike(obj)) {
          return [].slice.call(obj);
        } else {
          var arr = [];
          for (var x in obj) {
            if (isFunction(obj[x])) {
              continue;
            }
            arr.push(obj[x]);
          }
          return arr;
        }
      }
    });
    init = POE.fn.init = function (selector, context, root) {
      var match, elem;
      if (!selector) {
        return this;
      }
      root = root || rootPOE;
      if (typeof selector === 'string') {
        if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {
          match = [
            null,
            selector,
            null
          ];
        } else {
          match = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/.exec(selector);
        }
        if (match && (match[1] || !context)) {
          // HANDLE: $(html) -> $(array)
          if (match[1]) {
            context = context instanceof POE ? context[0] : context;
            merge(this, POE.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
            // HANDLE: $(html, props)
            if (rsingleTag.test(match[1]) && isPlainObject(context)) {
              for (match in context) {
                // Properties of context are called as methods if possible
                if (isFunction(this[match])) {
                  this[match](context[match])  // ...and otherwise set as attributes
;
                } else {
                  this.attr(match, context[match]);
                }
              }
            }
            return this  // HANDLE: $(#id)
;
          } else {
            elem = document.getElementById(match[2]);
            if (elem) {
              // Inject the element directly into the POE object
              this[0] = elem;
              this.length = 1;
            }
            return this;
          }
        } else if (!context || context.POE) {
          return (context || root).find(selector);
        } else {
          return this.constructor(context).find(selector);
        }  // HANDLE: $(DOMElement)
      } else if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
        return this  // HANDLE: $(function)
              // Shortcut for document ready
;
      } else if (isFunction(selector)) {
        return root.ready !== undefined ? root.ready(selector) : selector(POE);
      }
      return POE.makeArray(selector, this);
    };
    init.prototype = POE.fn;
    POE.fn.extend({
      pushStack: function (elems) {
        // Build a new POE matched element set
        var ret = POE.merge(this.constructor(), elems);
        // Add the old object onto the stack (as a reference)
        ret.prevObject = this;
        // Return the newly-formed element set
        return ret;
      },
      toArray: function () {
        return this.slice();
      },
      slice: function () {
        return this.pushStack(slice.apply(this, arguments));
      },
      // Execute a callback for every element in the matched set.
      each: function (callback) {
        return each(this, callback);
      },
      map: function (callback) {
        return this.pushStack(POE.map(this, function (elem, i) {
          return callback.call(elem, elem, i);
        }));
      },
      // For internal use only.
      // Behaves like an Array's method, not like a POE method.
      push: push,
      sort: arr.sort,
      splice: arr.splice
    });
    if (typeof Symbol === 'function') {
      POE.fn[Symbol.iterator] = arr[Symbol.iterator];
    }
    rootPOE = POE(document);
    return POE;
  }(var_arr, var_document, var_rsingleTag, core_inArray, core_extend, var_class2type, core_isFunction, core_isWindow, core_toType, core_isArrayLike, core_isPlainObject, core_each, core_merge, core_makeArray, core_map, core_grep, core_slice, core_push);
  core_access = function (toType, isFunction) {
    var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
      var i = 0, len = elems.length, bulk = key == null;
      // Sets many values
      if (toType(key) === 'object') {
        chainable = true;
        for (i in key) {
          access(elems, fn, i, key[i], true, emptyGet, raw);
        }  // Sets one value
      } else if (value !== undefined) {
        chainable = true;
        if (!isFunction(value)) {
          raw = true;
        }
        if (bulk) {
          // Bulk operations run against the entire set
          if (raw) {
            fn.call(elems, value);
            fn = null  // ...except when executing function values
;
          } else {
            bulk = fn;
            fn = function (elem, key, value) {
              return bulk.call(POE(elem), value);
            };
          }
        }
        if (fn) {
          for (; i < len; i++) {
            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
          }
        }
      }
      if (chainable) {
        return elems;
      }
      // Gets
      if (bulk) {
        return fn.call(elems);
      }
      return len ? fn(elems[0], key) : emptyGet;
    };
    return access;
  }(core_toType, core_isFunction);
  attr = function (POE, access) {
    POE.extend({
      attr: function (elem, name, value) {
        var ret, hooks, nType = elem.nodeType;
        // Don't get/set attributes on text, comment and attribute nodes
        if (nType === 3 || nType === 8 || nType === 2) {
          return;
        }
        // Fallback to prop when attributes are not supported
        if (typeof elem.getAttribute === 'undefined') {
          return POE.prop(elem, name, value);
        }
        // Attribute hooks are determined by the lowercase version
        // Grab necessary hook if one is defined
        if (nType !== 1 || !POE.isXMLDoc(elem)) {
          hooks = POE.attrHooks[name.toLowerCase()] || (POE.expr.match.bool.test(name) ? boolHook : undefined);
        }
        if (value !== undefined) {
          if (value === null) {
            POE.removeAttr(elem, name);
            return;
          }
          if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
            return ret;
          }
          elem.setAttribute(name, value + '');
          return value;
        }
        if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        }
        ret = POE.find.attr(elem, name);
        // Non-existent attributes return null, we normalize to undefined
        return ret == null ? undefined : ret;
      },
      attrHooks: {
        type: {
          set: function (elem, value) {
            if (!support.radioValue && value === 'radio' && nodeName(elem, 'input')) {
              var val = elem.value;
              elem.setAttribute('type', value);
              if (val) {
                elem.value = val;
              }
              return value;
            }
          }
        }
      },
      removeAttr: function (elem, value) {
        var name, i = 0,
          // Attribute names can contain non-HTML whitespace characters
          // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
          attrNames = value && value.match(rnothtmlwhite);
        if (attrNames && elem.nodeType === 1) {
          while (name = attrNames[i++]) {
            elem.removeAttribute(name);
          }
        }
      }
    });
    POE.fn.extend({
      attr: function (name, value) {
        return access(this, POE.attr, name, value, arguments.length > 1);
      },
      removeAttr: function (name) {
        return this.each(function () {
          POE.removeAttr(this, name);
        });
      }
    });
  }(core, core_access);
  var_rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
  callbacks = function (POE, rnothtmlwhite) {
    function createOptions(options) {
      var object = {};
      POE.each(options.match(rnothtmlwhite) || [], function (flag) {
        object[flag] = true;
      });
      return object;
    }
    /*
    * Create a callback list using the following parameters:
    *
    *	options: an optional list of space-separated options that will change how
    *			the callback list behaves or a more traditional option object
    *
    * By default a callback list will act like an event callback list and can be
    * 'fired' multiple times.
    *
    * Possible options:
    *
    *	once:			will ensure the callback list can only be fired once (like a Deferred)
    *
    *	memory:			will keep track of previous values and will call any callback added
    *					after the list has been fired right away with the latest 'memorized'
    *					values (like a Deferred)
    *
    *	unique:			will ensure a callback can only be added once (no duplicate in the list)
    *
    *	stopOnFalse:	interrupt callings when a callback returns false
    *
    */
    POE.Callbacks = function (options) {
      // Convert options from String-formatted to Object-formatted if needed
      // (we check in cache first)
      options = typeof options === 'string' ? createOptions(options) : POE.extend({}, options);
      var
        // Flag to know if list is currently firing
        firing,
        // Last fire value for non-forgettable lists
        memory,
        // Flag to know if list was already fired
        fired,
        // Flag to prevent firing
        locked,
        // Actual callback list
        list = [],
        // Queue of execution data for repeatable lists
        queue = [],
        // Index of currently firing callback (modified by add/remove as needed)
        firingIndex = -1,
        // Fire callbacks
        fire = function () {
          // Enforce single-firing
          locked = locked || options.once;
          // Execute callbacks for all pending executions,
          // respecting firingIndex overrides and runtime changes
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              // Run callback and check for early termination
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                // Jump to end and forget the data so .add doesn't re-fire
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          // Forget the data if we're done with it
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          // Clean up if we're done firing for good
          if (locked) {
            // Keep an empty list if we have data for future add calls
            if (memory) {
              list = []  // Otherwise, this object is spent
;
            } else {
              list = '';
            }
          }
        }, self = {
          // Add a callback or a collection of callbacks to the list
          add: function () {
            if (list) {
              // If we have memory from a past run, we should fire after adding
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                POE.each(args, function (arg) {
                  if (POE.isFunction(arg)) {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && POE.type(arg) !== 'string') {
                    // Inspect recursively
                    add(arg);
                  }
                });
              }(arguments));
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          // Remove a callback from the list
          remove: function () {
            POE.each(arguments, function (arg) {
              var index;
              while ((index = POE.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                // Handle firing indexes
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          // Check if a given callback is in the list.
          // If no argument is given, return whether or not list has callbacks attached.
          has: function (fn) {
            return fn ? POE.inArray(fn, list) > -1 : list.length > 0;
          },
          // Remove all callbacks from the list
          empty: function () {
            if (list) {
              list = [];
            }
            return this;
          },
          // Disable .fire and .add
          // Abort any current/pending executions
          // Clear all callbacks and values
          disable: function () {
            locked = queue = [];
            list = memory = '';
            return this;
          },
          disabled: function () {
            return !list;
          },
          // Disable .fire
          // Also disable .add unless we have memory (since it would have no effect)
          // Abort any pending executions
          lock: function () {
            locked = queue = [];
            if (!memory && !firing) {
              list = memory = '';
            }
            return this;
          },
          locked: function () {
            return !!locked;
          },
          // Call all callbacks with the given context and arguments
          fireWith: function (context, args) {
            if (!locked) {
              args = args || [];
              args = [
                context,
                args.slice ? args.slice() : args
              ];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          // Call all the callbacks with the given arguments
          fire: function () {
            self.fireWith(this, arguments);
            return this;
          },
          // To know if the callbacks have already been called at least once
          fired: function () {
            return !!fired;
          }
        };
      return self;
    };
    return POE;
  }(core, var_rnothtmlwhite);
  core_stripAndCollapse = function (rnothtmlwhite) {
    // Strip and collapse whitespace according to HTML spec
    // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
    return function (value) {
      var tokens = value.match(rnothtmlwhite) || [];
      return tokens.join(' ');
    };
  }(var_rnothtmlwhite);
  _class = function (POE, isFunction, stripAndCollapse, rnothtmlwhite) {
    var getClass = function (elem) {
        return elem.getAttribute && elem.getAttribute('class') || '';
      }, classesToArray = function (value) {
        if (Array.isArray(value)) {
          return value;
        }
        if (typeof value === 'string') {
          return value.match(rnothtmlwhite) || [];
        }
        return [];
      };
    POE.fn.extend({
      addClass: function (value) {
        var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
        if (isFunction(value)) {
          return this.each(function (j) {
            POE(this).addClass(value.call(this, getClass(this)));
          });
        }
        classes = classesToArray(value);
        if (classes.length) {
          while (elem = this[i++]) {
            curValue = getClass(elem);
            cur = elem.nodeType === 1 && ' ' + stripAndCollapse(curValue) + ' ';
            if (cur) {
              j = 0;
              while (clazz = classes[j++]) {
                if (cur.indexOf(' ' + clazz + ' ') < 0) {
                  cur += clazz + ' ';
                }
              }
              // Only assign if different to avoid unneeded rendering.
              finalValue = stripAndCollapse(cur);
              if (curValue !== finalValue) {
                elem.setAttribute('class', finalValue);
              }
            }
          }
        }
        return this;
      },
      removeClass: function (value) {
        var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
        if (isFunction(value)) {
          return this.each(function (j) {
            POE(this).removeClass(value.call(this, getClass(this)));
          });
        }
        if (!arguments.length) {
          return this.attr('class', '');
        }
        classes = classesToArray(value);
        if (classes.length) {
          while (elem = this[i++]) {
            curValue = getClass(elem);
            // This expression is here for better compressibility (see addClass)
            cur = elem.nodeType === 1 && ' ' + stripAndCollapse(curValue) + ' ';
            if (cur) {
              j = 0;
              while (clazz = classes[j++]) {
                // Remove *all* instances
                while (cur.indexOf(' ' + clazz + ' ') > -1) {
                  cur = cur.replace(' ' + clazz + ' ', ' ');
                }
              }
              // Only assign if different to avoid unneeded rendering.
              finalValue = stripAndCollapse(cur);
              if (curValue !== finalValue) {
                elem.setAttribute('class', finalValue);
              }
            }
          }
        }
        return this;
      },
      toggleClass: function (value, stateVal) {
        var type = typeof value, isValidValue = type === 'string' || Array.isArray(value);
        if (typeof stateVal === 'boolean' && isValidValue) {
          return stateVal ? this.addClass(value) : this.removeClass(value);
        }
        if (isFunction(value)) {
          return this.each(function (i) {
            POE(this).toggleClass(value.call(this, getClass(this), stateVal), stateVal);
          });
        }
        return this.each(function () {
          var className, i, self, classNames;
          if (isValidValue) {
            // Toggle individual class names
            i = 0;
            self = POE(this);
            classNames = classesToArray(value);
            while (className = classNames[i++]) {
              // Check each className given, space separated list
              if (self.hasClass(className)) {
                self.removeClass(className);
              } else {
                self.addClass(className);
              }
            }  // Toggle whole class name
          } else if (value === undefined || type === 'boolean') {
            className = getClass(this);
            if (className) {
              // Store className if set
              dataPriv.set(this, '__className__', className);
            }
            if (this.setAttribute) {
              this.setAttribute('class', className || value === false ? '' : dataPriv.get(this, '__className__') || '');
            }
          }
        });
      },
      hasClass: function (selector) {
        var className, elem, i = 0;
        className = ' ' + selector + ' ';
        while (elem = this[i++]) {
          if (elem.nodeType === 1 && (' ' + stripAndCollapse(getClass(elem)) + ' ').indexOf(className) > -1) {
            return true;
          }
        }
        return false;
      },
      class: function (selector, delay, fn) {
        if (POE.isString(selector)) {
          selector = [selector];
        }
        var has, that = this;
        if (POE.isFunction(delay)) {
          fn = delay;
          delay = 0;
        }
        fn = fn || POE.noop;
        POE.each(selector, function (sel) {
          var op = sel[0];
          sel = sel.slice(1).trim();
          switch (op) {
          case '?':
            has = that.hasClass(sel);
            break;
          case '!':
            POE.delay(function () {
              that.toggleClass(sel);
              fn();
            }, delay);
            break;
          case '^':
            POE.delay(function () {
              if (sel) {
                that.removeClass(sel);
              } else {
                that.removeClass();
              }
              fn();
            }, delay);
            break;
          default:
            //&
            POE.delay(function () {
              that.addClass([op == '&' ? sel : op + sel]);
              fn();
            }, delay)  //POE.delay(that.addClass,delay||0,[op=='&'?sel:op+sel],that)
;
          }
        });
        return has || this;
      }
    });
    return POE;
  }(core, core_isFunction, core_stripAndCollapse, var_rnothtmlwhite);
  var_console = window.console;
  console = function (POE, console) {
    var timeLogs = { _: false }, color = {
        log: 'color:#616161;',
        info: 'color:#2196F3;',
        success: 'color:#4CAF50;',
        error: 'color:#FF5722;',
        warn: 'color:#FF9800;'
      }, parseFormat = function (args) {
        var fmt = '%c';
        POE.map(args, function (item) {
          if (POE.isString(item)) {
            fmt += '%s ';
          } else if (POE.isNumber(item)) {
            fmt += '%d ';
          } else {
            fmt += '%o ';
          }
        });
        return fmt;
      };
    POE.con = {
      assert: function (msg, condi) {
        console.assert(condi, msg);
      },
      clear: console.clear,
      count: function (label, reset) {
        if (label === false) {
          console.countReset();
        } else if (reset === false) {
          !!label ? console.countReset(label) : console.countReset();
        } else {
          !!label ? console.count(label) : console.count();
        }
      },
      dir: function (obj, xml) {
        if (xml) {
          console.dir(obj);
        } else {
          console.dirxml(obj);
        }
      },
      error: function () {
        var args = POE.toArray(arguments);
        console.error.apply(console, [
          parseFormat(args),
          color.error
        ].concat(args));
      },
      group: function (label, fn, collapsed) {
        if (collapsed) {
          console.groupCollapsed(label);
        } else {
          console.group(label);
        }
        if (POE.isFunction(fn)) {
          fn(POE.console);
        } else {
          console.log(fn);
        }
        console.groupEnd(label);
      },
      log: function () {
        var args = POE.toArray(arguments);
        console.log.apply(console, [
          parseFormat(args),
          color.log
        ].concat(args));
      },
      info: function () {
        var args = POE.toArray(arguments);
        console.log.apply(console, [
          parseFormat(args),
          color.info
        ].concat(args));
      },
      table: console.table,
      time: function (label, fn) {
        label = label || '_';
        if (timeLogs[label]) {
          console.timeLog(label);
        } else {
          console.time(label);
          timeLogs[label];
        }
        if (fn) {
          fn(POE.console);
          console.timeEnd(label);
          delete timeLogs[label];
        }
      },
      debug: function (msg) {
        POE.support.debug && this.log(msg);
      },
      trace: console.trace,
      warn: function () {
        var args = POE.toArray(arguments);
        console.warn.apply(console, [
          parseFormat(args),
          color.warn
        ].concat(args));
      }
    };
    return POE;
  }(core, var_console);
  core_camelCase = function () {
    var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
    function camelCase(string) {
      return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, function (all, letter) {
        return letter.toUpperCase();
      });
    }
    return camelCase;
  }();
  var_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  var_rcssNum = function (pnum) {
    return new RegExp('^(?:([+-])=|)(' + pnum + ')([a-z%]*)$', 'i');
  }(var_pnum);
  var_rnumnonpx = function (pnum) {
    return new RegExp('^(' + pnum + ')(?!px)[a-z%]+$', 'i');
  }(var_pnum);
  dom_var_cssProps = {};
  dom_finalPropName = function (document, cssProps) {
    var emptyStyle = document.createElement('div').style;
    var vendorPropName = function (name) {
      if (name in emptyStyle) {
        return name;
      }
      var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
      while (i--) {
        name = cssPrefixes[i] + capName;
        if (name in emptyStyle) {
          return name;
        }
      }
    };
    return function (name) {
      var ret = cssProps[name];
      if (!ret) {
        ret = cssProps[name] = vendorPropName(name) || name;
      }
      return ret;
    };
  }(var_document, dom_var_cssProps);
  dom_var_cssHooks = {
    opacity: {
      get: function (elem, computed) {
        if (computed) {
          // We should always get a number back from opacity
          var ret = curCSS(elem, 'opacity');
          return ret === '' ? '1' : ret;
        }
      }
    }
  };
  dom_var_cssNumber = {
    'animationIterationCount': true,
    'columnCount': true,
    'fillOpacity': true,
    'flexGrow': true,
    'flexShrink': true,
    'fontWeight': true,
    'lineHeight': true,
    'opacity': true,
    'order': true,
    'orphans': true,
    'widows': true,
    'zIndex': true,
    'zoom': true
  };
  dom_getStyles = function (elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window;
    }
    return view.getComputedStyle(elem);
  };
  css = function (POE, access, camelCase, rcssNum, rnumnonpx, finalPropName, cssHooks, cssNumber, getStyles) {
    var rcustomProp = /^--/, adjustCSS = function (elem, prop, valueParts, tween) {
        var adjusted, scale, maxIterations = 20, currentValue = tween ? function () {
            return tween.cur();
          } : function () {
            return POE.css(elem, prop, '');
          }, initial = currentValue(), unit = valueParts && valueParts[3] || (cssNumber[prop] ? '' : 'px'),
          // Starting value computation is required for potential unit mismatches
          initialInUnit = (cssNumber[prop] || unit !== 'px' && +initial) && rcssNum.exec(POE.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
          // Support: Firefox <=54
          // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
          initial = initial / 2;
          // Trust units reported by POE.css
          unit = unit || initialInUnit[3];
          // Iteratively approximate from a nonzero starting point
          initialInUnit = +initial || 1;
          while (maxIterations--) {
            // Evaluate and update our best guess (doubling guesses that zero out).
            // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
            POE.style(elem, prop, initialInUnit + unit);
            if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
              maxIterations = 0;
            }
            initialInUnit = initialInUnit / scale;
          }
          initialInUnit = initialInUnit * 2;
          POE.style(elem, prop, initialInUnit + unit);
          // Make sure we update the tween properties later on
          valueParts = valueParts || [];
        }
        if (valueParts) {
          initialInUnit = +initialInUnit || +initial || 0;
          // Apply relative offset (+=/-=) if specified
          adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
          if (tween) {
            tween.unit = unit;
            tween.start = initialInUnit;
            tween.end = adjusted;
          }
        }
        return adjusted;
      }, curCSS = function (elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        computed = computed || getStyles(elem);
        if (computed) {
          ret = computed.getPropertyValue(name) || computed[name];
          if (ret === '' && !POE.contains(elem.ownerDocument, elem)) {
            ret = POE.style(elem, name);
          }
          if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
            // Remember the original values
            width = style.width;
            minWidth = style.minWidth;
            maxWidth = style.maxWidth;
            // Put in the new values to get a computed value out
            style.minWidth = style.maxWidth = style.width = ret;
            ret = computed.width;
            // Revert the changed values
            style.width = width;
            style.minWidth = minWidth;
            style.maxWidth = maxWidth;
          }
        }
        return ret !== undefined ? ret + '' : ret;
      };
    POE.extend({
      style: function (elem, name, value, extra) {
        // Don't set styles on text and comment nodes
        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
          return;
        }
        // Make sure that we're working with the right name
        var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
        // Make sure that we're working with the right name. We don't
        // want to query the value if it is a CSS custom property
        // since they are user-defined.
        if (!isCustomProp) {
          name = finalPropName(origName);
        }
        // Gets hook for the prefixed version, then unprefixed version
        hooks = cssHooks[name] || cssHooks[origName];
        // Check if we're setting a value
        if (value !== undefined) {
          type = typeof value;
          // Convert '+=' or '-=' to relative numbers (#7345)
          if (type === 'string' && (ret = rcssNum.exec(value)) && ret[1]) {
            value = adjustCSS(elem, name, ret);
            // Fixes bug #9237
            type = 'number';
          }
          // Make sure that null and NaN values aren't set (#7116)
          if (value == null || value !== value) {
            return;
          }
          // If a number was passed in, add the unit (except for certain CSS properties)
          if (type === 'number') {
            value += ret && ret[3] || (cssNumber[origName] ? '' : 'px');
          }
          // background-* props affect original clone's values
          if (!support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
            style[name] = 'inherit';
          }
          // If a hook was provided, use that value, otherwise just set the specified value
          if (!hooks || !('set' in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
            if (isCustomProp) {
              style.setProperty(name, value);
            } else {
              style[name] = value;
            }
          }
        } else {
          // If a hook was provided get the non-computed value from there
          if (hooks && 'get' in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
            return ret;
          }
          return style[name];
        }
      },
      css: function (elem, name, extra, styles) {
        var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
        if (!isCustomProp) {
          name = finalPropName(origName);
        }
        // Try prefixed name followed by the unprefixed name
        hooks = cssHooks[name] || cssHooks[origName];
        // If a hook was provided get the computed value from there
        if (hooks && 'get' in hooks) {
          val = hooks.get(elem, true, extra);
        }
        // Otherwise, if a way to get the computed value exists, use that
        if (val === undefined) {
          val = curCSS(elem, name, styles);
        }
        // Convert 'normal' to computed value
        if (val === 'normal' && name in cssNormalTransform) {
          val = cssNormalTransform[name];
        }
        // Make numeric if forced or a qualifier was provided and val looks numeric
        if (extra === '' || extra) {
          num = parseFloat(val);
          return extra === true || isFinite(num) ? num || 0 : val;
        }
        return val;
      }
    });
    POE.fn.extend({
      css: function (name, value) {
        return access(this, function (elem, name, value) {
          var styles, len, map = {}, i = 0;
          if (POE.isArray(name)) {
            styles = getStyles(elem);
            len = name.length;
            for (; i < len; i++) {
              map[name[i]] = POE.css(elem, name[i], false, styles);
            }
            return map;
          }
          return value !== undefined ? POE.style(elem, name, value) : POE.css(elem, name);
        }, name, value, arguments.length > 1);
      }
    });
    return POE;
  }(core, core_access, core_camelCase, var_rcssNum, var_rnumnonpx, dom_finalPropName, dom_var_cssHooks, dom_var_cssNumber, dom_getStyles);
  core_acceptData = function (owner) {
    // Accepts only:
    //  - Node
    //    - Node.ELEMENT_NODE
    //    - Node.DOCUMENT_NODE
    //  - Object
    //    - Any
    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
  };
  data_core = function (POE, camelCase, acceptData) {
    function Data() {
      this.expando = POE.expando + Data.uid++;
    }
    Data.uid = 1;
    Data.prototype = {
      cache: function (owner) {
        // Check if the owner object already has a cache
        var value = owner[this.expando];
        // If not, create one
        if (!value) {
          value = {};
          // We can accept data for non-element nodes in modern browsers,
          // but we should not, see #8335.
          // Always return an empty object.
          if (acceptData(owner)) {
            // If it is a node unlikely to be stringify-ed or looped over
            // use plain assignment
            if (owner.nodeType) {
              owner[this.expando] = value  // Otherwise secure it in a non-enumerable property
                     // configurable must be true to allow the property to be
                     // deleted when data is removed
;
            } else {
              Object.defineProperty(owner, this.expando, {
                value: value,
                configurable: true
              });
            }
          }
        }
        return value;
      },
      set: function (owner, data, value) {
        var prop, cache = this.cache(owner);
        // Handle: [ owner, key, value ] args
        // Always use camelCase key (gh-2257)
        if (typeof data === 'string') {
          cache[camelCase(data)] = value  // Handle: [ owner, { properties } ] args
;
        } else {
          // Copy the properties one-by-one to the cache object
          for (prop in data) {
            cache[camelCase(prop)] = data[prop];
          }
        }
        return cache;
      },
      get: function (owner, key) {
        return key === undefined ? this.cache(owner) : // Always use camelCase key (gh-2257)
        owner[this.expando] && owner[this.expando][camelCase(key)];
      },
      access: function (owner, key, value) {
        // In cases where either:
        //
        //   1. No key was specified
        //   2. A string key was specified, but no value provided
        //
        // Take the 'read' path and allow the get method to determine
        // which value to return, respectively either:
        //
        //   1. The entire cache object
        //   2. The data stored at the key
        //
        if (key === undefined || key && typeof key === 'string' && value === undefined) {
          return this.get(owner, key);
        }
        // When the key is not a string, or both a key and value
        // are specified, set or extend (existing objects) with either:
        //
        //   1. An object of properties
        //   2. A key and value
        //
        this.set(owner, key, value);
        // Since the 'set' path can have two possible entry points
        // return the expected data based on which path was taken[*]
        return value !== undefined ? value : key;
      },
      remove: function (owner, key) {
        var i, cache = owner[this.expando];
        if (cache === undefined) {
          return;
        }
        if (key !== undefined) {
          // Support array or space separated string of keys
          if (Array.isArray(key)) {
            // If key is an array of keys...
            // We always set camelCase keys, so remove that.
            key = key.map(camelCase);
          } else {
            key = camelCase(key);
            // If a key with the spaces exists, use it.
            // Otherwise, create an array by matching non-whitespace
            key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
          }
          i = key.length;
          while (i--) {
            delete cache[key[i]];
          }
        }
        // Remove the expando if there's no more data
        if (key === undefined || POE.isEmptyObject(cache)) {
          // Support: Chrome <=35 - 45
          // Webkit & Blink performance suffers when deleting properties
          // from DOM nodes, so set to undefined instead
          // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
          if (owner.nodeType) {
            owner[this.expando] = undefined;
          } else {
            delete owner[this.expando];
          }
        }
      },
      hasData: function (owner) {
        var cache = owner[this.expando];
        return cache !== undefined && !POE.isEmptyObject(cache);
      }
    };
    return Data;
  }(core, core_camelCase, core_acceptData);
  data_dataPriv = function (Data) {
    var dataPriv = new Data();
    return dataPriv;
  }(data_core);
  data_dataUser = function (Data) {
    var dataUser = new Data();
    return dataUser;
  }(data_core);
  data = function (POE, access, camelCase, dataPriv, dataUser) {
    //	Implementation Summary
    //
    //	1. Enforce API surface and semantic compatibility with 1.9.x branch
    //	2. Improve the module's maintainability by reducing the storage
    //		paths to a single mechanism.
    //	3. Use the same single mechanism to support 'private' and 'user' data.
    //	4. _Never_ expose 'private' data to user code (TODO: Drop _data, _removeData)
    //	5. Avoid exposing implementation details on user objects (eg. expando properties)
    //	6. Provide a clear path for implementation upgrade to WeakMap in 2014
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
    function getData(data) {
      if (data === 'true') {
        return true;
      }
      if (data === 'false') {
        return false;
      }
      if (data === 'null') {
        return null;
      }
      // Only convert to a number if it doesn't change the string
      if (data === +data + '') {
        return +data;
      }
      if (rbrace.test(data)) {
        return JSON.parse(data);
      }
      return data;
    }
    function dataAttr(elem, key, data) {
      var name;
      // If nothing was found internally, try to fetch any
      // data from the HTML5 data-* attribute
      if (data === undefined && elem.nodeType === 1) {
        name = 'data-' + key.replace(rmultiDash, '-$&').toLowerCase();
        data = elem.getAttribute(name);
        if (typeof data === 'string') {
          try {
            data = getData(data);
          } catch (e) {
          }
          // Make sure we set the data so it isn't changed later
          dataUser.set(elem, key, data);
        } else {
          data = undefined;
        }
      }
      return data;
    }
    POE.extend({
      hasData: function (elem) {
        return dataUser.hasData(elem) || dataPriv.hasData(elem);
      },
      data: function (elem, name, data) {
        return dataUser.access(elem, name, data);
      },
      removeData: function (elem, name) {
        dataUser.remove(elem, name);
      },
      // TODO: Now that all calls to _data and _removeData have been replaced
      // with direct calls to dataPriv methods, these can be deprecated.
      _data: function (elem, name, data) {
        return dataPriv.access(elem, name, data);
      },
      _removeData: function (elem, name) {
        dataPriv.remove(elem, name);
      }
    });
    POE.fn.extend({
      data: function (key, value) {
        var i, name, data, elem = this[0], attrs = elem && elem.attributes;
        // Gets all values
        if (key === undefined) {
          if (this.length) {
            data = dataUser.get(elem);
            if (elem.nodeType === 1 && !dataPriv.get(elem, 'hasDataAttrs')) {
              i = attrs.length;
              while (i--) {
                // Support: IE 11 only
                // The attrs elements can be null (#14894)
                if (attrs[i]) {
                  name = attrs[i].name;
                  if (name.indexOf('data-') === 0) {
                    name = camelCase(name.slice(5));
                    dataAttr(elem, name, data[name]);
                  }
                }
              }
              dataPriv.set(elem, 'hasDataAttrs', true);
            }
          }
          return data;
        }
        // Sets multiple values
        if (typeof key === 'object') {
          return this.each(function () {
            dataUser.set(this, key);
          });
        }
        return access(this, function (value) {
          var data;
          // The calling POE object (element matches) is not empty
          // (and therefore has an element appears at this[ 0 ]) and the
          // `value` parameter was not undefined. An empty POE object
          // will result in `undefined` for elem = this[ 0 ] which will
          // throw an exception if an attempt to read a data cache is made.
          if (elem && value === undefined) {
            // Attempt to get data from the cache
            // The key will always be camelCased in Data
            data = dataUser.get(elem, key);
            if (data !== undefined) {
              return data;
            }
            // Attempt to 'discover' the data in
            // HTML5 custom data-* attrs
            data = dataAttr(elem, key);
            if (data !== undefined) {
              return data;
            }
            // We tried really hard, but the data doesn't exist.
            return;
          }
          // Set the data...
          this.each(function () {
            // We always store the camelCased key
            dataUser.set(this, key, value);
          });
        }, null, value, arguments.length > 1, null, true);
      },
      removeData: function (key) {
        return this.each(function () {
          dataUser.remove(this, key);
        });
      }
    });
  }(core, core_access, core_camelCase, data_dataPriv, data_dataUser);
  core_nodeName = function (elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  };
  core_concat = function (arr) {
    return arr.concat;
  }(var_arr);
  core_getAll = function (merge) {
    return function (context, tag) {
      var ret;
      if (typeof context.getElementsByTagName !== 'undefined') {
        ret = context.getElementsByTagName(tag || '*');
      } else if (typeof context.querySelectorAll !== 'undefined') {
        ret = context.querySelectorAll(tag || '*');
      } else {
        ret = [];
      }
      if (tag === undefined || tag && (context.nodeName && context.nodeName.toLowerCase() === tag.toLowerCase())) {
        return merge([context], ret);
      }
      return ret;
    };
  }(core_merge);
  core_htmlPrefilter = function () {
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;
    return function (html) {
      return html.replace(rxhtmlTag, '<$1></$2>');
    };
  }();
  core_setGlobalEval = function (elems, refElements) {
    var i = 0, l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(elems[i], 'globalEval', !refElements || dataPriv.get(refElements[i], 'globalEval'));
    }
  };
  core_wrapMap = function () {
    var wrapMap = {
      option: [
        1,
        '<select multiple="multiple">',
        '</select>'
      ],
      thead: [
        1,
        '<table>',
        '</table>'
      ],
      col: [
        2,
        '<table><colgroup>',
        '</colgroup></table>'
      ],
      tr: [
        2,
        '<table><tbody>',
        '</tbody></table>'
      ],
      td: [
        3,
        '<table><tbody><tr>',
        '</tr></tbody></table>'
      ],
      _default: [
        0,
        '',
        ''
      ]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    return wrapMap;
  }();
  var_rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
  core_buildFragment = function (toType, getAll, merge, htmlPrefilter, setGlobalEval, inArray, wrapMap, rtagName) {
    var rhtml = /<|&#?\w+;/;
    return function (elems, context, scripts, selection, ignored) {
      var elem, tmp, tag, wrap, contains, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
      for (; i < l; i++) {
        elem = elems[i];
        if (elem || elem === 0) {
          // Add nodes directly
          if (toType(elem) === 'object') {
            // Support: Android <=4.0 only, PhantomJS 1 only
            // push.apply(_, arraylike) throws on ancient WebKit
            merge(nodes, elem.nodeType ? [elem] : elem)  // Convert non-html into a text node
;
          } else if (!rhtml.test(elem)) {
            nodes.push(context.createTextNode(elem))  // Convert html into DOM nodes
;
          } else {
            tmp = tmp || fragment.appendChild(context.createElement('div'));
            // Deserialize a standard representation
            tag = (rtagName.exec(elem) || [
              '',
              ''
            ])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + htmlPrefilter(elem) + wrap[2];
            // Descend through wrappers to the right content
            j = wrap[0];
            while (j--) {
              tmp = tmp.lastChild;
            }
            // Support: Android <=4.0 only, PhantomJS 1 only
            // push.apply(_, arraylike) throws on ancient WebKit
            merge(nodes, tmp.childNodes);
            // Remember the top-level container
            tmp = fragment.firstChild;
            // Ensure the created nodes are orphaned (#12392)
            tmp.textContent = '';
          }
        }
      }
      // Remove wrapper from fragment
      fragment.textContent = '';
      i = 0;
      while (elem = nodes[i++]) {
        // Skip elements already in the context collection (trac-4087)
        if (selection && inArray(elem, selection) > -1) {
          if (ignored) {
            ignored.push(elem);
          }
          continue;
        }
        contains = elem.ownerDocument && POE.contains(elem.ownerDocument, elem);
        tmp = getAll(fragment.appendChild(elem), 'script');
        // Preserve script evaluation history
        if (contains) {
          setGlobalEval(tmp);
        }
        if (scripts) {
          j = 0;
          while (elem = tmp[j++]) {
            if (/^$|^module$|\/(?:java|ecma)script/i.test(elem.type || '')) {
              scripts.push(elem);
            }
          }
        }
      }
      return fragment;
    };
  }(core_toType, core_getAll, core_merge, core_htmlPrefilter, core_setGlobalEval, core_inArray, core_wrapMap, var_rtagName);
  var_rparentsprev = /^(?:parents|prev(?:Until|All))/;
  /*!
   * Sizzle CSS Selector Engine v2.3.4-pre
   * https://sizzlejs.com/
   *
   * Copyright JS Foundation and other contributors
   * Released under the MIT license
   * https://js.foundation/
   *
   * Date: 2019-01-14
   */
  (function (window) {
    var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate,
      // Local document vars
      setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains,
      // Instance-specific data
      expando = 'sizzle' + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function (a, b) {
        if (a === b) {
          hasDuplicate = true;
        }
        return 0;
      },
      // Instance methods
      hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice,
      // Use a stripped-down indexOf as it's faster than native
      // https://jsperf.com/thor-indexof-vs-for/5
      indexOf = function (list, elem) {
        var i = 0, len = list.length;
        for (; i < len; i++) {
          if (list[i] === elem) {
            return i;
          }
        }
        return -1;
      }, booleans = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      // Regular expressions
      // http://www.w3.org/TR/css3-selectors/#whitespace
      whitespace = '[\\x20\\t\\r\\n\\f]',
      // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
      identifier = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+',
      // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
      attributes = '\\[' + whitespace + '*(' + identifier + ')(?:' + whitespace + // Operator (capture 2)
      '*([*^$|!~]?=)' + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
      '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + identifier + '))|)' + whitespace + '*\\]', pseudos = ':(' + identifier + ')(?:\\((' + // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
      // 1. quoted (capture 3; capture 4 or capture 5)
      '(\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|' + // 2. simple (capture 6)
      '((?:\\\\.|[^\\\\()[\\]]|' + attributes + ')*)|' + // 3. anything else (capture 2)
      '.*' + ')\\)|)',
      // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
      rwhitespace = new RegExp(whitespace + '+', 'g'), rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'), rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'), rcombinators = new RegExp('^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*'), rdescend = new RegExp(whitespace + '|>'), rpseudo = new RegExp(pseudos), ridentifier = new RegExp('^' + identifier + '$'), matchExpr = {
        'ID': new RegExp('^#(' + identifier + ')'),
        'CLASS': new RegExp('^\\.(' + identifier + ')'),
        'TAG': new RegExp('^(' + identifier + '|[*])'),
        'ATTR': new RegExp('^' + attributes),
        'PSEUDO': new RegExp('^' + pseudos),
        'CHILD': new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + whitespace + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
        'bool': new RegExp('^(?:' + booleans + ')$', 'i'),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        'needsContext': new RegExp('^' + whitespace + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', 'i')
      }, rhtml = /HTML$/i, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/,
      // Easily-parseable/retrievable ID or TAG or CLASS selectors
      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/,
      // CSS escapes
      // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
      runescape = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig'), funescape = function (_, escaped, escapedWhitespace) {
        var high = '0x' + escaped - 65536;
        // NaN means non-codepoint
        // Support: Firefox<24
        // Workaround erroneous numeric interpretation of +"0x"
        return high !== high || escapedWhitespace ? escaped : high < 0 ? // BMP codepoint
        String.fromCharCode(high + 65536) : // Supplemental Plane codepoint (surrogate pair)
        String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
      },
      // CSS string/identifier serialization
      // https://drafts.csswg.org/cssom/#common-serializing-idioms
      rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function (ch, asCodePoint) {
        if (asCodePoint) {
          // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
          if (ch === '\0') {
            return '\uFFFD';
          }
          // Control characters and (dependent upon position) numbers get escaped as code points
          return ch.slice(0, -1) + '\\' + ch.charCodeAt(ch.length - 1).toString(16) + ' ';
        }
        // Other potentially-special ASCII characters get backslash-escaped
        return '\\' + ch;
      },
      // Used for iframes
      // See setDocument()
      // Removing the function wrapper causes a "Permission Denied"
      // error in IE
      unloadHandler = function () {
        setDocument();
      }, inDisabledFieldset = addCombinator(function (elem) {
        return elem.disabled === true && elem.nodeName.toLowerCase() === 'fieldset';
      }, {
        dir: 'parentNode',
        next: 'legend'
      });
    // Optimize for push.apply( _, NodeList )
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
      // Support: Android<4.0
      // Detect silently failing push.apply
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ? function (target, els) {
          push_native.apply(target, slice.call(els));
        } : function (target, els) {
          var j = target.length, i = 0;
          while (target[j++] = els[i++]) {
          }
          target.length = j - 1;
        }
      };
    }
    function Sizzle(selector, context, results, seed) {
      var m, i, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument,
        // nodeType defaults to 9, since context defaults to document
        nodeType = context ? context.nodeType : 9;
      results = results || [];
      // Return early from calls with invalid selector or context
      if (typeof selector !== 'string' || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      // Try to shortcut find operations (as opposed to filters) in HTML documents
      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }
        context = context || document;
        if (documentIsHTML) {
          // If the selector is sufficiently simple, try using a "get*By*" DOM method
          // (excepting DocumentFragment context, where the methods don't exist)
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            // ID selector
            if (m = match[1]) {
              // Document context
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  // Support: IE, Opera, Webkit
                  // TODO: identify versions
                  // getElementById can match elements by name instead of ID
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                }  // Element context
              } else {
                // Support: IE, Opera, Webkit
                // TODO: identify versions
                // getElementById can match elements by name instead of ID
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              }  // Type selector
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;  // Class selector
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          // Take advantage of querySelectorAll
          if (support.qsa && !nonnativeSelectorCache[selector + ' '] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && (nodeType !== 1 || context.nodeName.toLowerCase() !== 'object')) {
            newSelector = selector;
            newContext = context;
            // qSA considers elements outside a scoping root when evaluating child or
            // descendant combinators, which is not what we want.
            // In such cases, we work around the behavior by prefixing every selector in the
            // list with an ID selector referencing the scope context.
            // Thanks to Andrew Dupont for this technique.
            if (nodeType === 1 && rdescend.test(selector)) {
              // Capture the context ID, setting it first if necessary
              if (nid = context.getAttribute('id')) {
                nid = nid.replace(rcssescape, fcssescape);
              } else {
                context.setAttribute('id', nid = expando);
              }
              // Prefix every selector in the list
              groups = tokenize(selector);
              i = groups.length;
              while (i--) {
                groups[i] = '#' + nid + ' ' + toSelector(groups[i]);
              }
              newSelector = groups.join(',');
              // Expand context for sibling selectors
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }
            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results;
            } catch (qsaError) {
              nonnativeSelectorCache(selector, true);
            } finally {
              if (nid === expando) {
                context.removeAttribute('id');
              }
            }
          }
        }
      }
      // All others
      return select(selector.replace(rtrim, '$1'), context, results, seed);
    }
    /**
     * Create key-value caches of limited size
     * @returns {function(string, object)} Returns the Object data after storing it on itself with
     *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *	deleting the oldest entry
     */
    function createCache() {
      var keys = [];
      function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if (keys.push(key + ' ') > Expr.cacheLength) {
          // Only keep the most recent entries
          delete cache[keys.shift()];
        }
        return cache[key + ' '] = value;
      }
      return cache;
    }
    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    /**
     * Support testing using an element
     * @param {Function} fn Passed the created element and returns a boolean result
     */
    function assert(fn) {
      var el = document.createElement('fieldset');
      try {
        return !!fn(el);
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
        // release memory in IE
        el = null;
      }
    }
    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */
    function addHandle(attrs, handler) {
      var arr = attrs.split('|'), i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */
    function siblingCheck(a, b) {
      var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
      // Use IE sourceIndex if available on both nodes
      if (diff) {
        return diff;
      }
      // Check if b follows a
      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */
    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === 'input' && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */
    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === 'input' || name === 'button') && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for :enabled/:disabled
     * @param {Boolean} disabled true for :disabled; false for :enabled
     */
    function createDisabledPseudo(disabled) {
      // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
      return function (elem) {
        // Only certain elements can match :enabled or :disabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
        if ('form' in elem) {
          // Check for inherited disabledness on relevant non-disabled elements:
          // * listed form-associated elements in a disabled fieldset
          //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
          // * option elements in a disabled optgroup
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
          // All such elements have a "form" property.
          if (elem.parentNode && elem.disabled === false) {
            // Option elements defer to a parent optgroup if present
            if ('label' in elem) {
              if ('label' in elem.parentNode) {
                return elem.parentNode.disabled === disabled;
              } else {
                return elem.disabled === disabled;
              }
            }
            // Support: IE 6 - 11
            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
            return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
            /* jshint -W018 */
            elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
          }
          return elem.disabled === disabled;  // Try to winnow out elements that can't be disabled before trusting the disabled property.
                                              // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                                              // even exist on them, let alone have a boolean value.
        } else if ('label' in elem) {
          return elem.disabled === disabled;
        }
        // Remaining elements are neither :enabled nor :disabled
        return false;
      };
    }
    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */
    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
          // Match elements found at the specified indexes
          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    /**
     * Checks a node for validity as a Sizzle context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== 'undefined' && context;
    }
    // Expose support vars for convenience
    support = Sizzle.support = {};
    /**
     * Detects XML nodes
     * @param {Element|Object} elem An element or a document
     * @returns {Boolean} True iff elem is a non-HTML XML node
     */
    isXML = Sizzle.isXML = function (elem) {
      var namespace = elem.namespaceURI, docElem = (elem.ownerDocument || elem).documentElement;
      // Support: IE <=8
      // Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
      // https://bugs.jquery.com/ticket/4833
      return !rhtml.test(namespace || docElem && docElem.nodeName || 'HTML');
    };
    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */
    setDocument = Sizzle.setDocument = function (node) {
      var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
      // Return early if doc is invalid or already selected
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      // Update global variables
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);
      // Support: IE 9-11, Edge
      // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
      if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
        // Support: IE 11, Edge
        if (subWindow.addEventListener) {
          subWindow.addEventListener('unload', unloadHandler, false);  // Support: IE 9 - 10 only
        } else if (subWindow.attachEvent) {
          subWindow.attachEvent('onunload', unloadHandler);
        }
      }
      /* Attributes
      	---------------------------------------------------------------------- */
      // Support: IE<8
      // Verify that getAttribute really returns attributes and not properties
      // (excepting IE8 booleans)
      support.attributes = assert(function (el) {
        el.className = 'i';
        return !el.getAttribute('className');
      });
      /* getElement(s)By*
      	---------------------------------------------------------------------- */
      // Check if getElementsByTagName("*") returns only elements
      support.getElementsByTagName = assert(function (el) {
        el.appendChild(document.createComment(''));
        return !el.getElementsByTagName('*').length;
      });
      // Support: IE<9
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);
      // Support: IE<10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programmatically-set names,
      // so use a roundabout getElementsByName test
      support.getById = assert(function (el) {
        docElem.appendChild(el).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      });
      // ID filter and find
      if (support.getById) {
        Expr.filter['ID'] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute('id') === attrId;
          };
        };
        Expr.find['ID'] = function (id, context) {
          if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
            var elem = context.getElementById(id);
            return elem ? [elem] : [];
          }
        };
      } else {
        Expr.filter['ID'] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== 'undefined' && elem.getAttributeNode('id');
            return node && node.value === attrId;
          };
        };
        // Support: IE 6 - 7 only
        // getElementById is not reliable as a find shortcut
        Expr.find['ID'] = function (id, context) {
          if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
            var node, i, elems, elem = context.getElementById(id);
            if (elem) {
              // Verify the id attribute
              node = elem.getAttributeNode('id');
              if (node && node.value === id) {
                return [elem];
              }
              // Fall back on getElementsByName
              elems = context.getElementsByName(id);
              i = 0;
              while (elem = elems[i++]) {
                node = elem.getAttributeNode('id');
                if (node && node.value === id) {
                  return [elem];
                }
              }
            }
            return [];
          }
        };
      }
      // Tag
      Expr.find['TAG'] = support.getElementsByTagName ? function (tag, context) {
        if (typeof context.getElementsByTagName !== 'undefined') {
          return context.getElementsByTagName(tag);  // DocumentFragment nodes don't have gEBTN
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function (tag, context) {
        var elem, tmp = [], i = 0,
          // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
          results = context.getElementsByTagName(tag);
        // Filter out possible comments
        if (tag === '*') {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      // Class
      Expr.find['CLASS'] = support.getElementsByClassName && function (className, context) {
        if (typeof context.getElementsByClassName !== 'undefined' && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      /* QSA/matchesSelector
      	---------------------------------------------------------------------- */
      // QSA and matchesSelector support
      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
      rbuggyMatches = [];
      // qSa(:focus) reports false when true (Chrome 21)
      // We allow this because of a bug in IE8/9 that throws an error
      // whenever `document.activeElement` is accessed on an iframe
      // So, we allow :focus to pass through QSA all the time to avoid the IE error
      // See https://bugs.jquery.com/ticket/13378
      rbuggyQSA = [];
      if (support.qsa = rnative.test(document.querySelectorAll)) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function (el) {
          // Select is set to empty string on purpose
          // This is to test IE's treatment of not explicitly
          // setting a boolean content attribute,
          // since its presence should be enough
          // https://bugs.jquery.com/ticket/12359
          docElem.appendChild(el).innerHTML = '<a id=\'' + expando + '\'></a>' + '<select id=\'' + expando + '-\r\\\' msallowcapture=\'\'>' + '<option selected=\'\'></option></select>';
          // Support: IE8, Opera 11-12.16
          // Nothing should be selected when empty strings follow ^= or $= or *=
          // The test attribute must be unknown in Opera but "safe" for WinRT
          // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
          if (el.querySelectorAll('[msallowcapture^=\'\']').length) {
            rbuggyQSA.push('[*^$]=' + whitespace + '*(?:\'\'|"")');
          }
          // Support: IE8
          // Boolean attributes and "value" are not treated correctly
          if (!el.querySelectorAll('[selected]').length) {
            rbuggyQSA.push('\\[' + whitespace + '*(?:value|' + booleans + ')');
          }
          // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
          if (!el.querySelectorAll('[id~=' + expando + '-]').length) {
            rbuggyQSA.push('~=');
          }
          // Webkit/Opera - :checked should return selected option elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          // IE8 throws error here and will not see later tests
          if (!el.querySelectorAll(':checked').length) {
            rbuggyQSA.push(':checked');
          }
          // Support: Safari 8+, iOS 8+
          // https://bugs.webkit.org/show_bug.cgi?id=136851
          // In-page `selector#id sibling-combinator selector` fails
          if (!el.querySelectorAll('a#' + expando + '+*').length) {
            rbuggyQSA.push('.#.+[+~]');
          }
        });
        assert(function (el) {
          el.innerHTML = '<a href=\'\' disabled=\'disabled\'></a>' + '<select disabled=\'disabled\'><option/></select>';
          // Support: Windows 8 Native Apps
          // The type and name attributes are restricted during .innerHTML assignment
          var input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          el.appendChild(input).setAttribute('name', 'D');
          // Support: IE8
          // Enforce case-sensitivity of name attribute
          if (el.querySelectorAll('[name=d]').length) {
            rbuggyQSA.push('name' + whitespace + '*[*^$|!~]?=');
          }
          // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
          // IE8 throws error here and will not see later tests
          if (el.querySelectorAll(':enabled').length !== 2) {
            rbuggyQSA.push(':enabled', ':disabled');
          }
          // Support: IE9-11+
          // IE's :disabled selector does not pick up the children of disabled fieldsets
          docElem.appendChild(el).disabled = true;
          if (el.querySelectorAll(':disabled').length !== 2) {
            rbuggyQSA.push(':enabled', ':disabled');
          }
          // Opera 10-11 does not throw on post-comma invalid pseudos
          el.querySelectorAll('*,:x');
          rbuggyQSA.push(',.*:');
        });
      }
      if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function (el) {
          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          support.disconnectedMatch = matches.call(el, '*');
          // This should fail with an exception
          // Gecko does not error, returns false instead
          matches.call(el, '[s!=\'\']:x');
          rbuggyMatches.push('!=', pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'));
      /* Contains
      	---------------------------------------------------------------------- */
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      // Element contains another
      // Purposefully self-exclusive
      // As in, an element does not contain itself
      contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function (a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      /* Sorting
      	---------------------------------------------------------------------- */
      // Document order sorting
      sortOrder = hasCompare ? function (a, b) {
        // Flag for duplicate removal
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        // Sort on method existence if only one input has compareDocumentPosition
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        // Calculate position if both inputs belong to the same document
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : // Otherwise we know they are disconnected
        1;
        // Disconnected nodes
        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
          // Choose the first element that is related to our preferred document
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          // Maintain original order
          return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function (a, b) {
        // Exit early if the nodes are identical
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
        // Parentless nodes are either documents or disconnected
        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;  // If the nodes are siblings, we can do a quick check
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        // Otherwise we need full lists of their ancestors for comparison
        cur = a;
        while (cur = cur.parentNode) {
          ap.unshift(cur);
        }
        cur = b;
        while (cur = cur.parentNode) {
          bp.unshift(cur);
        }
        // Walk down the tree looking for a discrepancy
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? // Do a sibling check if the nodes have a common ancestor
        siblingCheck(ap[i], bp[i]) : // Otherwise nodes in our document sort first
        ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };
    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function (elem, expr) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      if (support.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + ' '] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          // IE 9's matchesSelector returns false on disconnected nodes
          if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
            // fragment in IE 9
            elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {
          nonnativeSelectorCache(expr, true);
        }
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function (context, elem) {
      // Set document vars if needed
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function (elem, name) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
        // Don't get fooled by Object.prototype properties (jQuery #13807)
        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.escape = function (sel) {
      return (sel + '').replace(rcssescape, fcssescape);
    };
    Sizzle.error = function (msg) {
      throw new Error('Syntax error, unrecognized expression: ' + msg);
    };
    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */
    Sizzle.uniqueSort = function (results) {
      var elem, duplicates = [], j = 0, i = 0;
      // Unless we *know* we can detect duplicates, assume their presence
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      // Clear input after sorting to release objects
      // See https://github.com/jquery/sizzle/pull/225
      sortInput = null;
      return results;
    };
    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */
    getText = Sizzle.getText = function (elem) {
      var node, ret = '', i = 0, nodeType = elem.nodeType;
      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while (node = elem[i++]) {
          // Do not traverse comment nodes
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if (typeof elem.textContent === 'string') {
          return elem.textContent;
        } else {
          // Traverse its children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      // Do not include comment or processing instruction nodes
      return ret;
    };
    Expr = Sizzle.selectors = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        '>': {
          dir: 'parentNode',
          first: true
        },
        ' ': { dir: 'parentNode' },
        '+': {
          dir: 'previousSibling',
          first: true
        },
        '~': { dir: 'previousSibling' }
      },
      preFilter: {
        'ATTR': function (match) {
          match[1] = match[1].replace(runescape, funescape);
          // Move the given value to match[3] whether quoted or unquoted
          match[3] = (match[3] || match[4] || match[5] || '').replace(runescape, funescape);
          if (match[2] === '~=') {
            match[3] = ' ' + match[3] + ' ';
          }
          return match.slice(0, 4);
        },
        'CHILD': function (match) {
          /* matches from matchExpr["CHILD"]
          		1 type (only|nth|...)
          		2 what (child|of-type)
          		3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
          		4 xn-component of xn+y argument ([+-]?\d*n|)
          		5 sign of xn-component
          		6 x of xn-component
          		7 sign of y-component
          		8 y of y-component
          	*/
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === 'nth') {
            // nth-* requires argument
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === 'even' || match[3] === 'odd'));
            match[5] = +(match[7] + match[8] || match[3] === 'odd');  // other types prohibit arguments
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        'PSEUDO': function (match) {
          var excess, unquoted = !match[6] && match[2];
          if (matchExpr['CHILD'].test(match[0])) {
            return null;
          }
          // Accept quoted arguments as-is
          if (match[3]) {
            match[2] = match[4] || match[5] || '';  // Strip excess characters from unquoted arguments
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
            // excess is a negative index
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          // Return only captures needed by the pseudo filter method (type and argument)
          return match.slice(0, 3);
        }
      },
      filter: {
        'TAG': function (nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === '*' ? function () {
            return true;
          } : function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        'CLASS': function (className) {
          var pattern = classCache[className + ' '];
          return pattern || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === 'string' && elem.className || typeof elem.getAttribute !== 'undefined' && elem.getAttribute('class') || '');
          });
        },
        'ATTR': function (name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === '!=';
            }
            if (!operator) {
              return true;
            }
            result += '';
            return operator === '=' ? result === check : operator === '!=' ? result !== check : operator === '^=' ? check && result.indexOf(check) === 0 : operator === '*=' ? check && result.indexOf(check) > -1 : operator === '$=' ? check && result.slice(-check.length) === check : operator === '~=' ? (' ' + result.replace(rwhitespace, ' ') + ' ').indexOf(check) > -1 : operator === '|=' ? result === check || result.slice(0, check.length + 1) === check + '-' : false;
          };
        },
        'CHILD': function (type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== 'nth', forward = type.slice(-4) !== 'last', ofType = what === 'of-type';
          return first === 1 && last === 0 ? // Shortcut for :nth-*(n)
          function (elem) {
            return !!elem.parentNode;
          } : function (elem, context, xml) {
            var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? 'nextSibling' : 'previousSibling', parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
            if (parent) {
              // :(first|last|only)-(child|of-type)
              if (simple) {
                while (dir) {
                  node = elem;
                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  // Reverse direction for :only-* (if we haven't yet done so)
                  start = dir = type === 'only' && !start && 'nextSibling';
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              // non-xml :nth-child(...) stores cache data on `parent`
              if (forward && useCache) {
                // Seek `elem` from a previously-cached index
                // ...in a gzip-friendly way
                node = parent;
                outerCache = node[expando] || (node[expando] = {});
                // Support: IE <9 only
                // Defend against cloned attroperties (jQuery gh-1709)
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                  // When found, cache indexes on `parent` and break
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [
                      dirruns,
                      nodeIndex,
                      diff
                    ];
                    break;
                  }
                }
              } else {
                // Use previously-cached element index if available
                if (useCache) {
                  // ...in a gzip-friendly way
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});
                  // Support: IE <9 only
                  // Defend against cloned attroperties (jQuery gh-1709)
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                // xml :nth-child(...)
                // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                if (diff === false) {
                  // Use the same loop as above to seek `elem` from the start
                  while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      // Cache the index of each encountered element
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        // Support: IE <9 only
                        // Defend against cloned attroperties (jQuery gh-1709)
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [
                          dirruns,
                          diff
                        ];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              // Incorporate the offset, then check against cycle size
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        'PSEUDO': function (pseudo, argument) {
          // pseudo-class names are case-insensitive
          // http://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that setFilters inherits from pseudos
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error('unsupported pseudo: ' + pseudo);
          // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as Sizzle does
          if (fn[expando]) {
            return fn(argument);
          }
          // But maintain support for old signatures
          if (fn.length > 1) {
            args = [
              pseudo,
              pseudo,
              '',
              argument
            ];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx, matched = fn(seed, argument), i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        'not': markFunction(function (selector) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [], results = [], matcher = compile(selector.replace(rtrim, '$1'));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
            // Match elements unmatched by `matcher`
            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            // Don't keep the element (issue #299)
            input[0] = null;
            return !results.pop();
          };
        }),
        'has': markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        'contains': markFunction(function (text) {
          text = text.replace(runescape, funescape);
          return function (elem) {
            return (elem.textContent || getText(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        'lang': markFunction(function (lang) {
          // lang value must be a valid identifier
          if (!ridentifier.test(lang || '')) {
            Sizzle.error('unsupported lang: ' + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute('xml:lang') || elem.getAttribute('lang')) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + '-') === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        // Miscellaneous
        'target': function (elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        'root': function (elem) {
          return elem === docElem;
        },
        'focus': function (elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        'enabled': createDisabledPseudo(false),
        'disabled': createDisabledPseudo(true),
        'checked': function (elem) {
          // In CSS3, :checked should return both checked and selected elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === 'input' && !!elem.checked || nodeName === 'option' && !!elem.selected;
        },
        'selected': function (elem) {
          // Accessing this property makes selected-by-default
          // options in Safari work properly
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        // Contents
        'empty': function (elem) {
          // http://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
          //   but not by others (comment: 8; processing instruction: 7; etc.)
          // nodeType < 6 works because attributes (2) do not appear as children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        'parent': function (elem) {
          return !Expr.pseudos['empty'](elem);
        },
        // Element/input types
        'header': function (elem) {
          return rheader.test(elem.nodeName);
        },
        'input': function (elem) {
          return rinputs.test(elem.nodeName);
        },
        'button': function (elem) {
          var name = elem.nodeName.toLowerCase();
          return name === 'input' && elem.type === 'button' || name === 'button';
        },
        'text': function (elem) {
          var attr;
          return elem.nodeName.toLowerCase() === 'input' && elem.type === 'text' && ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === 'text');
        },
        // Position-in-collection
        'first': createPositionalPseudo(function () {
          return [0];
        }),
        'last': createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1];
        }),
        'eq': createPositionalPseudo(function (matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        'even': createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'odd': createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'lt': createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument > length ? length : argument;
          for (; --i >= 0;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'gt': createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos['nth'] = Expr.pseudos['eq'];
    // Add button/input type pseudos
    for (i in {
        radio: true,
        checkbox: true,
        file: true,
        password: true,
        image: true
      }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
        submit: true,
        reset: true
      }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    // Easy API for creating new setFilters
    function setFilters() {
    }
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function (selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + ' '];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        // Comma and first run
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;
        // Combinators
        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrim, ' ')
          });
          soFar = soFar.slice(matched.length);
        }
        // Filters
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : // Cache the tokens
      tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0, len = tokens.length, selector = '';
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir, skip = combinator.next, key = skip || dir, checkNonElements = base && key === 'parentNode', doneName = done++;
      return combinator.first ? // Check against closest ancestor/preceding element
      function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
        return false;
      } : // Check against all ancestor/preceding elements
      function (elem, context, xml) {
        var oldCache, uniqueCache, outerCache, newCache = [
            dirruns,
            doneName
          ];
        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              // Support: IE <9 only
              // Defend against cloned attroperties (jQuery gh-1709)
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if (skip && skip === elem.nodeName.toLowerCase()) {
                elem = elem[dir] || elem;
              } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                // Assign to newCache so results back-propagate to previous elements
                return newCache[2] = oldCache[2];
              } else {
                // Reuse newcache so results back-propagate to previous elements
                uniqueCache[key] = newCache;
                // A match means we're done; a fail means we have to keep checking
                if (newCache[2] = matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0, len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function (seed, results, context, xml) {
        var temp, i, elem, preMap = [], postMap = [], preexisting = results.length,
          // Get initial elements from seed or context
          elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []),
          // Prefilter to get matcher input, preserving a map for seed-results synchronization
          matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
          postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
          [] : // ...otherwise use results directly
          results : matcherIn;
        // Find primary matches
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        // Apply postFilter
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          // Un-match failing elements by moving them back to matcherIn
          i = temp.length;
          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if (elem = matcherOut[i]) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push(matcherIn[i] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }
            // Move matched elements from seed to results to keep them synchronized
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }  // Add elements to results, through postFinder if defined
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[' '], i = leadingRelative ? 1 : 0,
        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator(function (elem) {
          return elem === checkContext;
        }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
          return indexOf(checkContext, elem) > -1;
        }, implicitRelative, true), matchers = [function (elem, context, xml) {
            var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            // Avoid hanging onto element (issue #299)
            checkContext = null;
            return ret;
          }];
      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          // Return special upon seeing a positional matcher
          if (matcher[expando]) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(// If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === ' ' ? '*' : '' })).replace(rtrim, '$1'), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, outermost) {
          var elem, j, matcher, matchedCount = 0, i = '0', unmatched = seed && [], setMatched = [], contextBackup = outermostContext,
            // We must always have either seed elements or outermost context
            elems = seed || byElement && Expr.find['TAG']('*', outermost),
            // Use integer dirruns iff this is the outermost matcher
            dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
          if (outermost) {
            outermostContext = context === document || context || outermost;
          }
          // Add elements passing elementMatchers directly to results
          // Support: IE<9, Safari
          // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
          for (; i !== len && (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              j = 0;
              if (!context && elem.ownerDocument !== document) {
                setDocument(elem);
                xml = !documentIsHTML;
              }
              while (matcher = elementMatchers[j++]) {
                if (matcher(elem, context || document, xml)) {
                  results.push(elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
              }
            }
            // Track unmatched elements for set filters
            if (bySet) {
              // They will have gone through all possible matchers
              if (elem = !matcher && elem) {
                matchedCount--;
              }
              // Lengthen the array for every element, matched or not
              if (seed) {
                unmatched.push(elem);
              }
            }
          }
          // `i` is now the count of elements visited above, and adding it to `matchedCount`
          // makes the latter nonnegative.
          matchedCount += i;
          // Apply set filters to unmatched elements
          // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
          // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
          // no element matchers and no seed.
          // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
          // case, which will result in a "00" `matchedCount` that differs from `i` but is also
          // numerically zero.
          if (bySet && i !== matchedCount) {
            j = 0;
            while (matcher = setMatchers[j++]) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              // Reintegrate element matches to eliminate the need for sorting
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results);
                  }
                }
              }
              // Discard index placeholder values to get only actual matches
              setMatched = condense(setMatched);
            }
            // Add matches to results
            push.apply(results, setMatched);
            // Seedless set matches succeeding multiple successful matchers stipulate sorting
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              Sizzle.uniqueSort(results);
            }
          }
          // Override manipulation of globals by nested matchers
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function (selector, match) {
      var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + ' '];
      if (!cached) {
        // Generate a function of recursive functions that can be used to check each element
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        // Cache the compiled function
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        // Save selector and tokenization
        cached.selector = selector;
      }
      return cached;
    };
    /**
     * A low-level selection function that works with Sizzle's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with Sizzle.compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */
    select = Sizzle.select = function (selector, context, results, seed) {
      var i, tokens, token, type, find, compiled = typeof selector === 'function' && selector, match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || [];
      // Try to minimize operations if there is only one selector in the list and no seed
      // (the latter of which guarantees us context)
      if (match.length === 1) {
        // Reduce context if the leading compound selector is an ID
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === 'ID' && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find['ID'](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;  // Precompiled matchers will still verify ancestry, so step up a level
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        // Fetch a seed set for right-to-left matching
        i = matchExpr['needsContext'].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          // Abort if we hit a combinator
          if (Expr.relative[type = token.type]) {
            break;
          }
          if (find = Expr.find[type]) {
            // Search, expanding context for leading sibling combinators
            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      // Compile and execute a filtering function if one is not provided
      // Provide `match` to avoid retokenization if we modified the selector above
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    // One-time assignments
    // Sort stability
    support.sortStable = expando.split('').sort(sortOrder).join('') === expando;
    // Support: Chrome 14-35+
    // Always assume duplicates if they aren't passed to the comparison function
    support.detectDuplicates = !!hasDuplicate;
    // Initialize against the default document
    setDocument();
    // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*
    support.sortDetached = assert(function (el) {
      // Should return 1, but returns 4 (following)
      return el.compareDocumentPosition(document.createElement('fieldset')) & 1;
    });
    // Support: IE<8
    // Prevent attribute/property "interpolation"
    // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if (!assert(function (el) {
        el.innerHTML = '<a href=\'#\'></a>';
        return el.firstChild.getAttribute('href') === '#';
      })) {
      addHandle('type|href|height|width', function (elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === 'type' ? 1 : 2);
        }
      });
    }
    // Support: IE<9
    // Use defaultValue in place of getAttribute("value")
    if (!support.attributes || !assert(function (el) {
        el.innerHTML = '<input/>';
        el.firstChild.setAttribute('value', '');
        return el.firstChild.getAttribute('value') === '';
      })) {
      addHandle('value', function (elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === 'input') {
          return elem.defaultValue;
        }
      });
    }
    // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies
    if (!assert(function (el) {
        return el.getAttribute('disabled') == null;
      })) {
      addHandle(booleans, function (elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    // EXPOSE
    var _sizzle = window.Sizzle;
    Sizzle.noConflict = function () {
      if (window.Sizzle === Sizzle) {
        window.Sizzle = _sizzle;
      }
      return Sizzle;
    };
    if (true) {
      dom___external_sizzle = function () {
        return Sizzle;
      }();
    } else if (typeof module !== 'undefined' && module.exports) {
      module.exports = Sizzle;
    } else {
      window.Sizzle = Sizzle;
    }  // EXPOSE
  }(window));
  dom_filter = function (sizzle, grep) {
    return function (expr, elems, not) {
      var elem = elems[0];
      if (not) {
        expr = ':not(' + expr + ')';
      }
      if (elems.length === 1 && elem.nodeType === 1) {
        return sizzle.matchesSelector(elem, expr) ? [elem] : [];
      }
      return sizzle.matches(expr, grep(elems, function (elem) {
        return elem.nodeType === 1;
      }));
    };
  }(external_sizzle, core_grep);
  dom_winnow = function (filter, isFunction, grep) {
    return function (elements, qualifier, not) {
      if (isFunction(qualifier)) {
        return grep(elements, function (elem, i) {
          return !!qualifier.call(elem, i, elem) !== not;
        });
      }
      if (qualifier.nodeType) {
        return grep(elements, function (elem) {
          return elem === qualifier !== not;
        });
      }
      if (typeof qualifier !== 'string') {
        return grep(elements, function (elem) {
          return qualifier.indexOf(elem) > -1 !== not;
        });
      }
      return filter(qualifier, elements, not);
    };
  }(dom_filter, core_isFunction, core_grep);
  dom_sibling = function (cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {
    }
    return cur;
  };
  support = function (POE, document, extend) {
    POE.support = { debug: true };
    POE.debug = function (debug) {
      POE.support.debug = debug;
    };
    (function () {
      var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableMarginLeftVal, container = document.createElement('div'), div = document.createElement('div');
      if (!div.style) {
        return;
      }
      div.style.backgroundClip = 'content-box';
      div.cloneNode(true).style.backgroundClip = '';
      var roundPixelMeasures = function (measure) {
          return Math.round(parseFloat(measure));
        }, canCreateHTMLDocument = function () {
          var body = document.implementation.createHTMLDocument('').body;
          body.innerHTML = '<form></form><form></form>';
          return body.childNodes.length === 2;
        }, computeStyleTests = function () {
          if (!div) {
            return;
          }
          container.style.cssText = 'position:absolute;left:-11111px;width:60px;' + 'margin-top:1px;padding:0;border:0';
          div.style.cssText = 'position:relative;display:block;box-sizing:border-box;overflow:scroll;' + 'margin:auto;border:1px;padding:1px;' + 'width:60%;top:1%';
          documentElement.appendChild(container).appendChild(div);
          var divStyle = window.getComputedStyle(div);
          pixelPositionVal = divStyle.top !== '1%';
          // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
          reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
          // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
          // Some styles come back with percentage values, even though they shouldn't
          div.style.right = '60%';
          pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
          // Support: IE 9 - 11 only
          // Detect misreporting of content dimensions for box-sizing:border-box elements
          boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
          // Support: IE 9 only
          // Detect overflow:scroll screwiness (gh-3699)
          div.style.position = 'absolute';
          scrollboxSizeVal = div.offsetWidth === 36 || 'absolute';
          documentElement.removeChild(container);
          // Nullify the div so it wouldn't be stored in the memory and
          // it will also be a sign that checks already performed
          div = null;
        };
      extend(true, POE.support, {
        createHTMLDocument: canCreateHTMLDocument(),
        clearCloneStyle: div.style.backgroundClip === 'content-box',
        boxSizingReliable: function () {
          computeStyleTests();
          return boxSizingReliableVal;
        },
        pixelBoxStyles: function () {
          computeStyleTests();
          return pixelBoxStylesVal;
        },
        pixelPosition: function () {
          computeStyleTests();
          return pixelPositionVal;
        },
        reliableMarginLeft: function () {
          computeStyleTests();
          return reliableMarginLeftVal;
        },
        scrollboxSize: function () {
          computeStyleTests();
          return scrollboxSizeVal;
        }
      });
    });
    (function () {
      var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement('div')), input = document.createElement('input');
      // Support: Android 4.0 - 4.3 only
      // Check state lost if the name is set (#11217)
      // Support: Windows Web Apps (WWA)
      // `name` and `type` must use .setAttribute for WWA (#14901)
      input.setAttribute('type', 'radio');
      input.setAttribute('checked', 'checked');
      input.setAttribute('name', 't');
      div.appendChild(input);
      // Support: Android <=4.1 only
      // Older WebKit doesn't clone checked state correctly in fragments
      POE.support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
      // Support: IE <=11 only
      // Make sure textarea (and checkbox) defaultValue is properly cloned
      div.innerHTML = '<textarea>x</textarea>';
      POE.support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    }());
    (function () {
      var input = document.createElement('input'), select = document.createElement('select'), opt = select.appendChild(document.createElement('option'));
      input.type = 'checkbox';
      // Support: Android <=4.3 only
      // Default value for a checkbox should be "on"
      POE.support.checkOn = input.value !== '';
      // Support: IE <=11 only
      // Must access selectedIndex to make default options select
      POE.support.optSelected = opt.selected;
      // Support: IE <=11 only
      // An input loses its value after becoming a radio
      input = document.createElement('input');
      input.value = 't';
      input.type = 'radio';
      POE.support.radioValue = input.value === 't';
    }());
    return POE;
  }(core, var_document, core_extend);
  dom = function (POE, nodeName, push, concat, getAll, htmlPrefilter, buildFragment, each, document, rsingleTag, rparentsprev, winnow, filter, sibling, dataPriv, dataUser, access, setGlobalEval, isFunction, acceptData, wrapMap, rtagName, support) {
    /* eslint-enable */
    // Support: IE <=10 - 11, Edge 12 - 13 only
    // In IE/Edge using regex groups here causes severe slowdowns.
    // See https://connect.microsoft.com/IE/feedback/details/1736512/
    var rnoInnerhtml = /<script|<style|<link/i,
      // checked='checked' or checked
      // rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      // rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      indexOf = [].indexOf, guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      }, dir = function (elem, dir, until) {
        var matched = [], truncate = until !== undefined;
        while ((elem = elem[dir]) && elem.nodeType !== 9) {
          if (elem.nodeType === 1) {
            if (truncate && POE(elem).is(until)) {
              break;
            }
            matched.push(elem);
          }
        }
        return matched;
      }, siblings = function (n, elem) {
        var matched = [];
        for (; n; n = n.nextSibling) {
          if (n.nodeType === 1 && n !== elem) {
            matched.push(n);
          }
        }
        return matched;
      }, cloneCopyEvent = function (src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (dest.nodeType !== 1) {
          return;
        }
        // 1. Copy private data: events, handlers, etc.
        if (dataPriv.hasData(src)) {
          pdataOld = dataPriv.access(src);
          pdataCur = dataPriv.set(dest, pdataOld);
          events = pdataOld.events;
          if (events) {
            delete pdataCur.handle;
            pdataCur.events = {};
            for (type in events) {
              for (i = 0, l = events[type].length; i < l; i++) {
                POE.event.add(dest, type, events[type][i]);
              }
            }
          }
        }
        // 2. Copy user data
        if (dataUser.hasData(src)) {
          udataOld = dataUser.access(src);
          udataCur = POE.extend({}, udataOld);
          dataUser.set(dest, udataCur);
        }
      },
      // Fix IE bugs, see support tests
      fixInput = function (src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        // Fails to persist the checked state of a cloned checkbox or radio button.
        if (nodeName === 'input' && rcheckableType.test(src.type)) {
          dest.checked = src.checked;
        } else if (nodeName === 'input' || nodeName === 'textarea') {
          dest.defaultValue = src.defaultValue;
        }
      }, disableScript = function (elem) {
        elem.type = (elem.getAttribute('type') !== null) + '/' + elem.type;
        return elem;
      }, domManip = function (collection, args, callback, ignored) {
        // Flatten any nested arrays
        args = concat.apply([], args);
        var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction(value);
        // We can't cloneNode fragments that contain checked, in WebKit
        if (valueIsFunction || l > 1 && typeof value === 'string' && !support.checkClone && rchecked.test(value)) {
          return collection.each(function (index) {
            var self = collection.eq(index);
            if (valueIsFunction) {
              args[0] = value.call(this, index, self.html());
            }
            domManip(self, args, callback, ignored);
          });
        }
        if (l) {
          fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
          first = fragment.firstChild;
          if (fragment.childNodes.length === 1) {
            fragment = first;
          }
          // Require either new content or an interest in ignored elements to invoke the callback
          if (first || ignored) {
            scripts = POE.map(getAll(fragment, 'script'), disableScript);
            hasScripts = scripts.length;
            // Use the original fragment for the last item
            // instead of the first because it can end up
            // being emptied incorrectly in certain situations (#8070).
            for (; i < l; i++) {
              node = fragment;
              if (i !== iNoClone) {
                node = POE.clone(node, true, true);
                // Keep references to cloned scripts for later restoration
                if (hasScripts) {
                  // Support: Android <=4.0 only, PhantomJS 1 only
                  // push.apply(_, arraylike) throws on ancient WebKit
                  POE.merge(scripts, getAll(node, 'script'));
                }
              }
              callback.call(collection[i], node, i);
            }
            if (hasScripts) {
              doc = scripts[scripts.length - 1].ownerDocument;
              // Reenable scripts
              POE.map(scripts, restoreScript);
              // Evaluate executable scripts on first document insertion
              for (i = 0; i < hasScripts; i++) {
                node = scripts[i];
                if (rscriptType.test(node.type || '') && !dataPriv.access(node, 'globalEval') && POE.contains(doc, node)) {
                  if (node.src && (node.type || '').toLowerCase() !== 'module') {
                    // Optional AJAX dependency, but won't run scripts if not present
                    if (POE._evalUrl) {
                      POE._evalUrl(node.src);
                    }
                  } else {
                    POE.eval(node.textContent.replace(rcleanScript, ''), doc, node);
                  }
                }
              }
            }
          }
        }
        return collection;
      }, remove = function (elem, selector, keepData) {
        var node, nodes = selector ? POE.filter(selector, elem) : elem, i = 0;
        for (; (node = nodes[i]) != null; i++) {
          if (!keepData && node.nodeType === 1) {
            POE.cleanData(getAll(node));
          }
          if (node.parentNode) {
            if (keepData && POE.contains(node.ownerDocument, node)) {
              setGlobalEval(getAll(node, 'script'));
            }
            node.parentNode.removeChild(node);
          }
        }
        return elem;
      }, manipulationTarget = function (elem, content) {
        if (nodeName(elem, 'table') && nodeName(content.nodeType !== 11 ? content : content.firstChild, 'tr')) {
          return POE(elem).children('tbody')[0] || elem;
        }
        return elem;
      };
    POE.extend({
      parseHTML: function (data, context, keepScripts) {
        if (typeof data !== 'string') {
          return [];
        }
        if (typeof context === 'boolean') {
          keepScripts = context;
          context = false;
        }
        var base, parsed, scripts;
        if (!context) {
          if (support.createHTMLDocument) {
            context = document.implementation.createHTMLDocument('');
            base = context.createElement('base');
            base.href = document.location.href;
            context.head.appendChild(base);
          } else {
            context = document;
          }
        }
        parsed = rsingleTag.exec(data);
        scripts = !keepScripts && [];
        // Single tag
        if (parsed) {
          return [context.createElement(parsed[1])];
        }
        parsed = buildFragment([data], context, scripts);
        if (scripts && scripts.length) {
          POE(scripts).remove();
        }
        return POE.merge([], parsed.childNodes);
      },
      filter: filter,
      htmlPrefilter: htmlPrefilter,
      clone: function (elem, dataAndEvents, deepDataAndEvents) {
        var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = POE.contains(elem.ownerDocument, elem);
        // Fix IE cloning issues
        if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !POE.isXMLDoc(elem)) {
          // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
          destElements = getAll(clone);
          srcElements = getAll(elem);
          for (i = 0, l = srcElements.length; i < l; i++) {
            fixInput(srcElements[i], destElements[i]);
          }
        }
        // Copy the events from the original to the clone
        if (dataAndEvents) {
          if (deepDataAndEvents) {
            srcElements = srcElements || getAll(elem);
            destElements = destElements || getAll(clone);
            for (i = 0, l = srcElements.length; i < l; i++) {
              cloneCopyEvent(srcElements[i], destElements[i]);
            }
          } else {
            cloneCopyEvent(elem, clone);
          }
        }
        // Preserve script evaluation history
        destElements = getAll(clone, 'script');
        if (destElements.length > 0) {
          setGlobalEval(destElements, !inPage && getAll(elem, 'script'));
        }
        // Return the cloned set
        return clone;
      },
      cleanData: function (elems) {
        var data, elem, type, special = POE.event.special, i = 0;
        for (; (elem = elems[i]) !== undefined; i++) {
          if (acceptData(elem)) {
            if (data = elem[dataPriv.expando]) {
              if (data.events) {
                for (type in data.events) {
                  if (special[type]) {
                    POE.event.remove(elem, type)  // This is a shortcut to avoid POE.event.remove's overhead
;
                  } else {
                    POE.removeEvent(elem, type, data.handle);
                  }
                }
              }
              // Support: Chrome <=35 - 45+
              // Assign undefined instead of using delete, see Data#remove
              elem[dataPriv.expando] = undefined;
            }
            if (elem[dataUser.expando]) {
              // Support: Chrome <=35 - 45+
              // Assign undefined instead of using delete, see Data#remove
              elem[dataUser.expando] = undefined;
            }
          }
        }
      }
    });
    POE.fn.extend({
      get: function (num) {
        // Return all the elements in a clean array
        if (num == null) {
          return this.slice();
        }
        return num < 0 ? this[num + this.length] : this[num];
      },
      eq: function (i) {
        var len = this.length, j = +i + (i < 0 ? len : 0);
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      find: function (selector) {
        var i, ret, len = this.length, self = this;
        if (typeof selector !== 'string') {
          return this.pushStack(POE(selector).filter(function () {
            for (i = 0; i < len; i++) {
              if (POE.contains(self[i], this)) {
                return true;
              }
            }
          }));
        }
        ret = this.pushStack([]);
        for (i = 0; i < len; i++) {
          POE.find(selector, self[i], ret);
        }
        return len > 1 ? POE.uniqueSort(ret) : ret;
      },
      filter: function (selector) {
        return this.pushStack(winnow(this, selector || [], false));
      },
      not: function (selector) {
        return this.pushStack(winnow(this, selector || [], true));
      },
      is: function (selector) {
        return !!winnow(this, typeof selector === 'string' && POE.expr.match.needsContext.test(selector) ? POE(selector) : selector || [], false).length;
      },
      has: function (target) {
        var targets = POE(target, this), l = targets.length;
        return this.filter(function () {
          var i = 0;
          for (; i < l; i++) {
            if (POE.contains(this, targets[i])) {
              return true;
            }
          }
        });
      },
      closest: function (selectors, context) {
        var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== 'string' && POE(selectors);
        // Positional selectors never match, since there's no _selection_ context
        if (!rneedsContext.test(selectors)) {
          for (; i < l; i++) {
            for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
              // Always skip document fragments
              if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : // Don't pass non-elements to Sizzle
                cur.nodeType === 1 && POE.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
              }
            }
          }
        }
        return this.pushStack(matched.length > 1 ? POE.uniqueSort(matched) : matched);
      },
      // Determine the position of an element within the set
      index: function (elem) {
        // No argument, return index in parent
        if (!elem) {
          return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        }
        // Index in selector
        if (typeof elem === 'string') {
          return indexOf.call(POE(elem), this[0]);
        }
        // Locate the position of the desired element
        return indexOf.call(this, // If it receives a POE object, the first element is used
        elem.jquery ? elem[0] : elem);
      },
      add: function (selector, context) {
        return this.pushStack(POE.uniqueSort(POE.merge(this.get(), POE(selector, context))));
      },
      addBack: function (selector) {
        return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
      },
      detach: function (selector) {
        return remove(this, selector, true);
      },
      remove: function (selector) {
        return remove(this, selector);
      },
      text: function (value) {
        return access(this, function (value) {
          return value === undefined ? POE.text(this) : this.empty().each(function () {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              this.textContent = value;
            }
          });
        }, null, value, arguments.length);
      },
      append: function () {
        return domManip(this, arguments, function (elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.appendChild(elem);
          }
        });
      },
      prepend: function () {
        return domManip(this, arguments, function (elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.insertBefore(elem, target.firstChild);
          }
        });
      },
      before: function () {
        return domManip(this, arguments, function (elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this);
          }
        });
      },
      after: function () {
        return domManip(this, arguments, function (elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this.nextSibling);
          }
        });
      },
      empty: function () {
        var elem, i = 0;
        for (; (elem = this[i]) != null; i++) {
          if (elem.nodeType === 1) {
            // Prevent memory leaks
            POE.cleanData(getAll(elem, false));
            // Remove any remaining nodes
            elem.textContent = '';
          }
        }
        return this;
      },
      clone: function (dataAndEvents, deepDataAndEvents) {
        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
        return this.map(function () {
          return POE.clone(this, dataAndEvents, deepDataAndEvents);
        });
      },
      html: function (value) {
        return access(this, function (value) {
          var elem = this[0] || {}, i = 0, l = this.length;
          if (value === undefined && elem.nodeType === 1) {
            return elem.innerHTML;
          }
          // See if we can take a shortcut and just use innerHTML
          if (typeof value === 'string' && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [
              '',
              ''
            ])[1].toLowerCase()]) {
            value = POE.htmlPrefilter(value);
            try {
              for (; i < l; i++) {
                elem = this[i] || {};
                // Remove element nodes and prevent memory leaks
                if (elem.nodeType === 1) {
                  POE.cleanData(getAll(elem, false));
                  elem.innerHTML = value;
                }
              }
              elem = 0  // If using innerHTML throws an exception, use the fallback method
;
            } catch (e) {
            }
          }
          if (elem) {
            this.empty().append(value);
          }
        }, null, value, arguments.length);
      },
      replaceWith: function () {
        var ignored = [];
        // Make the changes, replacing each non-ignored context element with the new content
        return domManip(this, arguments, function (elem) {
          var parent = this.parentNode;
          if (POE.inArray(this, ignored) < 0) {
            POE.cleanData(getAll(this));
            if (parent) {
              parent.replaceChild(elem, this);
            }
          }  // Force callback invocation
        }, ignored);
      }
    });
    each({
      parent: function (elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
      },
      parents: function (elem) {
        return dir(elem, 'parentNode');
      },
      parentsUntil: function (elem, i, until) {
        return dir(elem, 'parentNode', until);
      },
      next: function (elem) {
        return sibling(elem, 'nextSibling');
      },
      prev: function (elem) {
        return sibling(elem, 'previousSibling');
      },
      nextAll: function (elem) {
        return dir(elem, 'nextSibling');
      },
      prevAll: function (elem) {
        return dir(elem, 'previousSibling');
      },
      nextUntil: function (elem, i, until) {
        return dir(elem, 'nextSibling', until);
      },
      prevUntil: function (elem, i, until) {
        return dir(elem, 'previousSibling', until);
      },
      siblings: function (elem) {
        return siblings((elem.parentNode || {}).firstChild, elem);
      },
      children: function (elem) {
        return siblings(elem.firstChild);
      },
      contents: function (elem) {
        if (nodeName(elem, 'iframe')) {
          return elem.contentDocument;
        }
        if (nodeName(elem, 'template')) {
          elem = elem.content || elem;
        }
        return POE.merge([], elem.childNodes);
      }
    }, function (fn, name) {
      POE.fn[name] = function (until, selector) {
        var matched = POE.map(this, fn, until);
        if (name.slice(-5) !== 'Until') {
          selector = until;
        }
        if (selector && typeof selector === 'string') {
          matched = filter(selector, matched);
        }
        if (this.length > 1) {
          // Remove duplicates
          if (!guaranteedUnique[name]) {
            POE.uniqueSort(matched);
          }
          // Reverse order for parents* and prev-derivatives
          if (rparentsprev.test(name)) {
            matched.reverse();
          }
        }
        return this.pushStack(matched);
      };
    });
    each({
      appendTo: 'append',
      prependTo: 'prepend',
      insertBefore: 'before',
      insertAfter: 'after',
      replaceAll: 'replaceWith'
    }, function (original, name) {
      POE.fn[name] = function (selector) {
        var elems, ret = [], insert = POE(selector), last = insert.length - 1, i = 0;
        for (; i <= last; i++) {
          elems = i === last ? this : this.clone(true);
          POE(insert[i])[original](elems);
          // Support: Android <=4.0 only, PhantomJS 1 only
          // .get() because push.apply(_, arraylike) throws on ancient WebKit
          push.apply(ret, elems.get());
        }
        return this.pushStack(ret);
      };
    });
    return POE;
  }(core, core_nodeName, core_push, core_concat, core_getAll, core_htmlPrefilter, core_buildFragment, core_each, var_document, var_rsingleTag, var_rparentsprev, dom_winnow, dom_filter, dom_sibling, data_dataPriv, data_dataUser, core_access, core_setGlobalEval, core_isFunction, core_acceptData, core_wrapMap, var_rtagName, support);
  event_returnTrue = function () {
    return true;
  };
  event_returnFalse = function () {
    return false;
  };
  event_core = function (extend, returnTrue, returnFalse) {
    var Event = function (src, props) {
      // Allow instantiation without the 'new' keyword
      if (!(this instanceof Event)) {
        return new Event(src, props);
      }
      // Event object
      if (src && src.type) {
        this.originalEvent = src;
        this.type = src.type;
        // Events bubbling up the document may have been marked as prevented
        // by a handler lower down the tree; reflect the correct value.
        this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && // Support: Android <=2.3 only
        src.returnValue === false ? returnTrue : returnFalse;
        // Create target properties
        // Support: Safari <=6 - 7 only
        // Target should not be a text node (#504, #13143)
        this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
        this.currentTarget = src.currentTarget;
        this.relatedTarget = src.relatedTarget;
      } else {
        this.type = src;
      }
      // Put explicitly provided properties onto the event object
      if (props) {
        extend(this, props);
      }
      // Create a timestamp if incoming event doesn't have one
      this.timeStamp = src && src.timeStamp || Date.now();
      // Mark it as fixed
      this[POE.expando] = true;
    };
    // POE.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    Event.prototype = {
      constructor: Event,
      isDefaultPrevented: returnFalse,
      isPropagationStopped: returnFalse,
      isImmediatePropagationStopped: returnFalse,
      isSimulated: false,
      preventDefault: function () {
        var e = this.originalEvent;
        this.isDefaultPrevented = returnTrue;
        if (e && !this.isSimulated) {
          e.preventDefault();
        }
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        this.isPropagationStopped = returnTrue;
        if (e && !this.isSimulated) {
          e.stopPropagation();
        }
      },
      stopImmediatePropagation: function () {
        var e = this.originalEvent;
        this.isImmediatePropagationStopped = returnTrue;
        if (e && !this.isSimulated) {
          e.stopImmediatePropagation();
        }
        this.stopPropagation();
      }
    };
    return Event;
  }(core_extend, event_returnTrue, event_returnFalse);
  event_removeEvent = function (elem, type, handle) {
    // This "if" is needed for plain objects
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  event = function (POE, Event, isFunction, removeEvent, returnTrue, returnFalse) {
    var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/,
      // Support: IE <=9 only
      // Accessing document.activeElement can throw unexpectedly
      // https://bugs.jquery.com/ticket/13393
      safeActiveElement = function () {
        try {
          return document.activeElement;
        } catch (err) {
        }
      },
      // Support: IE <=9 - 11+
      // focus() and blur() are asynchronous, except when they are no-op.
      // So expect focus to be synchronous when the element is already active,
      // and blur to be synchronous when the element is not already active.
      // (focus and blur are always synchronous in other supported browsers,
      // this just defines when we can count on it).
      expectSync = function (elem, type) {
        return elem === safeActiveElement() === (type === 'focus');
      }, on = function (elem, types, selector, data, fn, one) {
        var origFn, type;
        // Types can be a map of types/handlers
        if (typeof types === 'object') {
          // ( types-Object, selector, data )
          if (typeof selector !== 'string') {
            // ( types-Object, data )
            data = data || selector;
            selector = undefined;
          }
          for (type in types) {
            on(elem, type, selector, data, types[type], one);
          }
          return elem;
        }
        if (data == null && fn == null) {
          // ( types, fn )
          fn = selector;
          data = selector = undefined;
        } else if (fn == null) {
          if (typeof selector === 'string') {
            // ( types, selector, fn )
            fn = data;
            data = undefined;
          } else {
            // ( types, data, fn )
            fn = data;
            data = selector;
            selector = undefined;
          }
        }
        if (fn === false) {
          fn = returnFalse;
        } else if (!fn) {
          return elem;
        }
        if (one === 1) {
          origFn = fn;
          fn = function (event) {
            // Can use an empty set, since event contains the info
            POE().off(event);
            return origFn.apply(this, arguments);
          };
          // Use same guid so caller can remove using origFn
          fn.guid = origFn.guid || (origFn.guid = POE.guid++);
        }
        return elem.each(function () {
          POE.event.add(this, types, fn, data, selector);
        });
      },
      // Ensure the presence of an event listener that handles manually-triggered
      // synthetic events by interrupting progress until reinvoked in response to
      // *native* events that it fires directly, ensuring that state changes have
      // already occurred before other listeners are invoked.
      leverageNative = function (el, type, expectSync) {
        // Missing expectSync indicates a trigger call, which must force setup through POE.event.add
        if (!expectSync) {
          POE.event.add(el, type, returnTrue);
          return;
        }
        // Register the controller as a special universal handler for all event namespaces
        dataPriv.set(el, type, false);
        POE.event.add(el, type, {
          namespace: false,
          handler: function (event) {
            var notAsync, result, saved = dataPriv.get(this, type);
            if (event.isTrigger & 1 && this[type]) {
              // Interrupt processing of the outer synthetic .trigger()ed event
              if (!saved) {
                // Store arguments for use when handling the inner native event
                saved = slice.call(arguments);
                dataPriv.set(this, type, saved);
                // Trigger the native event and capture its result
                // Support: IE <=9 - 11+
                // focus() and blur() are asynchronous
                notAsync = expectSync(this, type);
                this[type]();
                result = dataPriv.get(this, type);
                if (saved !== result || notAsync) {
                  dataPriv.set(this, type, false);
                } else {
                  result = undefined;
                }
                if (saved !== result) {
                  // Cancel the outer synthetic event
                  event.stopImmediatePropagation();
                  event.preventDefault();
                  return result;
                }  // If this is an inner synthetic event for an event with a bubbling surrogate
                   // (focus or blur), assume that the surrogate already propagated from triggering the
                   // native event and prevent that from happening again here.
                   // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
                   // bubbling surrogate propagates *after* the non-bubbling base), but that seems
                   // less bad than duplication.
              } else if ((POE.event.special[type] || {}).delegateType) {
                event.stopPropagation();
              }  // If this is a native event triggered above, everything is now in order
                 // Fire an inner synthetic event with the original arguments
            } else if (saved) {
              // ...and capture the result
              dataPriv.set(this, type, POE.event.trigger(// Support: IE <=9 - 11+
              // Extend with the prototype to reset the above stopImmediatePropagation()
              POE.extend(saved.shift(), POE.Event.prototype), saved, this));
              // Abort handling of the native event
              event.stopImmediatePropagation();
            }
          }
        });
      };
    /*
    * Helper functions for managing events -- not part of the public interface.
    * Props to Dean Edwards' addEvent library for many of the ideas.
    */
    POE.event = {
      global: {},
      add: function (elem, types, handler, data, selector) {
        var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
        // Don't attach events to noData or text/comment nodes (but allow plain objects)
        if (!elemData) {
          return;
        }
        // Caller can pass in an object of custom data in lieu of the handler
        if (handler.handler) {
          handleObjIn = handler;
          handler = handleObjIn.handler;
          selector = handleObjIn.selector;
        }
        // Ensure that invalid selectors throw exceptions at attach time
        // Evaluate against documentElement in case elem is a non-element node (e.g., document)
        if (selector) {
          POE.find.matchesSelector(documentElement, selector);
        }
        // Make sure that the handler has a unique ID, used to find/remove it later
        if (!handler.guid) {
          handler.guid = POE.guid++;
        }
        // Init the element's event structure and main handler, if this is the first
        if (!(events = elemData.events)) {
          events = elemData.events = {};
        }
        if (!(eventHandle = elemData.handle)) {
          eventHandle = elemData.handle = function (e) {
            // Discard the second event of a POE.event.trigger() and
            // when an event is called after a page has unloaded
            return typeof POE !== 'undefined' && POE.event.triggered !== e.type ? POE.event.dispatch.apply(elem, arguments) : undefined;
          };
        }
        // Handle multiple events separated by a space
        types = (types || '').match(rnothtmlwhite) || [''];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type = origType = tmp[1];
          namespaces = (tmp[2] || '').split('.').sort();
          // There *must* be a type, no attaching namespace-only handlers
          if (!type) {
            continue;
          }
          // If event changes its type, use the special event handlers for the changed type
          special = POE.event.special[type] || {};
          // If selector defined, determine special event api type, otherwise given type
          type = (selector ? special.delegateType : special.bindType) || type;
          // Update special based on newly reset type
          special = POE.event.special[type] || {};
          // handleObj is passed to all event handlers
          handleObj = POE.extend({
            type: type,
            origType: origType,
            data: data,
            handler: handler,
            guid: handler.guid,
            selector: selector,
            needsContext: selector && POE.expr.match.needsContext.test(selector),
            namespace: namespaces.join('.')
          }, handleObjIn);
          // Init the event handler queue if we're the first
          if (!(handlers = events[type])) {
            handlers = events[type] = [];
            handlers.delegateCount = 0;
            // Only use addEventListener if the special events handler returns false
            if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
              if (elem.addEventListener) {
                elem.addEventListener(type, eventHandle);
              }
            }
          }
          if (special.add) {
            special.add.call(elem, handleObj);
            if (!handleObj.handler.guid) {
              handleObj.handler.guid = handler.guid;
            }
          }
          // Add to the element's handler list, delegates in front
          if (selector) {
            handlers.splice(handlers.delegateCount++, 0, handleObj);
          } else {
            handlers.push(handleObj);
          }
          // Keep track of which events have ever been used, for event optimization
          POE.event.global[type] = true;
        }
      },
      // Detach an event or set of events from an element
      remove: function (elem, types, handler, selector, mappedTypes) {
        var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
        if (!elemData || !(events = elemData.events)) {
          return;
        }
        // Once for each type.namespace in types type may be omitted
        types = (types || '').match(rnothtmlwhite) || [''];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type = origType = tmp[1];
          namespaces = (tmp[2] || '').split('.').sort();
          // Unbind all events (on this namespace, if provided) for the element
          if (!type) {
            for (type in events) {
              POE.event.remove(elem, type + types[t], handler, selector, true);
            }
            continue;
          }
          special = POE.event.special[type] || {};
          type = (selector ? special.delegateType : special.bindType) || type;
          handlers = events[type] || [];
          tmp = tmp[2] && new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)');
          // Remove matching events
          origCount = j = handlers.length;
          while (j--) {
            handleObj = handlers[j];
            if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === '**' && handleObj.selector)) {
              handlers.splice(j, 1);
              if (handleObj.selector) {
                handlers.delegateCount--;
              }
              if (special.remove) {
                special.remove.call(elem, handleObj);
              }
            }
          }
          // Remove generic event handler if we removed something and no more handlers exist
          // (avoids potential for endless recursion during removal of special event handlers)
          if (origCount && !handlers.length) {
            if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
              removeEvent(elem, type, elemData.handle);
            }
            delete events[type];
          }
        }
        // Remove data and the expando if it's no longer used
        if (POE.isEmptyObject(events)) {
          dataPriv.remove(elem, 'handle events');
        }
      },
      dispatch: function (nativeEvent) {
        // Make a writable POE.Event from the native event object
        var event = POE.event.fix(nativeEvent);
        var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), handlers = (dataPriv.get(this, 'events') || {})[event.type] || [], special = POE.event.special[event.type] || {};
        // Use the fix-ed POE.Event rather than the (read-only) native event
        args[0] = event;
        for (i = 1; i < arguments.length; i++) {
          args[i] = arguments[i];
        }
        event.delegateTarget = this;
        // Call the preDispatch hook for the mapped type, and let it bail if desired
        if (special.preDispatch && special.preDispatch.call(this, event) === false) {
          return;
        }
        // Determine handlers
        handlerQueue = POE.event.handlers.call(this, event, handlers);
        // Run delegates first they may want to stop propagation beneath us
        i = 0;
        while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
          event.currentTarget = matched.elem;
          j = 0;
          while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
            // If the event is namespaced, then each handler is only invoked if it is
            // specially universal or its namespaces are a superset of the event's.
            if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
              event.handleObj = handleObj;
              event.data = handleObj.data;
              ret = ((POE.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
              if (ret !== undefined) {
                if ((event.result = ret) === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }
            }
          }
        }
        // Call the postDispatch hook for the mapped type
        if (special.postDispatch) {
          special.postDispatch.call(this, event);
        }
        return event.result;
      },
      handlers: function (event, handlers) {
        var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
        // Find delegate handlers
        if (delegateCount && // Support: IE <=9
          // Black-hole SVG <use> instance trees (trac-13180)
          cur.nodeType && // Support: Firefox <=42
          // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
          // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
          // Support: IE 11 only
          // ...but not arrow key 'clicks' of radio inputs, which can have `button` -1 (gh-2343)
          !(event.type === 'click' && event.button >= 1)) {
          for (; cur !== this; cur = cur.parentNode || this) {
            // Don't check non-elements (#13208)
            // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
            if (cur.nodeType === 1 && !(event.type === 'click' && cur.disabled === true)) {
              matchedHandlers = [];
              matchedSelectors = {};
              for (i = 0; i < delegateCount; i++) {
                handleObj = handlers[i];
                // Don't conflict with Object.prototype properties (#13203)
                sel = handleObj.selector + ' ';
                if (matchedSelectors[sel] === undefined) {
                  matchedSelectors[sel] = handleObj.needsContext ? POE(sel, this).index(cur) > -1 : POE.find(sel, this, null, [cur]).length;
                }
                if (matchedSelectors[sel]) {
                  matchedHandlers.push(handleObj);
                }
              }
              if (matchedHandlers.length) {
                handlerQueue.push({
                  elem: cur,
                  handlers: matchedHandlers
                });
              }
            }
          }
        }
        // Add the remaining (directly-bound) handlers
        cur = this;
        if (delegateCount < handlers.length) {
          handlerQueue.push({
            elem: cur,
            handlers: handlers.slice(delegateCount)
          });
        }
        return handlerQueue;
      },
      addProp: function (name, hook) {
        Object.defineProperty(Event.prototype, name, {
          enumerable: true,
          configurable: true,
          get: isFunction(hook) ? function () {
            if (this.originalEvent) {
              return hook(this.originalEvent);
            }
          } : function () {
            if (this.originalEvent) {
              return this.originalEvent[name];
            }
          },
          set: function (value) {
            Object.defineProperty(this, name, {
              enumerable: true,
              configurable: true,
              writable: true,
              value: value
            });
          }
        });
      },
      fix: function (originalEvent) {
        return originalEvent[POE.expando] ? originalEvent : new POE.Event(originalEvent);
      },
      special: {
        load: {
          // Prevent triggered image.load events from bubbling to window.load
          noBubble: true
        },
        click: {
          // Utilize native event to ensure correct state for checkable inputs
          setup: function (data) {
            // For mutual compressibility with _default, replace `this` access with a local var.
            // `|| data` is dead code meant only to preserve the variable through minification.
            var el = this || data;
            // Claim the first handler
            if (rcheckableType.test(el.type) && el.click && nodeName(el, 'input') && dataPriv.get(el, 'click') === undefined) {
              // dataPriv.set( el, 'click', ... )
              leverageNative(el, 'click', returnTrue);
            }
            // Return false to allow normal processing in the caller
            return false;
          },
          trigger: function (data) {
            // For mutual compressibility with _default, replace `this` access with a local var.
            // `|| data` is dead code meant only to preserve the variable through minification.
            var el = this || data;
            // Force setup before triggering a click
            if (rcheckableType.test(el.type) && el.click && nodeName(el, 'input') && dataPriv.get(el, 'click') === undefined) {
              leverageNative(el, 'click');
            }
            // Return non-false to allow normal event-path propagation
            return true;
          },
          // For cross-browser consistency, suppress native .click() on links
          // Also prevent it if we're currently inside a leveraged native-event stack
          _default: function (event) {
            var target = event.target;
            return rcheckableType.test(target.type) && target.click && nodeName(target, 'input') && dataPriv.get(target, 'click') || nodeName(target, 'a');
          }
        },
        beforeunload: {
          postDispatch: function (event) {
            // Support: Firefox 20+
            // Firefox doesn't alert if the returnValue field is not set.
            if (event.result !== undefined && event.originalEvent) {
              event.originalEvent.returnValue = event.result;
            }
          }
        }
      }
    };
    // Includes all common event props including KeyEvent and MouseEvent specific props
    POE.each({
      altKey: true,
      bubbles: true,
      cancelable: true,
      changedTouches: true,
      ctrlKey: true,
      detail: true,
      eventPhase: true,
      metaKey: true,
      pageX: true,
      pageY: true,
      shiftKey: true,
      view: true,
      'char': true,
      code: true,
      charCode: true,
      key: true,
      keyCode: true,
      button: true,
      buttons: true,
      clientX: true,
      clientY: true,
      offsetX: true,
      offsetY: true,
      pointerId: true,
      pointerType: true,
      screenX: true,
      screenY: true,
      targetTouches: true,
      toElement: true,
      touches: true,
      which: function (event) {
        var button = event.button;
        // Add which for key events
        if (event.which == null && rkeyEvent.test(event.type)) {
          return event.charCode != null ? event.charCode : event.keyCode;
        }
        // Add which for click: 1 === left 2 === middle 3 === right
        if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
          if (button & 1) {
            return 1;
          }
          if (button & 2) {
            return 3;
          }
          if (button & 4) {
            return 2;
          }
          return 0;
        }
        return event.which;
      }
    }, POE.event.addProp);
    POE.each({
      focus: 'focusin',
      blur: 'focusout'
    }, function (type, delegateType) {
      POE.event.special[type] = {
        // Utilize native event if possible so blur/focus sequence is correct
        setup: function () {
          // Claim the first handler
          // dataPriv.set( this, 'focus', ... )
          // dataPriv.set( this, 'blur', ... )
          leverageNative(this, type, expectSync);
          // Return false to allow normal processing in the caller
          return false;
        },
        trigger: function () {
          // Force setup before trigger
          leverageNative(this, type);
          // Return non-false to allow normal event-path propagation
          return true;
        },
        delegateType: delegateType
      };
    });
    // Create mouseenter/leave events using mouseover/out and event-time checks
    // so that event delegation works in POE.
    // Do the same for pointerenter/pointerleave and pointerover/pointerout
    //
    // Support: Safari 7 only
    // Safari sends mouseenter too often see:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
    // for the description of the bug (it existed in older Chrome versions as well).
    POE.each({
      mouseenter: 'mouseover',
      mouseleave: 'mouseout',
      pointerenter: 'pointerover',
      pointerleave: 'pointerout'
    }, function (orig, fix) {
      POE.event.special[orig] = {
        delegateType: fix,
        bindType: fix,
        handle: function (event) {
          var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
          // For mouseenter/leave call the handler if related is outside the target.
          // NB: No relatedTarget if the mouse left/entered the browser window
          if (!related || related !== target && !POE.contains(target, related)) {
            event.type = handleObj.origType;
            ret = handleObj.handler.apply(this, arguments);
            event.type = fix;
          }
          return ret;
        }
      };
    });
    POE.fn.extend({
      on: function (types, selector, data, fn) {
        return on(this, types, selector, data, fn);
      },
      one: function (types, selector, data, fn) {
        return on(this, types, selector, data, fn, 1);
      },
      off: function (types, selector, fn) {
        var handleObj, type;
        if (types && types.preventDefault && types.handleObj) {
          // ( event )  dispatched POE.Event
          handleObj = types.handleObj;
          POE(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + '.' + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
          return this;
        }
        if (typeof types === 'object') {
          // ( types-object [, selector] )
          for (type in types) {
            this.off(type, selector, types[type]);
          }
          return this;
        }
        if (selector === false || typeof selector === 'function') {
          // ( types [, fn] )
          fn = selector;
          selector = undefined;
        }
        if (fn === false) {
          fn = returnFalse;
        }
        return this.each(function () {
          POE.event.remove(this, types, fn, selector);
        });
      }
    });
    POE.Event = Event;
    return POE;
  }(core, event_core, core_isFunction, event_removeEvent, event_returnTrue, event_returnFalse);
  deferred = function (POE) {
    function Identity(v) {
      return v;
    }
    function Thrower(ex) {
      throw ex;
    }
    function adoptValue(value, resolve, reject, noValue) {
      var method;
      try {
        // Check for promise aspect first to privilege synchronous behavior
        if (value && POE.isFunction(method = value.promise)) {
          method.call(value).done(resolve).fail(reject)  // Other thenables
;
        } else if (value && POE.isFunction(method = value.then)) {
          method.call(value, resolve, reject);
        } else {
          resolve.apply(undefined, [value].slice(noValue));
        }
      } catch (value) {
        reject.apply(undefined, [value]);
      }
    }
    POE.extend({
      Deferred: function (func) {
        var tuples = [
            [
              'notify',
              'progress',
              POE.Callbacks('memory'),
              POE.Callbacks('memory'),
              2
            ],
            [
              'resolve',
              'done',
              POE.Callbacks('once memory'),
              POE.Callbacks('once memory'),
              0,
              'resolved'
            ],
            [
              'reject',
              'fail',
              POE.Callbacks('once memory'),
              POE.Callbacks('once memory'),
              1,
              'rejected'
            ]
          ], state = 'pending', promise = {
            state: function () {
              return state;
            },
            always: function () {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            'catch': function (fn) {
              return promise.then(null, fn);
            },
            // Keep pipe for back-compat
            pipe: function () {
              var fns = arguments;
              return POE.Deferred(function (newDefer) {
                POE.each(tuples, function (tuple) {
                  var fn = POE.isFunction(fns[tuple[4]]) && fns[tuple[4]];
                  deferred[tuple[1]](function () {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && POE.isFunction(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + 'With'](this, fn ? [returned] : arguments);
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            then: function (onFulfilled, onRejected, onProgress) {
              var maxDepth = 0;
              function resolve(depth, deferred, handler, special) {
                return function () {
                  var that = this, args = arguments, mightThrow = function () {
                      var returned, then;
                      if (depth < maxDepth) {
                        return;
                      }
                      returned = handler.apply(that, args);
                      if (returned === deferred.promise()) {
                        throw new TypeError('Thenable self-resolution');
                      }
                      then = returned && (typeof returned === 'object' || typeof returned === 'function') && returned.then;
                      if (POE.isFunction(then)) {
                        if (special) {
                          then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));
                        } else {
                          maxDepth++;
                          then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                        }
                      } else {
                        if (handler !== Identity) {
                          that = undefined;
                          args = [returned];
                        }
                        (special || deferred.resolveWith)(that, args);
                      }
                    }, process = special ? mightThrow : function () {
                      try {
                        mightThrow();
                      } catch (e) {
                        if (POE.Deferred.exceptionHook) {
                          POE.Deferred.exceptionHook(e, process.stackTrace);
                        }
                        if (depth + 1 >= maxDepth) {
                          if (handler !== Thrower) {
                            that = undefined;
                            args = [e];
                          }
                          deferred.rejectWith(that, args);
                        }
                      }
                    };
                  if (depth) {
                    process();
                  } else {
                    if (POE.Deferred.getStackHook) {
                      process.stackTrace = POE.Deferred.getStackHook();
                    }
                    window.setTimeout(process);
                  }
                };
              }
              return POE.Deferred(function (newDefer) {
                tuples[0][3].add(resolve(0, newDefer, POE.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));
                tuples[1][3].add(resolve(0, newDefer, POE.isFunction(onFulfilled) ? onFulfilled : Identity));
                tuples[2][3].add(resolve(0, newDefer, POE.isFunction(onRejected) ? onRejected : Thrower));
              }).promise();
            },
            promise: function (obj) {
              return obj != null ? POE.extend(obj, promise) : promise;
            }
          }, deferred = {};
        // Add list-specific methods
        POE.each(tuples, function (tuple, i) {
          var list = tuple[2], stateString = tuple[5];
          promise[tuple[1]] = list.add;
          // Handle state
          if (stateString) {
            list.add(function () {
              state = stateString;
            }, tuples[3 - i][2].disable, tuples[3 - i][3].disable, tuples[0][2].lock, tuples[0][3].lock);
          }
          list.add(tuple[3].fire);
          deferred[tuple[0]] = function () {
            deferred[tuple[0] + 'With'](this === deferred ? undefined : this, arguments);
            return this;
          };
          deferred[tuple[0] + 'With'] = list.fireWith;
        });
        // Make the deferred a promise
        promise.promise(deferred);
        // Call given func if any
        if (func) {
          func.call(deferred, deferred);
        }
        // All done!
        return deferred;
      },
      // Deferred helper
      when: function (singleValue) {
        var
          // count of uncompleted subordinates
          remaining = arguments.length,
          // count of unprocessed arguments
          i = remaining,
          // subordinate fulfillment data
          resolveContexts = Array(i), resolveValues = arguments.slice(),
          // the master Deferred
          master = POE.Deferred(),
          // subordinate callback factory
          updateFunc = function (i) {
            return function (value) {
              resolveContexts[i] = this;
              resolveValues[i] = arguments.length > 1 ? arguments.slice() : value;
              if (!--remaining) {
                master.resolveWith(resolveContexts, resolveValues);
              }
            };
          };
        // Single- and empty arguments are adopted like Promise.resolve
        if (remaining <= 1) {
          adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);
          // Use .then() to unwrap secondary thenables (cf. gh-3000)
          if (master.state() === 'pending' || POE.isFunction(resolveValues[i] && resolveValues[i].then)) {
            return master.then();
          }
        }
        // Multiple arguments are aggregated like Promise.all array elements
        while (i--) {
          adoptValue(resolveValues[i], updateFunc(i), master.reject);
        }
        return master.promise();
      }
    });
    return POE;
  }(core);
  prop = function (POE, access) {
    var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
    POE.extend({
      prop: function (elem, name, value) {
        var ret, hooks, nType = elem.nodeType;
        // Don't get/set properties on text, comment and attribute nodes
        if (nType === 3 || nType === 8 || nType === 2) {
          return;
        }
        if (nType !== 1 || !POE.isXMLDoc(elem)) {
          // Fix name and attach hooks
          name = POE.propFix[name] || name;
          hooks = POE.propHooks[name];
        }
        if (value !== undefined) {
          if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
            return ret;
          }
          return elem[name] = value;
        }
        if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        }
        return elem[name];
      },
      propHooks: {
        tabIndex: {
          get: function (elem) {
            // Support: IE <=9 - 11 only
            // elem.tabIndex doesn't always return the
            // correct value when it hasn't been explicitly set
            // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
            // Use proper attribute retrieval(#12072)
            var tabindex = POE.find.attr(elem, 'tabindex');
            if (tabindex) {
              return parseInt(tabindex, 10);
            }
            if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
              return 0;
            }
            return -1;
          }
        }
      },
      propFix: {
        'for': 'htmlFor',
        'class': 'className'
      }
    });
    POE.fn.extend({
      prop: function (name, value) {
        if (value === null) {
          return this.removeProp(name);
        } else {
          return access(this, POE.prop, name, value, arguments.length > 1);
        }
      },
      removeProp: function (name) {
        return this.each(function () {
          delete this[POE.propFix[name] || name];
        });
      }
    });
    // Support: IE <=11 only
    // Accessing the selectedIndex property
    // forces the browser to respect setting selected
    // on the option
    // The getter ensures a default option is selected
    // when in an optgroup
    // eslint rule 'no-unused-expressions' is disabled for this code
    // since it considers such accessions noop
    if (!support.optSelected) {
      POE.propHooks.selected = {
        get: function (elem) {
          /* eslint no-unused-expressions: 'off' */
          var parent = elem.parentNode;
          if (parent && parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
          return null;
        },
        set: function (elem) {
          /* eslint no-unused-expressions: 'off' */
          var parent = elem.parentNode;
          if (parent) {
            parent.selectedIndex;
            if (parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
          }
        }
      };
    }
    POE.each([
      'tabIndex',
      'readOnly',
      'maxLength',
      'cellSpacing',
      'cellPadding',
      'rowSpan',
      'colSpan',
      'useMap',
      'frameBorder',
      'contentEditable'
    ], function () {
      POE.propFix[this.toLowerCase()] = this;
    });
    return POE;
  }(core, core_access);
  /*!
   * Sizzle CSS Selector Engine v2.3.4-pre
   * https://sizzlejs.com/
   *
   * Copyright JS Foundation and other contributors
   * Released under the MIT license
   * https://js.foundation/
   *
   * Date: 2019-01-14
   */
  (function (window) {
    var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate,
      // Local document vars
      setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains,
      // Instance-specific data
      expando = 'sizzle' + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function (a, b) {
        if (a === b) {
          hasDuplicate = true;
        }
        return 0;
      },
      // Instance methods
      hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice,
      // Use a stripped-down indexOf as it's faster than native
      // https://jsperf.com/thor-indexof-vs-for/5
      indexOf = function (list, elem) {
        var i = 0, len = list.length;
        for (; i < len; i++) {
          if (list[i] === elem) {
            return i;
          }
        }
        return -1;
      }, booleans = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      // Regular expressions
      // http://www.w3.org/TR/css3-selectors/#whitespace
      whitespace = '[\\x20\\t\\r\\n\\f]',
      // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
      identifier = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+',
      // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
      attributes = '\\[' + whitespace + '*(' + identifier + ')(?:' + whitespace + // Operator (capture 2)
      '*([*^$|!~]?=)' + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
      '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + identifier + '))|)' + whitespace + '*\\]', pseudos = ':(' + identifier + ')(?:\\((' + // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
      // 1. quoted (capture 3; capture 4 or capture 5)
      '(\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|' + // 2. simple (capture 6)
      '((?:\\\\.|[^\\\\()[\\]]|' + attributes + ')*)|' + // 3. anything else (capture 2)
      '.*' + ')\\)|)',
      // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
      rwhitespace = new RegExp(whitespace + '+', 'g'), rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'), rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'), rcombinators = new RegExp('^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*'), rdescend = new RegExp(whitespace + '|>'), rpseudo = new RegExp(pseudos), ridentifier = new RegExp('^' + identifier + '$'), matchExpr = {
        'ID': new RegExp('^#(' + identifier + ')'),
        'CLASS': new RegExp('^\\.(' + identifier + ')'),
        'TAG': new RegExp('^(' + identifier + '|[*])'),
        'ATTR': new RegExp('^' + attributes),
        'PSEUDO': new RegExp('^' + pseudos),
        'CHILD': new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + whitespace + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
        'bool': new RegExp('^(?:' + booleans + ')$', 'i'),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        'needsContext': new RegExp('^' + whitespace + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', 'i')
      }, rhtml = /HTML$/i, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/,
      // Easily-parseable/retrievable ID or TAG or CLASS selectors
      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/,
      // CSS escapes
      // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
      runescape = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig'), funescape = function (_, escaped, escapedWhitespace) {
        var high = '0x' + escaped - 65536;
        // NaN means non-codepoint
        // Support: Firefox<24
        // Workaround erroneous numeric interpretation of +"0x"
        return high !== high || escapedWhitespace ? escaped : high < 0 ? // BMP codepoint
        String.fromCharCode(high + 65536) : // Supplemental Plane codepoint (surrogate pair)
        String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
      },
      // CSS string/identifier serialization
      // https://drafts.csswg.org/cssom/#common-serializing-idioms
      rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function (ch, asCodePoint) {
        if (asCodePoint) {
          // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
          if (ch === '\0') {
            return '\uFFFD';
          }
          // Control characters and (dependent upon position) numbers get escaped as code points
          return ch.slice(0, -1) + '\\' + ch.charCodeAt(ch.length - 1).toString(16) + ' ';
        }
        // Other potentially-special ASCII characters get backslash-escaped
        return '\\' + ch;
      },
      // Used for iframes
      // See setDocument()
      // Removing the function wrapper causes a "Permission Denied"
      // error in IE
      unloadHandler = function () {
        setDocument();
      }, inDisabledFieldset = addCombinator(function (elem) {
        return elem.disabled === true && elem.nodeName.toLowerCase() === 'fieldset';
      }, {
        dir: 'parentNode',
        next: 'legend'
      });
    // Optimize for push.apply( _, NodeList )
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
      // Support: Android<4.0
      // Detect silently failing push.apply
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ? function (target, els) {
          push_native.apply(target, slice.call(els));
        } : function (target, els) {
          var j = target.length, i = 0;
          while (target[j++] = els[i++]) {
          }
          target.length = j - 1;
        }
      };
    }
    function Sizzle(selector, context, results, seed) {
      var m, i, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument,
        // nodeType defaults to 9, since context defaults to document
        nodeType = context ? context.nodeType : 9;
      results = results || [];
      // Return early from calls with invalid selector or context
      if (typeof selector !== 'string' || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      // Try to shortcut find operations (as opposed to filters) in HTML documents
      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }
        context = context || document;
        if (documentIsHTML) {
          // If the selector is sufficiently simple, try using a "get*By*" DOM method
          // (excepting DocumentFragment context, where the methods don't exist)
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            // ID selector
            if (m = match[1]) {
              // Document context
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  // Support: IE, Opera, Webkit
                  // TODO: identify versions
                  // getElementById can match elements by name instead of ID
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                }  // Element context
              } else {
                // Support: IE, Opera, Webkit
                // TODO: identify versions
                // getElementById can match elements by name instead of ID
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              }  // Type selector
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;  // Class selector
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          // Take advantage of querySelectorAll
          if (support.qsa && !nonnativeSelectorCache[selector + ' '] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && (nodeType !== 1 || context.nodeName.toLowerCase() !== 'object')) {
            newSelector = selector;
            newContext = context;
            // qSA considers elements outside a scoping root when evaluating child or
            // descendant combinators, which is not what we want.
            // In such cases, we work around the behavior by prefixing every selector in the
            // list with an ID selector referencing the scope context.
            // Thanks to Andrew Dupont for this technique.
            if (nodeType === 1 && rdescend.test(selector)) {
              // Capture the context ID, setting it first if necessary
              if (nid = context.getAttribute('id')) {
                nid = nid.replace(rcssescape, fcssescape);
              } else {
                context.setAttribute('id', nid = expando);
              }
              // Prefix every selector in the list
              groups = tokenize(selector);
              i = groups.length;
              while (i--) {
                groups[i] = '#' + nid + ' ' + toSelector(groups[i]);
              }
              newSelector = groups.join(',');
              // Expand context for sibling selectors
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }
            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results;
            } catch (qsaError) {
              nonnativeSelectorCache(selector, true);
            } finally {
              if (nid === expando) {
                context.removeAttribute('id');
              }
            }
          }
        }
      }
      // All others
      return select(selector.replace(rtrim, '$1'), context, results, seed);
    }
    /**
     * Create key-value caches of limited size
     * @returns {function(string, object)} Returns the Object data after storing it on itself with
     *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *	deleting the oldest entry
     */
    function createCache() {
      var keys = [];
      function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if (keys.push(key + ' ') > Expr.cacheLength) {
          // Only keep the most recent entries
          delete cache[keys.shift()];
        }
        return cache[key + ' '] = value;
      }
      return cache;
    }
    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    /**
     * Support testing using an element
     * @param {Function} fn Passed the created element and returns a boolean result
     */
    function assert(fn) {
      var el = document.createElement('fieldset');
      try {
        return !!fn(el);
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
        // release memory in IE
        el = null;
      }
    }
    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */
    function addHandle(attrs, handler) {
      var arr = attrs.split('|'), i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */
    function siblingCheck(a, b) {
      var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
      // Use IE sourceIndex if available on both nodes
      if (diff) {
        return diff;
      }
      // Check if b follows a
      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */
    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === 'input' && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */
    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === 'input' || name === 'button') && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for :enabled/:disabled
     * @param {Boolean} disabled true for :disabled; false for :enabled
     */
    function createDisabledPseudo(disabled) {
      // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
      return function (elem) {
        // Only certain elements can match :enabled or :disabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
        if ('form' in elem) {
          // Check for inherited disabledness on relevant non-disabled elements:
          // * listed form-associated elements in a disabled fieldset
          //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
          // * option elements in a disabled optgroup
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
          // All such elements have a "form" property.
          if (elem.parentNode && elem.disabled === false) {
            // Option elements defer to a parent optgroup if present
            if ('label' in elem) {
              if ('label' in elem.parentNode) {
                return elem.parentNode.disabled === disabled;
              } else {
                return elem.disabled === disabled;
              }
            }
            // Support: IE 6 - 11
            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
            return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
            /* jshint -W018 */
            elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
          }
          return elem.disabled === disabled;  // Try to winnow out elements that can't be disabled before trusting the disabled property.
                                              // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                                              // even exist on them, let alone have a boolean value.
        } else if ('label' in elem) {
          return elem.disabled === disabled;
        }
        // Remaining elements are neither :enabled nor :disabled
        return false;
      };
    }
    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */
    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
          // Match elements found at the specified indexes
          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    /**
     * Checks a node for validity as a Sizzle context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== 'undefined' && context;
    }
    // Expose support vars for convenience
    support = Sizzle.support = {};
    /**
     * Detects XML nodes
     * @param {Element|Object} elem An element or a document
     * @returns {Boolean} True iff elem is a non-HTML XML node
     */
    isXML = Sizzle.isXML = function (elem) {
      var namespace = elem.namespaceURI, docElem = (elem.ownerDocument || elem).documentElement;
      // Support: IE <=8
      // Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
      // https://bugs.jquery.com/ticket/4833
      return !rhtml.test(namespace || docElem && docElem.nodeName || 'HTML');
    };
    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */
    setDocument = Sizzle.setDocument = function (node) {
      var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
      // Return early if doc is invalid or already selected
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      // Update global variables
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);
      // Support: IE 9-11, Edge
      // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
      if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
        // Support: IE 11, Edge
        if (subWindow.addEventListener) {
          subWindow.addEventListener('unload', unloadHandler, false);  // Support: IE 9 - 10 only
        } else if (subWindow.attachEvent) {
          subWindow.attachEvent('onunload', unloadHandler);
        }
      }
      /* Attributes
      	---------------------------------------------------------------------- */
      // Support: IE<8
      // Verify that getAttribute really returns attributes and not properties
      // (excepting IE8 booleans)
      support.attributes = assert(function (el) {
        el.className = 'i';
        return !el.getAttribute('className');
      });
      /* getElement(s)By*
      	---------------------------------------------------------------------- */
      // Check if getElementsByTagName("*") returns only elements
      support.getElementsByTagName = assert(function (el) {
        el.appendChild(document.createComment(''));
        return !el.getElementsByTagName('*').length;
      });
      // Support: IE<9
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);
      // Support: IE<10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programmatically-set names,
      // so use a roundabout getElementsByName test
      support.getById = assert(function (el) {
        docElem.appendChild(el).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      });
      // ID filter and find
      if (support.getById) {
        Expr.filter['ID'] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute('id') === attrId;
          };
        };
        Expr.find['ID'] = function (id, context) {
          if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
            var elem = context.getElementById(id);
            return elem ? [elem] : [];
          }
        };
      } else {
        Expr.filter['ID'] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== 'undefined' && elem.getAttributeNode('id');
            return node && node.value === attrId;
          };
        };
        // Support: IE 6 - 7 only
        // getElementById is not reliable as a find shortcut
        Expr.find['ID'] = function (id, context) {
          if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
            var node, i, elems, elem = context.getElementById(id);
            if (elem) {
              // Verify the id attribute
              node = elem.getAttributeNode('id');
              if (node && node.value === id) {
                return [elem];
              }
              // Fall back on getElementsByName
              elems = context.getElementsByName(id);
              i = 0;
              while (elem = elems[i++]) {
                node = elem.getAttributeNode('id');
                if (node && node.value === id) {
                  return [elem];
                }
              }
            }
            return [];
          }
        };
      }
      // Tag
      Expr.find['TAG'] = support.getElementsByTagName ? function (tag, context) {
        if (typeof context.getElementsByTagName !== 'undefined') {
          return context.getElementsByTagName(tag);  // DocumentFragment nodes don't have gEBTN
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function (tag, context) {
        var elem, tmp = [], i = 0,
          // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
          results = context.getElementsByTagName(tag);
        // Filter out possible comments
        if (tag === '*') {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      // Class
      Expr.find['CLASS'] = support.getElementsByClassName && function (className, context) {
        if (typeof context.getElementsByClassName !== 'undefined' && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      /* QSA/matchesSelector
      	---------------------------------------------------------------------- */
      // QSA and matchesSelector support
      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
      rbuggyMatches = [];
      // qSa(:focus) reports false when true (Chrome 21)
      // We allow this because of a bug in IE8/9 that throws an error
      // whenever `document.activeElement` is accessed on an iframe
      // So, we allow :focus to pass through QSA all the time to avoid the IE error
      // See https://bugs.jquery.com/ticket/13378
      rbuggyQSA = [];
      if (support.qsa = rnative.test(document.querySelectorAll)) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function (el) {
          // Select is set to empty string on purpose
          // This is to test IE's treatment of not explicitly
          // setting a boolean content attribute,
          // since its presence should be enough
          // https://bugs.jquery.com/ticket/12359
          docElem.appendChild(el).innerHTML = '<a id=\'' + expando + '\'></a>' + '<select id=\'' + expando + '-\r\\\' msallowcapture=\'\'>' + '<option selected=\'\'></option></select>';
          // Support: IE8, Opera 11-12.16
          // Nothing should be selected when empty strings follow ^= or $= or *=
          // The test attribute must be unknown in Opera but "safe" for WinRT
          // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
          if (el.querySelectorAll('[msallowcapture^=\'\']').length) {
            rbuggyQSA.push('[*^$]=' + whitespace + '*(?:\'\'|"")');
          }
          // Support: IE8
          // Boolean attributes and "value" are not treated correctly
          if (!el.querySelectorAll('[selected]').length) {
            rbuggyQSA.push('\\[' + whitespace + '*(?:value|' + booleans + ')');
          }
          // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
          if (!el.querySelectorAll('[id~=' + expando + '-]').length) {
            rbuggyQSA.push('~=');
          }
          // Webkit/Opera - :checked should return selected option elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          // IE8 throws error here and will not see later tests
          if (!el.querySelectorAll(':checked').length) {
            rbuggyQSA.push(':checked');
          }
          // Support: Safari 8+, iOS 8+
          // https://bugs.webkit.org/show_bug.cgi?id=136851
          // In-page `selector#id sibling-combinator selector` fails
          if (!el.querySelectorAll('a#' + expando + '+*').length) {
            rbuggyQSA.push('.#.+[+~]');
          }
        });
        assert(function (el) {
          el.innerHTML = '<a href=\'\' disabled=\'disabled\'></a>' + '<select disabled=\'disabled\'><option/></select>';
          // Support: Windows 8 Native Apps
          // The type and name attributes are restricted during .innerHTML assignment
          var input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          el.appendChild(input).setAttribute('name', 'D');
          // Support: IE8
          // Enforce case-sensitivity of name attribute
          if (el.querySelectorAll('[name=d]').length) {
            rbuggyQSA.push('name' + whitespace + '*[*^$|!~]?=');
          }
          // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
          // IE8 throws error here and will not see later tests
          if (el.querySelectorAll(':enabled').length !== 2) {
            rbuggyQSA.push(':enabled', ':disabled');
          }
          // Support: IE9-11+
          // IE's :disabled selector does not pick up the children of disabled fieldsets
          docElem.appendChild(el).disabled = true;
          if (el.querySelectorAll(':disabled').length !== 2) {
            rbuggyQSA.push(':enabled', ':disabled');
          }
          // Opera 10-11 does not throw on post-comma invalid pseudos
          el.querySelectorAll('*,:x');
          rbuggyQSA.push(',.*:');
        });
      }
      if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function (el) {
          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          support.disconnectedMatch = matches.call(el, '*');
          // This should fail with an exception
          // Gecko does not error, returns false instead
          matches.call(el, '[s!=\'\']:x');
          rbuggyMatches.push('!=', pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'));
      /* Contains
      	---------------------------------------------------------------------- */
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      // Element contains another
      // Purposefully self-exclusive
      // As in, an element does not contain itself
      contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function (a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      /* Sorting
      	---------------------------------------------------------------------- */
      // Document order sorting
      sortOrder = hasCompare ? function (a, b) {
        // Flag for duplicate removal
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        // Sort on method existence if only one input has compareDocumentPosition
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        // Calculate position if both inputs belong to the same document
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : // Otherwise we know they are disconnected
        1;
        // Disconnected nodes
        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
          // Choose the first element that is related to our preferred document
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          // Maintain original order
          return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function (a, b) {
        // Exit early if the nodes are identical
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
        // Parentless nodes are either documents or disconnected
        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;  // If the nodes are siblings, we can do a quick check
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        // Otherwise we need full lists of their ancestors for comparison
        cur = a;
        while (cur = cur.parentNode) {
          ap.unshift(cur);
        }
        cur = b;
        while (cur = cur.parentNode) {
          bp.unshift(cur);
        }
        // Walk down the tree looking for a discrepancy
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? // Do a sibling check if the nodes have a common ancestor
        siblingCheck(ap[i], bp[i]) : // Otherwise nodes in our document sort first
        ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };
    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function (elem, expr) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      if (support.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + ' '] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          // IE 9's matchesSelector returns false on disconnected nodes
          if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
            // fragment in IE 9
            elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {
          nonnativeSelectorCache(expr, true);
        }
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function (context, elem) {
      // Set document vars if needed
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function (elem, name) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
        // Don't get fooled by Object.prototype properties (jQuery #13807)
        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.escape = function (sel) {
      return (sel + '').replace(rcssescape, fcssescape);
    };
    Sizzle.error = function (msg) {
      throw new Error('Syntax error, unrecognized expression: ' + msg);
    };
    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */
    Sizzle.uniqueSort = function (results) {
      var elem, duplicates = [], j = 0, i = 0;
      // Unless we *know* we can detect duplicates, assume their presence
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      // Clear input after sorting to release objects
      // See https://github.com/jquery/sizzle/pull/225
      sortInput = null;
      return results;
    };
    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */
    getText = Sizzle.getText = function (elem) {
      var node, ret = '', i = 0, nodeType = elem.nodeType;
      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while (node = elem[i++]) {
          // Do not traverse comment nodes
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if (typeof elem.textContent === 'string') {
          return elem.textContent;
        } else {
          // Traverse its children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      // Do not include comment or processing instruction nodes
      return ret;
    };
    Expr = Sizzle.selectors = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        '>': {
          dir: 'parentNode',
          first: true
        },
        ' ': { dir: 'parentNode' },
        '+': {
          dir: 'previousSibling',
          first: true
        },
        '~': { dir: 'previousSibling' }
      },
      preFilter: {
        'ATTR': function (match) {
          match[1] = match[1].replace(runescape, funescape);
          // Move the given value to match[3] whether quoted or unquoted
          match[3] = (match[3] || match[4] || match[5] || '').replace(runescape, funescape);
          if (match[2] === '~=') {
            match[3] = ' ' + match[3] + ' ';
          }
          return match.slice(0, 4);
        },
        'CHILD': function (match) {
          /* matches from matchExpr["CHILD"]
          		1 type (only|nth|...)
          		2 what (child|of-type)
          		3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
          		4 xn-component of xn+y argument ([+-]?\d*n|)
          		5 sign of xn-component
          		6 x of xn-component
          		7 sign of y-component
          		8 y of y-component
          	*/
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === 'nth') {
            // nth-* requires argument
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === 'even' || match[3] === 'odd'));
            match[5] = +(match[7] + match[8] || match[3] === 'odd');  // other types prohibit arguments
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        'PSEUDO': function (match) {
          var excess, unquoted = !match[6] && match[2];
          if (matchExpr['CHILD'].test(match[0])) {
            return null;
          }
          // Accept quoted arguments as-is
          if (match[3]) {
            match[2] = match[4] || match[5] || '';  // Strip excess characters from unquoted arguments
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
            // excess is a negative index
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          // Return only captures needed by the pseudo filter method (type and argument)
          return match.slice(0, 3);
        }
      },
      filter: {
        'TAG': function (nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === '*' ? function () {
            return true;
          } : function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        'CLASS': function (className) {
          var pattern = classCache[className + ' '];
          return pattern || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === 'string' && elem.className || typeof elem.getAttribute !== 'undefined' && elem.getAttribute('class') || '');
          });
        },
        'ATTR': function (name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === '!=';
            }
            if (!operator) {
              return true;
            }
            result += '';
            return operator === '=' ? result === check : operator === '!=' ? result !== check : operator === '^=' ? check && result.indexOf(check) === 0 : operator === '*=' ? check && result.indexOf(check) > -1 : operator === '$=' ? check && result.slice(-check.length) === check : operator === '~=' ? (' ' + result.replace(rwhitespace, ' ') + ' ').indexOf(check) > -1 : operator === '|=' ? result === check || result.slice(0, check.length + 1) === check + '-' : false;
          };
        },
        'CHILD': function (type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== 'nth', forward = type.slice(-4) !== 'last', ofType = what === 'of-type';
          return first === 1 && last === 0 ? // Shortcut for :nth-*(n)
          function (elem) {
            return !!elem.parentNode;
          } : function (elem, context, xml) {
            var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? 'nextSibling' : 'previousSibling', parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
            if (parent) {
              // :(first|last|only)-(child|of-type)
              if (simple) {
                while (dir) {
                  node = elem;
                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  // Reverse direction for :only-* (if we haven't yet done so)
                  start = dir = type === 'only' && !start && 'nextSibling';
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              // non-xml :nth-child(...) stores cache data on `parent`
              if (forward && useCache) {
                // Seek `elem` from a previously-cached index
                // ...in a gzip-friendly way
                node = parent;
                outerCache = node[expando] || (node[expando] = {});
                // Support: IE <9 only
                // Defend against cloned attroperties (jQuery gh-1709)
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                  // When found, cache indexes on `parent` and break
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [
                      dirruns,
                      nodeIndex,
                      diff
                    ];
                    break;
                  }
                }
              } else {
                // Use previously-cached element index if available
                if (useCache) {
                  // ...in a gzip-friendly way
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});
                  // Support: IE <9 only
                  // Defend against cloned attroperties (jQuery gh-1709)
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                // xml :nth-child(...)
                // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                if (diff === false) {
                  // Use the same loop as above to seek `elem` from the start
                  while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      // Cache the index of each encountered element
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        // Support: IE <9 only
                        // Defend against cloned attroperties (jQuery gh-1709)
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [
                          dirruns,
                          diff
                        ];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              // Incorporate the offset, then check against cycle size
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        'PSEUDO': function (pseudo, argument) {
          // pseudo-class names are case-insensitive
          // http://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that setFilters inherits from pseudos
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error('unsupported pseudo: ' + pseudo);
          // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as Sizzle does
          if (fn[expando]) {
            return fn(argument);
          }
          // But maintain support for old signatures
          if (fn.length > 1) {
            args = [
              pseudo,
              pseudo,
              '',
              argument
            ];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx, matched = fn(seed, argument), i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        'not': markFunction(function (selector) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [], results = [], matcher = compile(selector.replace(rtrim, '$1'));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
            // Match elements unmatched by `matcher`
            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            // Don't keep the element (issue #299)
            input[0] = null;
            return !results.pop();
          };
        }),
        'has': markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        'contains': markFunction(function (text) {
          text = text.replace(runescape, funescape);
          return function (elem) {
            return (elem.textContent || getText(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        'lang': markFunction(function (lang) {
          // lang value must be a valid identifier
          if (!ridentifier.test(lang || '')) {
            Sizzle.error('unsupported lang: ' + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute('xml:lang') || elem.getAttribute('lang')) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + '-') === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        // Miscellaneous
        'target': function (elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        'root': function (elem) {
          return elem === docElem;
        },
        'focus': function (elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        'enabled': createDisabledPseudo(false),
        'disabled': createDisabledPseudo(true),
        'checked': function (elem) {
          // In CSS3, :checked should return both checked and selected elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === 'input' && !!elem.checked || nodeName === 'option' && !!elem.selected;
        },
        'selected': function (elem) {
          // Accessing this property makes selected-by-default
          // options in Safari work properly
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        // Contents
        'empty': function (elem) {
          // http://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
          //   but not by others (comment: 8; processing instruction: 7; etc.)
          // nodeType < 6 works because attributes (2) do not appear as children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        'parent': function (elem) {
          return !Expr.pseudos['empty'](elem);
        },
        // Element/input types
        'header': function (elem) {
          return rheader.test(elem.nodeName);
        },
        'input': function (elem) {
          return rinputs.test(elem.nodeName);
        },
        'button': function (elem) {
          var name = elem.nodeName.toLowerCase();
          return name === 'input' && elem.type === 'button' || name === 'button';
        },
        'text': function (elem) {
          var attr;
          return elem.nodeName.toLowerCase() === 'input' && elem.type === 'text' && ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === 'text');
        },
        // Position-in-collection
        'first': createPositionalPseudo(function () {
          return [0];
        }),
        'last': createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1];
        }),
        'eq': createPositionalPseudo(function (matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        'even': createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'odd': createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'lt': createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument > length ? length : argument;
          for (; --i >= 0;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'gt': createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos['nth'] = Expr.pseudos['eq'];
    // Add button/input type pseudos
    for (i in {
        radio: true,
        checkbox: true,
        file: true,
        password: true,
        image: true
      }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
        submit: true,
        reset: true
      }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    // Easy API for creating new setFilters
    function setFilters() {
    }
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function (selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + ' '];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        // Comma and first run
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;
        // Combinators
        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrim, ' ')
          });
          soFar = soFar.slice(matched.length);
        }
        // Filters
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : // Cache the tokens
      tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0, len = tokens.length, selector = '';
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir, skip = combinator.next, key = skip || dir, checkNonElements = base && key === 'parentNode', doneName = done++;
      return combinator.first ? // Check against closest ancestor/preceding element
      function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
        return false;
      } : // Check against all ancestor/preceding elements
      function (elem, context, xml) {
        var oldCache, uniqueCache, outerCache, newCache = [
            dirruns,
            doneName
          ];
        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              // Support: IE <9 only
              // Defend against cloned attroperties (jQuery gh-1709)
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if (skip && skip === elem.nodeName.toLowerCase()) {
                elem = elem[dir] || elem;
              } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                // Assign to newCache so results back-propagate to previous elements
                return newCache[2] = oldCache[2];
              } else {
                // Reuse newcache so results back-propagate to previous elements
                uniqueCache[key] = newCache;
                // A match means we're done; a fail means we have to keep checking
                if (newCache[2] = matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0, len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function (seed, results, context, xml) {
        var temp, i, elem, preMap = [], postMap = [], preexisting = results.length,
          // Get initial elements from seed or context
          elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []),
          // Prefilter to get matcher input, preserving a map for seed-results synchronization
          matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
          postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
          [] : // ...otherwise use results directly
          results : matcherIn;
        // Find primary matches
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        // Apply postFilter
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          // Un-match failing elements by moving them back to matcherIn
          i = temp.length;
          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if (elem = matcherOut[i]) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push(matcherIn[i] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }
            // Move matched elements from seed to results to keep them synchronized
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }  // Add elements to results, through postFinder if defined
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[' '], i = leadingRelative ? 1 : 0,
        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator(function (elem) {
          return elem === checkContext;
        }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
          return indexOf(checkContext, elem) > -1;
        }, implicitRelative, true), matchers = [function (elem, context, xml) {
            var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            // Avoid hanging onto element (issue #299)
            checkContext = null;
            return ret;
          }];
      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          // Return special upon seeing a positional matcher
          if (matcher[expando]) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(// If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === ' ' ? '*' : '' })).replace(rtrim, '$1'), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, outermost) {
          var elem, j, matcher, matchedCount = 0, i = '0', unmatched = seed && [], setMatched = [], contextBackup = outermostContext,
            // We must always have either seed elements or outermost context
            elems = seed || byElement && Expr.find['TAG']('*', outermost),
            // Use integer dirruns iff this is the outermost matcher
            dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
          if (outermost) {
            outermostContext = context === document || context || outermost;
          }
          // Add elements passing elementMatchers directly to results
          // Support: IE<9, Safari
          // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
          for (; i !== len && (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              j = 0;
              if (!context && elem.ownerDocument !== document) {
                setDocument(elem);
                xml = !documentIsHTML;
              }
              while (matcher = elementMatchers[j++]) {
                if (matcher(elem, context || document, xml)) {
                  results.push(elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
              }
            }
            // Track unmatched elements for set filters
            if (bySet) {
              // They will have gone through all possible matchers
              if (elem = !matcher && elem) {
                matchedCount--;
              }
              // Lengthen the array for every element, matched or not
              if (seed) {
                unmatched.push(elem);
              }
            }
          }
          // `i` is now the count of elements visited above, and adding it to `matchedCount`
          // makes the latter nonnegative.
          matchedCount += i;
          // Apply set filters to unmatched elements
          // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
          // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
          // no element matchers and no seed.
          // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
          // case, which will result in a "00" `matchedCount` that differs from `i` but is also
          // numerically zero.
          if (bySet && i !== matchedCount) {
            j = 0;
            while (matcher = setMatchers[j++]) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              // Reintegrate element matches to eliminate the need for sorting
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results);
                  }
                }
              }
              // Discard index placeholder values to get only actual matches
              setMatched = condense(setMatched);
            }
            // Add matches to results
            push.apply(results, setMatched);
            // Seedless set matches succeeding multiple successful matchers stipulate sorting
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              Sizzle.uniqueSort(results);
            }
          }
          // Override manipulation of globals by nested matchers
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function (selector, match) {
      var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + ' '];
      if (!cached) {
        // Generate a function of recursive functions that can be used to check each element
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        // Cache the compiled function
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        // Save selector and tokenization
        cached.selector = selector;
      }
      return cached;
    };
    /**
     * A low-level selection function that works with Sizzle's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with Sizzle.compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */
    select = Sizzle.select = function (selector, context, results, seed) {
      var i, tokens, token, type, find, compiled = typeof selector === 'function' && selector, match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || [];
      // Try to minimize operations if there is only one selector in the list and no seed
      // (the latter of which guarantees us context)
      if (match.length === 1) {
        // Reduce context if the leading compound selector is an ID
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === 'ID' && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find['ID'](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;  // Precompiled matchers will still verify ancestry, so step up a level
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        // Fetch a seed set for right-to-left matching
        i = matchExpr['needsContext'].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          // Abort if we hit a combinator
          if (Expr.relative[type = token.type]) {
            break;
          }
          if (find = Expr.find[type]) {
            // Search, expanding context for leading sibling combinators
            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      // Compile and execute a filtering function if one is not provided
      // Provide `match` to avoid retokenization if we modified the selector above
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    // One-time assignments
    // Sort stability
    support.sortStable = expando.split('').sort(sortOrder).join('') === expando;
    // Support: Chrome 14-35+
    // Always assume duplicates if they aren't passed to the comparison function
    support.detectDuplicates = !!hasDuplicate;
    // Initialize against the default document
    setDocument();
    // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*
    support.sortDetached = assert(function (el) {
      // Should return 1, but returns 4 (following)
      return el.compareDocumentPosition(document.createElement('fieldset')) & 1;
    });
    // Support: IE<8
    // Prevent attribute/property "interpolation"
    // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if (!assert(function (el) {
        el.innerHTML = '<a href=\'#\'></a>';
        return el.firstChild.getAttribute('href') === '#';
      })) {
      addHandle('type|href|height|width', function (elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === 'type' ? 1 : 2);
        }
      });
    }
    // Support: IE<9
    // Use defaultValue in place of getAttribute("value")
    if (!support.attributes || !assert(function (el) {
        el.innerHTML = '<input/>';
        el.firstChild.setAttribute('value', '');
        return el.firstChild.getAttribute('value') === '';
      })) {
      addHandle('value', function (elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === 'input') {
          return elem.defaultValue;
        }
      });
    }
    // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies
    if (!assert(function (el) {
        return el.getAttribute('disabled') == null;
      })) {
      addHandle(booleans, function (elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    // EXPOSE
    var _sizzle = window.Sizzle;
    Sizzle.noConflict = function () {
      if (window.Sizzle === Sizzle) {
        window.Sizzle = _sizzle;
      }
      return Sizzle;
    };
    if (true) {
      external_sizzle = function () {
        return Sizzle;
      }();
    } else if (typeof module !== 'undefined' && module.exports) {
      module.exports = Sizzle;
    } else {
      window.Sizzle = Sizzle;
    }  // EXPOSE
  }(window));
  sizzle = function (POE, sizzle) {
    POE.extend({
      find: sizzle,
      expr: sizzle.selectors,
      uniqueSort: sizzle.uniqueSort,
      unique: sizzle.uniqueSort,
      text: sizzle.getText,
      isXMLDoc: sizzle.isXML,
      contains: sizzle.contains,
      escapeSelector: sizzle.escape
    });
    POE.expr[':'] = sizzle.selectors.pseudos;
    return POE;
  }(core, external_sizzle);
  type_array = function (extend) {
    var arr = [], concat = arr.concat, slice = arr.slice, splice = arr.splice, join = arr.join, push = arr.push, pop = arr.pop, unshift = arr.unshift, shift = arr.shift, indexOf = arr.indexOf;
    extend(Array.prototype, {
      get: function (value, key) {
        var index = this.indexOf(value, key);
        return this[index];
      },
      contains: function (value, key) {
        return this.indexOf(value, key) >= 0;
      },
      indexOf: function (value, key) {
        if (key) {
          for (var i = 0; i < this.length; i++) {
            if (this[i][key] == value.key || value) {
              return i;
            }
          }
          return -1;
        } else {
          return indexOf.apply(this, [value]);
        }
      },
      append: function () {
        try {
          push.apply(this, arguments);
          return this;
        } catch (err) {
          POE.con.error(err);
          return this;
        }
      },
      insert: function (index) {
        try {
          index = parseInt(index || 0);
          var data = [];
          for (var i = 1; i < arguments.length; i++) {
            push.call(data, arguments[i]);
          }
          if (index <= 0) {
            unshift.apply(this, data);
          } else if (index < this.length) {
            splice.apply(this, [
              index,
              0
            ].concat(data));
          } else {
            this.append(data);
          }
          return this;
        } catch (err) {
          POE.con.error(err);
          return this;
        }
      },
      remove: function (index, length) {
        try {
          index = Math.max(parseInt(index || 0), 0);
          length = Math.min(parseInt(length || 1), this.length - index);
          return splice.apply(this, [
            index,
            length
          ]);
        } catch (err) {
          POE.con.error(err);
          return [];
        }
      },
      delete: function (index, length) {
        try {
          index = Math.max(parseInt(index || 0), 0);
          length = Math.min(parseInt(length || 1), this.length - index);
          splice.apply(this, [
            index,
            length
          ]);
          return this;
        } catch (err) {
          POE.con.error(err);
          return this;
        }
      },
      all: function (value, attr) {
        if (value) {
          var rlt = true;
          if (POE.isFunction(value)) {
            POE.each(this, function () {
              if (value.apply(this) === false) {
                rlt = false;
                return false;
              }
            });
            return rlt;
          } else {
            POE.each(this, function () {
              if (attr && POE.isString(attr)) {
                if (this[attr] != value) {
                  rlt = false;
                  return false;
                }
              } else {
                if (this != value) {
                  rlt = false;
                  return false;
                }
              }
            });
          }
        }
        return true;
      },
      any: function (value, attr) {
        if (value) {
          var rlt = false;
          if (POE.isFunction(value)) {
            POE.each(this, function () {
              if (value.apply(this) === true) {
                rlt = true;
                return false;
              }
            });
            return rlt;
          } else {
            POE.each(this, function () {
              if (attr && POE.isString(attr)) {
                if (this[attr] == value) {
                  rlt = true;
                  return false;
                }
              } else {
                if (this == value) {
                  rlt = true;
                  return false;
                }
              }
            });
          }
        }
        return false;
      }
    });
  }(core_extend);
  type_string = function (extend) {
    extend(String.prototype, {
      endWith: function (suffix) {
        suffix += '';
        if (POE.isEmpty(suffix)) {
          return true;
        }
        return this.substr(this.length - suffix.length, suffix.length) == suffix;
      },
      startWith: function (prefix) {
        prefix += '';
        if (POE.isEmpty(prefix)) {
          return true;
        }
        return this.substr(0, prefix.length) == prefix;
      },
      ltrim: function () {
        return this.replace(/^\s*/g, '');
      },
      rtrim: function () {
        return this.replace(/\s*$/g, '');
      },
      isPhoneNumber: function () {
        return /^1\d{10}$/.test(this);
      },
      isEmail: function () {
        return /^\w+@\w+\.\w+$/.test(this);
      }
    });
  }(core_extend);
  type_date = function (extend) {
    Date.from = function (ts, ms) {
      var d = new Date();
      if (!ms) {
        ts *= 1000;
      }
      d.setTime(ts);
      return d;
    };
    var parse = Date.parse;
    Date.parse = function (str) {
      return Date.from(parse(str));
    };
    extend(Date.prototype, {
      time: function (sec, ms) {
        if (sec === undefined || sec === false) {
          sec = this.getTime;
          if (!ms) {
            sec /= 1000;
          }
          return Math.floor(sec);
        } else {
          if (!ms) {
            sec *= 1000;
          }
          this.setTime(sec);
        }
      },
      format: function (fmt) {
        var year = this.getFullYear(), month = this.getMonth(), day = this.getDate(), week = this.getDay(), hour = this.getHours(), minute = this.getMinutes(), second = this.getSeconds(), millsec = this.getMilliseconds(), d = day < 10 ? '0' + day : day,
          //d - 一个月中的第几天（从 01 到 31）
          D = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
          ][week],
          //D - 星期几的文本表示（用三个字母表示）
          j = day,
          // j - 一个月中的第几天，不带前导零（1 到 31）
          l = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ][week],
          //l（'L' 的小写形式）- 星期几的完整的文本表示
          //N = week+1,//N - 星期几的 ISO-8601 数字格式表示（1表示Monday[星期一]，7表示Sunday[星期日]）
          w = week,
          //w - 星期几的数字表示（0 表示 Sunday[星期日]，6 表示 Saturday[星期六]）
          //W - 用 ISO-8601 数字格式表示一年中的星期数字（每周从 Monday[星期一]开始）
          F = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ][month],
          //F - 月份的完整的文本表示（January[一月份] 到 December[十二月份]）
          m = month >= 9 ? month + 1 : '0' + (month + 1),
          //m - 月份的数字表示（从 01 到 12）
          M = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ][month],
          //M - 月份的短文本表示（用三个字母表示）
          n = month + 1,
          //n - 月份的数字表示，不带前导零（1 到 12）
          Y = year,
          //Y - 年份的四位数表示
          y = year.toString().substr(2),
          //y - 年份的两位数表示
          a = hour >= 12 ? 'pm' : 'am',
          //a - 小写形式表示：am 或 pm
          A = hour >= 12 ? 'PM' : 'AM',
          //A - 大写形式表示：AM 或 PM
          g = hour % 12,
          //g - 12 小时制，不带前导零（1 到 12）
          G = hour,
          //G - 24 小时制，不带前导零（0 到 23）
          h = g < 10 ? '0' + g : g,
          //h - 12 小时制，带前导零（01 到 12）
          H = G < 10 ? '0' + G : G,
          //H - 24 小时制，带前导零（00 到 23）
          i = minute < 10 ? '0' + minute : minute,
          //i - 分，带前导零（00 到 59）
          s = second < 10 ? '0' + second : second,
          //s - 秒，带前导零（00 到 59）
          f = new Array(3 - millsec.toString().length).fill(0) + millsec, S = day + 1;
        //S - 一个月中的第几天的英语序数后缀（2 个字符：st、nd、rd 或 th。与 j 搭配使用）
        switch (day) {
        case 0:
          S += 'st';
          break;
        case 1:
          S += 'nd';
          break;
        default:
          S += 'th';
        }
        if (fmt) {
          return fmt.replace('d', d).replace('D', D).replace('j', j).replace('l', l).replace('w', w).replace('F', F).replace('m', m).replace('M', M).replace('n', n).replace('Y', Y).replace('y', y).replace('a', a).replace('A', A).replace('g', g).replace('G', G).replace('h', h).replace('H', H).replace('i', i).replace('s', s).replace('S', S).replace('f', f);
        } else {
          return this.toString();
        }
      }
    });
  }(core_extend);
  type = function (POE, toType, isWindow, isFunction, isArrayLike, isPlainObject) {
    POE.extend({
      type: toType,
      isFunction: isFunction,
      isWindow: isWindow,
      isString: function (obj) {
        return toType(obj) == 'string';
      },
      isArray: function (obj) {
        return Array.isArray(obj);
      },
      isBoolean: function (obj) {
        return toType(obj) == 'boolean';
      },
      isDate: function (obj) {
        return toType(obj) == 'date';
      },
      isNumber: function (obj) {
        return toType(obj) == 'number';
      },
      isObject: function (obj) {
        return toType(obj) == 'object';
      },
      isNull: function (obj) {
        return obj === null;
      },
      isUndefined: function (obj) {
        return obj === undefined;
      },
      likeArray: isArrayLike,
      isEmpty: function (obj) {
        if (obj === '') {
          return true;
        }
        if (toType(obj) == 'number') {
          return false;
        }
        for (var name in obj) {
          return false;
        }
        return true;
      },
      isPlainObject: isPlainObject,
      isEmptyObject: function (obj) {
        var name;
        for (name in obj) {
          return false;
        }
        return true;
      }
    });
    return POE;
  }(core, core_toType, core_isWindow, core_isFunction, core_isArrayLike, core_isPlainObject);
  ui__def_ = {
    ref: '_def_',
    ui: '',
    //modal|toast|loading|notify|input|verif
    title: false,
    //{text:'',min:false,close:false},
    anim: true,
    mask: true,
    type: '',
    //info,success|error|warn
    align: 'center',
    during: 0,
    //ui显示时长，0表示无限时长，需要手动或通过API关闭
    delay: 50,
    abort: false,
    icon: { color: '#ffffff' },
    cancel: {
      text: '取消',
      cb: function () {
      },
      color: '#888888'
    },
    confirm: {
      text: '确认',
      cb: function () {
      },
      color: '#414141'
    },
    autoRemove: false
  };
  ui__cache_ = {
    notify: {},
    modal: {},
    toast: {},
    loading: {},
    verif: {},
    input: {}
  };
  ui_parseOptions = function (_def_) {
    return function (options, uiOpt) {
      if (!options || POE.isString(options)) {
        if (uiOpt.ui == 'notify') {
          options = { type: options || 'info' };
        } else if (uiOpt.ui == 'toast') {
          options = { type: options || 'success' };
        } else {
          options = { ref: options || '_def_' };
        }
      }
      options = POE.extend(true, {}, _def_, uiOpt || {}, options || {});
      var title = options.title || false, abort = options.abort || false, cancel = options.cancel || {}, confirm = options.confirm || {}, icon = options.icon || { color: '#ffffff' };
      if (POE.isString(title)) {
        title = { text: title };
      }
      options.title = title;
      if (icon && POE.isString(icon)) {
        icon = { color: icon };
      }
      options.icon = icon;
      if (POE.isString(abort)) {
        if (abort.startWith('#')) {
          abort = { color: abort };
        } else {
          abort = { text: abort };
        }
      } else if (POE.isFunction(abort)) {
        abort = { cb: abort };
      }
      options.abort = abort;
      if (POE.isString(cancel)) {
        if (cancel.startWith('#')) {
          cancel = { color: cancel };
        } else {
          cancel = { text: cancel };
        }
      } else if (POE.isFunction(cancel)) {
        cancel = { cb: cancel };
      }
      options.cancel = cancel;
      if (POE.isString(confirm)) {
        if (confirm.startWith('#')) {
          confirm = { color: confirm };
        } else {
          confirm = { text: confirm };
        }
      } else if (POE.isFunction(confirm)) {
        confirm = { cb: confirm };
      }
      options.confirm = confirm;
      return POE.extend(true, {}, _def_, options);
    };
  }(ui__def_);
  ui_options2class = function (options) {
    var _class_ = '';
    if (options.mask) {
      _class_ += 'mask';
    }
    if (options.anim) {
      _class_ += ' anim';
    }
    if (options.align) {
      _class_ += ' hor-' + options.align;
    }
    if (options.type) {
      _class_ += ' ' + options.type;
    }
    return _class_;
  };
  ui_tpl_notifyHTML = function () {
    var html = '<div class="pui-notify"><p class="pui-content"></p></div>';
    return html;
  }();
  ui_tpl_loadingHTML = function () {
    var html = '<div class="pui-mask loading" ><div class="dp-table-cell ver-middle"><div class="pui-box"><div class="dp-table-cell ver-middle">';
    html += '<article class="pui-spinner">';
    for (var i = 0; i < 12; i++) {
      html += '<span class="pui-scale"></span>';
    }
    html += '</article>';
    html += '<footer class="pui-content">正在加载\u2026</footer>';
    html += '</div></div></div></div>';
    return html;
  }();
  ui_tpl_toastHTML = function () {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" version="1.1" {{size}}>{{path}}</svg>', success = svg.replace('{{path}}', '<path d="M185.6 473.6L89.6 550.4l377.6 364.8s160-384 518.4-704l-32-44.8S646.4 364.8 403.2 640L185.6 473.6z" fill="{{color}}"/>'), error = svg.replace('{{path}}', '<path xmlns="http://www.w3.org/2000/svg" d="M942.124224 88.935694l-54.013179-26.244206L81.871675 803.397489l75.214804 156.067786L942.124224 88.935694zM866.909419 959.465474l75.214804-156.067786L135.884055 62.691687l-54.01218 26.244206L866.909419 959.465474z" fill="{{color}}"/>'), info = svg.replace('{{path}}', '<path xmlns="http://www.w3.org/2000/svg" d="M128.512 420.864z m-71.168 0zM615.424 420.864z m-71.68 0zM372.224 420.864z m-71.68 0zM627.2 175.104c0 60.928-49.664 110.592-110.592 110.592-60.928 0-110.592-49.664-110.592-110.592 0-60.928 49.664-110.592 110.592-110.592 61.44 0 110.592 49.664 110.592 110.592z m0 783.36h-221.184l33.28-608.768H593.92l33.28 608.768z" fill="{{color}}"/>'), warn = svg.replace('{{path}}', '<path xmlns="http://www.w3.org/2000/svg" d="M573.12 736l34.88-640-192 0 35.584 640 121.536 0zM448 800l0 128 128 0 0-128-128 0z" fill="{{color}}"/>');
    var html = '<div class="pui-mask toast" ><div class="dp-table-cell ver-middle"><div class="pui-box"><div class="dp-table-cell ver-middle">';
    html += '<article class="pui-spinner icon">{{svg}}</article><footer class="pui-content"></footer></div></div></div></div>';
    return {
      svg: function (type) {
        switch (type) {
        case 'error':
          return error;
        case 'info':
          return info;
        case 'warn':
          return warn;
        default:
          return success;
        }
      },
      success: function (paths) {
        return html.replace('{{svg}}', paths || success);
      },
      error: function (paths) {
        return html.replace('{{svg}}', paths || error);
      },
      info: function (paths) {
        return html.replace('{{svg}}', paths || info);
      },
      warn: function (paths) {
        return html.replace('{{svg}}', paths || warn);
      }
    };
  }();
  ui_tpl_modalHTML = function () {
    var html = '<div class="pui-mask modal" ><div class="dp-table-cell ver-middle"><div class="pui-box">';
    html += '<header class="pui-title">标题</header>';
    html += '<article class="pui-body hor-center">';
    html += '<div class="pui-content dp-table-cell ver-middle">测试测试测试测试</div>';
    html += '</article>';
    html += '<footer class="pui-foot flex-row">';
    html += '<button class="dlg-btn pui-btn-abort flex-item">放弃</button>';
    html += '<button class="dlg-btn pui-btn-cancel flex-item">取消</button>';
    html += '<button class="dlg-btn pui-btn-confirm flex-item">确定</button>';
    html += '</footer>';
    html += '</div></div></div>';
    return html;
  }();
  ui = function (POE, document, _def_, _cache_, parseOptions, options2class, notifyHTML, loadingHTML, toastHTML, modalHTML) {
    var $$body = POE(document.body), applyOptions = function (ui, options) {
        var _class_ = options2class(options);
        return ui.data('ref', options.ref).data('opt', options).class(_class_);
      }, removeOptions = function (ui) {
        var options = ui.data('opt');
        var _class_ = '^' + options2class(options);
        return ui.class(_class_);
      }, showUI = function (ui) {
        var options = ui.data('opt');
        if (options.anim) {
          ui.class('showing', options.delay).class('hiding', options.delay + 400);
        } else {
          ui.class('showing');
        }
        if (options.during > 0) {
          hideUI(ui, options.during + options.delay + 400);
        }
      }, hideUI = function (ui, delay) {
        var options = ui.data('opt');
        delay = delay || 0;
        if (options.anim) {
          ui.class('^showing', delay).class('^hiding', delay + (options.delay + 400), function () {
            if (options.autoRemove) {
              delete _cache_[options.ui][options.ref];
              ui.remove();
            } else {
              removeOptions(ui);
            }
          });
        } else {
          ui.class('^showing');
          if (options.autoRemove) {
            delete _cache_[options.ui][options.ref];
            ui.remove();
          } else {
            removeOptions(ui);
          }
        }
      };
    POE.ui = {
      modal: function (content, options) {
      },
      toast: function (content, options) {
        if (!content) {
          if (content === undefined) {
            content = false;
            options = { ref: '_def_' };
          } else if (content === false) {
            options = { ref: options };
          }
        }
        options = parseOptions(options, {
          ui: 'toast',
          during: 1500,
          mask: false
        });
        var toast = _cache_.toast[options.ref] = _cache_.toast[options.ref] || POE(toastHTML[options.type](options.icon.paths).replace('{{color}}', options.icon.color)).appendTo($$body);
        if (content === false) {
          hideUI(toast);
        } else {
          applyOptions(toast, options);
          toast.find('.icon').html(toastHTML.svg(options.type).replace('{{color}}', options.icon.color));
          toast.find('.pui-content').html(content);
          showUI(toast);
        }
        return this;
      },
      loading: function (content, options) {
        if (!content) {
          if (content === undefined) {
            content = false;
            options = { ref: '_def_' };
          } else if (content === false) {
            options = { ref: options };
          }
        }
        options = parseOptions(options, {
          ui: 'loading',
          mask: false
        });
        var loading = _cache_.loading[options.ref] = _cache_.loading[options.ref] || POE(loadingHTML).appendTo($$body);
        if (content === false) {
          hideUI(loading);
        } else {
          applyOptions(loading, options).find('.pui-content').html(content);
          showUI(loading);
        }
        return this;
      },
      notify: function (content, options) {
        if (!content) {
          if (content === undefined) {
            content = false;
            options = { ref: '_def_' };
          } else if (content === false) {
            options = { ref: options };
          }
        }
        options = parseOptions(options, {
          ui: 'notify',
          type: 'info',
          align: 'left',
          during: 1500
        });
        var notify = _cache_.notify[options.ref] = _cache_.notify[options.ref] || POE(notifyHTML).appendTo($$body);
        if (content === false) {
          hideUI(notify);
        } else {
          applyOptions(notify, options).find('.pui-content').html(content);
          showUI(notify);
        }
        return this;
      },
      verif: function (content, options) {
      },
      input: function (content, options) {
      }
    };
    return POE;
  }(core, var_document, ui__def_, ui__cache_, ui_parseOptions, ui_options2class, ui_tpl_notifyHTML, ui_tpl_loadingHTML, ui_tpl_toastHTML, ui_tpl_modalHTML);
  poe = function (POE) {
    var readyList = POE.Deferred(), doc = window.document;
    POE.fn.ready = function (fn) {
      readyList.then(fn).catch(function (error) {
        setTimeout(function () {
          throw error;
        });
      });
      return this;
    };
    POE.extend({
      isReady: false,
      readyWait: 1,
      ready: function (wait) {
        if (wait === true ? --POE.readyWait : POE.isReady) {
          return;
        }
        POE.isReady = true;
        if (wait !== true && --POE.readyWait > 0) {
          return;
        }
        readyList.resolveWith(document, [POE]);
      }
    });
    POE.ready.then = readyList.then;
    function completed() {
      doc.removeEventListener('DOMContentLoaded', completed);
      window.removeEventListener('load', completed);
      POE.ready();
    }
    if (doc.readyState === 'complete' || doc.readyState !== 'loading' && !doc.documentElement.doScroll) {
      window.setTimeout(POE.ready);
    } else {
      doc.addEventListener('DOMContentLoaded', completed);
      window.addEventListener('load', completed);
    }
    try {
      var win = window;
      POE.createObjectURL = window.createObjectURL || window.URL && window.URL.createObjectURL || window.webkitURL && window.webkitURL.createObjectURL;
      POE.con.info('欢迎使用POE前端框架\n框架作者\uFF1A \t\thttps://poechiang.tech\n文档及API说明\uFF1A \thttps://poejs.poechiang.tech');
    } catch (e) {
      throw e;
    }
    if (true) {
      poe = function () {
        return POE;
      }();
    }
    var
      // Map over POE in case of overwrite
      _POE = window.POE,
      // Map over the $ in case of overwrite
      _$$ = window.$$;
    POE.noConflict = function (deep) {
      if (window.$$ === POE) {
        window.$$ = _$$;
      }
      if (deep && window.POE === POE) {
        window.POE = _POE;
      }
      return POE;
    };
    if (!noGlobal) {
      window.POE = window.$$ = POE;
    }
    return POE;
  }(core);
  return POE;
}));
}());