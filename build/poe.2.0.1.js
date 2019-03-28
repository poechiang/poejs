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
var core, exports_amd, poe, exports_global;
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
  core = function () {
    var arr = [], proto = Object.prototype, version = '2.0.1',
      // Define a local copy of POE
      POE = function (selector, context) {
        // The POE object is actually just the init constructor 'enhanced'
        // Need init if POE is called (just allow error to be thrown if not included)
        return new POE.fn.init(selector, context);
      }, extend = function () {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        // Handle a deep copy situation
        if (typeof target === 'boolean') {
          deep = target;
          // Skip the boolean and the target
          target = arguments[i] || {};
          i++;
        }
        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== 'object' && !POE.isFunction(target)) {
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
              if (deep && copy && (POE.isPlainObject(copy) || (copyIsArray = POE.isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && POE.isArray(src) ? src : [];
                } else {
                  clone = src && POE.isPlainObject(src) ? src : {};
                }
                // Never move original objects, clone them
                target[name] = POE.extend(deep, clone, copy);  // Don't bring in undefined values
              } else if (copy !== undefined) {
                target[name] = copy;
              }
            }
          }
        }
        // Return the modified object
        return target;
      };
    POE.fn = POE.prototype = {
      // The current version of POE being used
      poe: version,
      constructor: POE,
      // The default length of a POE object is 0
      length: 0
    };
    POE.extend = POE.fn.extend = extend;
    POE.extend({
      // Unique for each copy of POE on the page
      expando: 'POE' + (version + Math.random()).replace(/\D/g, ''),
      // Assume POE is ready without the ready module
      isReady: true,
      // A global GUID counter for objects
      guid: 1,
      noop: function () {
      },
      isString: function (arg) {
        return POE.type(arg) == 'string';
      },
      isObject: function (arg) {
        return POE.type(arg) == 'object';
      },
      isNumber: function (arg) {
        return POE.type(arg) == 'number' && !isNaN(arg);
      },
      isDate: function (arg) {
        return POE.type(arg) == 'date';
      },
      isArray: function (arg) {
        return Array.isArray(arg);
      },
      isBoolean: function (arg) {
        return POE.type(arg) == 'boolean';
      },
      isFunction: function (arg) {
        //return POE.type(arg) == 'function';
        return typeof arg === 'function' && typeof arg.nodeType !== 'number';
      },
      isNull: function (arg) {
        return arg === null;
      },
      isUndefined: function (arg) {
        return arg === undefined;
      },
      isWindow: function (obj) {
        return obj != null && obj === obj.window;
      },
      isEmpty: function (obj) {
        if (obj === '') {
          return true;
        }
        if (POE.isNumber(obj)) {
          return false;
        }
        for (var name in obj) {
          return false;
        }
        return true;
      },
      type: function (obj) {
        if (obj == null) {
          return obj + '';
        }
        // Support: Android <=2.3 only (functionish RegExp)
        return typeof obj === 'object' || typeof obj === 'function' ? obj[obj.toString.call(obj)] || 'object' : typeof obj;
      },
      // Support: Android <=4.0 only, PhantomJS 1 only
      // push.apply(_, arraylike) throws on ancient WebKit
      merge: function (first, second) {
        var len = +second.length, j = 0, i = first.length;
        for (; j < len; j++) {
          first[i++] = second[j];
        }
        first.length = i;
        return first;
      },
      each: function (obj, callback) {
        var length, i = 0;
        if (obj && POE.likeArray(obj)) {
          length = obj.length;
          for (; i < length; i++) {
            if (callback.call(obj[i], i, obj[i]) === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
              break;
            }
          }
        }
        return obj;
      },
      inArray: function (elem, arr, i) {
        return arr == null ? -1 : [].indexOf.call(arr, elem, i);
      },
      likeArray: function (obj) {
        var length = !!obj && 'length' in obj && obj.length, type = POE.type(obj);
        if (type === 'function' || POE.isWindow(obj)) {
          return false;
        }
        return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
      },
      // arg is for internal usage only
      map: function (elems, callback, arg) {
        var length, value, i = 0, ret = [];
        // Go through the array, translating each of the items to their new values
        if (obj && POE.likeArray()) {
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
        return concat.apply([], ret);
      },
      isPlainObject: function (obj) {
        var proto, Ctor;
        // Detect obvious negatives
        // Use toString instead of POE.type to catch host objects
        if (!obj || obj.toString.call(obj) !== '[object Object]') {
          return false;
        }
        proto = Object.getPrototypeOf(obj);
        // Objects with no prototype (e.g., `Object.create( null )`) are plain
        if (!proto) {
          return true;
        }
        // Objects with prototype are plain iff they were constructed by a global Object function
        Ctor = obj.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
        return typeof Ctor === 'function' && obj.hasOwnProperty.toString.call(Ctor) === obj.hasOwnProperty.toString.call(Object);
      },
      createObjectURL: function (file) {
        return window.createObjectURL(file);
      },
      uuid: function (len, radix) {
        //return (new Date).to()+''+Math.floor(Math.random()*999+1)
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
          // Compact form
          for (i = 0; i < len; i++)
            uuid[i] = chars[0 | Math.random() * radix];
        } else {
          // rfc4122, version 4 form
          var r;
          // rfc4122 requires these characters
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';
          // Fill in random data.  At i==19 set the high bits of clock sequence as
          // per rfc4122, sec. 4.1.5
          for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
              r = 0 | Math.random() * 16;
              uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
            }
          }
        }
        return uuid.join('');
      },
      now: Date.now
    });
    POE.fn.extend({
      toArray: function () {
        return arr.slice.call(this);
      },
      // Get the Nth element in the matched element set OR
      // Get the whole matched element set as a clean array
      get: function (num) {
        // Return all the elements in a clean array
        if (num == null) {
          return [].slice.call(this);
        }
        // Return just the one element from the set
        return num < 0 ? this[num + this.length] : this[num];
      },
      // Take an array of elements and push it onto the stack
      // (returning the new matched element set)
      pushStack: function (elems) {
        // Build a new POE matched element set
        var ret = POE.merge(this.constructor(), elems);
        // Add the old object onto the stack (as a reference)
        ret.prevObject = this;
        // Return the newly-formed element set
        return ret;
      },
      // Execute a callback for every element in the matched set.
      each: function (callback) {
        return POE.each(this, callback);
      },
      map: function (callback) {
        return this.pushStack(POE.map(this, function (elem, i) {
          return callback.call(elem, i, elem);
        }));
      },
      slice: function () {
        return this.pushStack(slice.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (i) {
        var len = this.length, j = +i + (i < 0 ? len : 0);
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      // For internal use only.
      // Behaves like an Array's method, not like a POE method.
      push: arr.push,
      sort: arr.sort,
      splice: arr.splice
    });
    POE.fn.extend({
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
        return !!winnow(this, // If this is a positional/relative selector, check membership in the returned set
        // so $("p:first").is("p:last") won't return true for a doc with two "p".
        typeof selector === 'string' && rneedsContext.test(selector) ? POE(selector) : selector || [], false).length;
      }
    });
    return POE;
  }();
  exports_amd = function (POE) {
    // Register as a named AMD module, since POE can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase poe is used because AMD module names are
    // derived from file names, and POE is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of POE, it will work.
    // Note that for maximum portability, libraries that are not POE should
    // declare themselves as anonymous modules, and avoid setting a global if an
    // AMD loader is present. POE is a special case. For more information, see
    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
    if (true) {
      poe = function () {
        return POE;
      }();
    }
  }(core);
  exports_global = function (POE, noGlobal) {
    var
      // Map over POE in case of overwrite
      _POE = window.POE,
      // Map over the $$ in case of overwrite
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
    // Expose POE and $$ identifiers, even in AMD
    // (#7102#comment:10, https://github.com/poe/poe/pull/557)
    // and CommonJS for browser emulators (#13566)
    if (!noGlobal) {
      POE.global = window;
      window.POE = window.$$ = POE;
    }
  }(core);
  poe = function (POE) {
    // // 自动填写移动设备适配head内容
    // var $script = $('script[src*="/poe."][poe]').last()
    // if ( $$.support.isMobilePlatform ) {
    // 	// var opt = JSON.parse($script.data('opt'))
    // 	// console.log(opt)
    // 	$$.dom.meta({
    // 		viewport:'width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
    // 		appleMobileWebAppCapable:'yes',
    // 		appleMobileWebAppStatusBarStyle:'black',
    // 		formatDetection:'telephone=no'
    // 	})
    // 	$$.dom.link('144.png','apple-touch-icon-precomposed','144x144')
    // 	$$.dom.link('72.png','apple-touch-icon-precomposed','72x72')
    // 	$$.dom.link('57.png','apple-touch-icon-precomposed','57x57')
    // }
    // $(window).scroll(function(e){
    //        var $win=$(window),
    //        	doc = window.document,
    //            wh=$win.height(),
    //            dh=$(doc).height(),
    //            sh=$(doc).scrollTop()
    //        if (sh>=dh-wh) {
    //            var $ajaxLoader=$('.ajax-loader')
    //            $ajaxLoader.each(function(){
    //                var $this=$(this),
    //                	data = POE(this).data()
    //                if ($this.is('.auto-load')) {
    //                    //setTimeout(function(){
    //                        data.load();
    //                    //},1000)
    //                }
    //            })
    //        }
    //    })
    //    var $form = $('form.ajax-submit')
    //    $form.attr('novalidate',true).submit(function(){
    //        var uploader = $$('form').data()
    //        try{
    //            uploader.submit()
    //            return false
    //        }
    //        catch(err){
    //            POE.error(err)
    //            return false
    //        }
    //    })
    try {
      if (window.console && window.console.log) {
        console.log('欢迎使用POE前端框架\uFF0C如有建议期待与您交流\uFF1A \nhttps://poechiang.tech');
      }
    } catch (e) {
    }
    return POE;
  }(core);
  return POE;
}));
}());