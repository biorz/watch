(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("watcher", [], factory);
	else if(typeof exports === 'object')
		exports["watcher"] = factory();
	else
		root["watcher"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _watcher = __webpack_require__(1);

var _watcher2 = _interopRequireDefault(_watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _watcher2.default;
module.exports = exports["default"];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emit2 = __webpack_require__(2);

var _emit3 = _interopRequireDefault(_emit2);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var group = { interval: 1000 / 60, list: [] };

var throttle = function throttle(fn) {
  var ban = false;

  return function () {
    var _arguments = arguments;

    if (ban) return;
    ban = true;

    setTimeout(function () {
      fn.apply(null, [].slice.call(_arguments));
      ban = false;
    }, group.interval);
  };
};

var check = throttle(function (e) {
  group.list.forEach(function (selector) {
    group[selector].emit("re", e);
  });
});

var listens = ["scroll", "resize", "load"];
listens.forEach(function (event) {
  addEventListener(event, check);
});

var def = {
  wrapper: "html",
  proportion: { dir: 1, size: 1, select: 1, ratio: 1 },
  offset: { top: 0, right: 0, bottom: 0, left: 0 },
  threshold: 0,
  direction: 0,

  test: function test(inview) {
    return inview;
  }
};

var axis = {
  coordinate: [0, 0],
  offset: ["offsetTop", "offsetLeft"],
  scrollOffset: ["scrollTop", "scrollLeft"],
  scrollLength: ["scrollHeight", "scrollWidth"],
  direction: ["top", "right", "bottom", "left"],
  length: ["vh", "vw"],
  start: ["top", "left"],
  end: ["bottom", "right"],
  side: ["height", "width"]
};

var watcher = function (_emit) {
  _inherits(watcher, _emit);

  function watcher(selector, options) {
    var _ret;

    _classCallCheck(this, watcher);

    var _this = _possibleConstructorReturn(this, (watcher.__proto__ || Object.getPrototypeOf(watcher)).call(this));

    if (typeof selector !== "string") return _possibleConstructorReturn(_this);

    var index = group.list.indexOf(selector);
    if (~index) return _ret = group[group.list[index]], _possibleConstructorReturn(_this, _ret);

    group.list.push(selector);
    group[selector] = _this;

    _this.elements = [].slice.call(document.querySelectorAll(selector));
    _this.options = Object.assign(def, options || {});

    _this.init();
    return _this;
  }

  _createClass(watcher, [{
    key: "init",
    value: function init() {
      this.current = [];
      this.views = [];

      this.offset();
      this.threshold();
      this.direction();
      this.proportion();

      this.isHozi = this.options.direction % 2;
      this.isEnd = this.options.direction % 3;

      this.html = document.querySelector("html");

      this.preCalculate();
      this.onEvent();
    }
  }, {
    key: "onEvent",
    value: function onEvent() {
      var _this2 = this;

      var self = this,
          history = [];

      this.on("re", function (e) {
        if (e.type !== "scroll") {
          _this2.preCalculate();
        }

        _this2.check();
      });

      this.elements.forEach(function (element) {
        _this2.getParentItera(function (el, parent) {
          if (!parent) return false;

          if (!~history.indexOf(parent)) {
            history.push(parent);
            parent.addEventListener("scroll", function (e) {
              self.check();
            });
          }
        }, element);
      });
    }
  }, {
    key: "check",
    value: function check() {
      var _this3 = this;

      this.views = [];

      this.elements.forEach(function (el) {
        var passed = _this3.inView(el),
            index = _this3.current.indexOf(el),
            enter = passed && !~index,
            exit = !passed && ~index;

        if (passed) _this3.views.push(passed);
        if (enter) _this3.emit("change enter", el);
        if (exit) _this3.emit("change exit", el);
      });

      this.sortBy(this.views);

      this.current = this.views.map(function (o) {
        return o.element;
      });
      this.emit("check", this.current[0], this.current, this.views);
      this.current.length ? this.emit("has", this.current[0], this.current, this.views) : this.emit("none");
    }
  }, {
    key: "offset",
    value: function offset() {
      var o = this.options.offset;
      var offset = {};
      var isNum = function isNum(n) {
        return typeof n === "number";
      };
      ["top", "right", "bottom", "left"].forEach(isNum(o) ? function (dim) {
        return offset[dim] = o;
      } : function (dim) {
        return offset[dim] = isNum(o[dim]) ? o[dim] : null;
      });
      this.options.offset = offset;
    }
  }, {
    key: "threshold",
    value: function threshold() {
      var n = this.options.threshold;
      this.options.threshold = typeof n === "number" && n >= 0 && n <= 1 ? n : null;
    }
  }, {
    key: "direction",
    value: function direction() {
      var d = this.options.direction;
      var idx = void 0;
      this.options.direction = typeof d === "number" ? d : ~(idx = axis.direction.indexOf[d]) ? idx : null;
    }
  }, {
    key: "proportion",
    value: function proportion() {
      var p = this.options.proportion;
      for (var k in p) {
        this.options.proportion[k] = typeof p[k] === "number" ? p[k] : null;
      }
    }
  }, {
    key: "preCalculate",
    value: function preCalculate() {
      this.vw = window.innerWidth;
      this.vh = window.innerHeight;
      this.vs = this.vw * this.vh;

      this.vp = {
        top: 0,
        right: this.vw,
        bottom: this.vh,
        left: 0,
        width: this.vw,
        height: this.vh
      };
    }
  }, {
    key: "getParentItera",
    value: function getParentItera(fn, el) {
      var parent = void 0,
          rst = void 0;

      do {
        parent = (0, _utils.getScrollParent)(el);
        rst = fn(el, parent);
        el = parent;
      } while (parent && rst !== false);
    }
  }, {
    key: "scroll",
    value: function scroll(element, time) {
      var _this4 = this;

      this.select = element;
      this.scrollTo(element, time);

      this.one("exit", function (el) {
        if (_this4.select !== el) return false;
        _this4.select = null;
        return true;
      });
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(element, time) {
      var _this5 = this;

      this.isScrollTo = true;

      var end = function end() {
        _this5.isScrollTo = true;
        _this5.check();
      };

      var history = [],
          parent = null,
          rect = element.getBoundingClientRect(),
          rect2 = void 0,
          scroll = void 0,
          self = this;

      this.getParentItera(function (el, parent) {
        if (!parent) {
          rect2 = self.getOffsetRect(rect, self.vp);
          scroll = self.getScroll(rect, rect2, self.html);
          history.push(scroll);
          return false;
        }

        rect2 = parent.getBoundingClientRect();
        scroll = self.getScroll(rect, rect2, parent);

        rect = {
          top: scroll.offset[1],
          left: scroll.offset[0],
          width: rect.width,
          height: rect.height
        };

        history.push(scroll);
      }, element);

      history.forEach(function (scroll) {
        var wrapper = scroll.element,
            dist = scroll.dist,
            start = scroll.start,
            distance = scroll.distance,
            max = scroll.max;

        if (!time) {
          wrapper.scroll(dist[0], dist[1]);
          return end();
        }

        [0, 1].forEach(function (i) {
          var t = 0,
              timer = void 0;

          timer = (0, _utils.RAF)(function step() {
            wrapper[axis.scrollOffset[i]] = _utils.tween.quad.easeInOut(t, start[1 - i], distance[1 - i], time);
            t += 1000 / 60;

            if (t >= time || dist[1 - i] <= 0 && start[1 - i] <= 0 || dist[1 - i] >= max[1 - i] && start[1 - i] >= max[1 - i]) return end();
            timer = (0, _utils.RAF)(step);
          });
        });
      });
    }
  }, {
    key: "getScroll",
    value: function getScroll(rect, rect2, element) {
      var _this6 = this;

      var start = [],
          dist = [],
          max = [],
          distance = [],
          offset = [],
          scrollLength = void 0,
          scrollOffset = void 0,
          top = void 0,
          begin = void 0,
          side = void 0;

      [0, 1].forEach(function (i) {
        begin = axis.start[1 - i];
        side = axis.side[1 - i];
        scrollLength = element[axis.scrollLength[1 - i]];
        scrollOffset = element[axis.scrollOffset[1 - i]];
        top = _this6.isEnd ? rect2[side] - rect[side] : 0;

        start[i] = scrollOffset;
        offset[i] = rect2[begin] + top;
        distance[i] = rect[begin] - offset[i];
        dist[i] = scrollOffset + distance[i];
        max[i] = scrollLength - rect2[side];

        if (dist[i] > max[i]) {
          distance[i] -= dist[i] - max[i];
          dist[i] = max[i];
          offset[i] += dist[i] - max[i];
        }
      });

      return {
        dist: dist,
        offset: offset,
        start: start,
        distance: distance,
        max: max,
        element: element
      };
    }
  }, {
    key: "getOffsetRect",
    value: function getOffsetRect(rect, rect2) {
      var threshold = {
        width: this.options.threshold * rect.width,
        height: this.options.threshold * rect.height
      };

      var offset = {
        top: this.options.offset.top + threshold.height,
        right: this.options.offset.right + threshold.width,
        bottom: this.options.offset.bottom + threshold.height,
        left: this.options.offset.left + threshold.width
      };

      var rst = Object.assign({}, rect2);
      for (var k in offset) {
        rst[k] += offset[k];
      }
      return rst;
    }
  }, {
    key: "sortBy",
    value: function sortBy(arr) {
      var _this7 = this;

      var proportion = this.options.proportion;

      return arr.sort(function (a, b) {
        var x = _this7.isHozi,
            y = _this7.isEnd;

        var getDir = function getDir(o) {
          var dir = !y ? _this7[axis.length[x]] - o[axis.start[x]] : o[axis.end[x]];

          return dir / _this7[axis.length[x]];
        };

        var getWight = function getWight(o) {
          var select = o.element === _this7.select ? proportion.select : 0;

          return getDir(o) * proportion.dir + o.size / _this7.vs * proportion.size + o.size / o.rawSize * proportion.ratio + select;
        };

        if (getWight(a) > getWight(b)) {
          return -1;
        }
        return 1;
      });
    }
  }, {
    key: "inView",
    value: function inView(element) {
      var parent = void 0,
          rect = element.getBoundingClientRect(),
          rect2 = void 0,
          self = this;

      this.getParentItera(function (el, parent) {
        if (!parent) {
          rect2 = self.getOffsetRect(rect, self.vp);
          rect = (0, _utils.getOffset)(rect, rect2);
          return false;
        }

        rect2 = parent.getBoundingClientRect();
        rect = (0, _utils.getOffset)(rect, rect2);

        return rect !== 0;
      }, element);

      if (rect) {
        var raw = element.getBoundingClientRect();
        rect.rawSize = raw.width * raw.height;
        rect.size = rect.width * rect.height;
        rect.element = element;
      }

      return rect;
    }
  }]);

  return watcher;
}(_emit3.default);

watcher.setInterval = function (iv) {
  group.interval = iv;
};

exports.default = function (selector, options) {
  return new watcher(selector, options);
};

module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var emit = function () {
  function emit() {
    _classCallCheck(this, emit);

    this._events = {};
  }

  _createClass(emit, [{
    key: "on",
    value: function on(type, callback) {
      if (!this._events[type]) {
        this._events[type] = [];
      }

      this._events[type].push(callback);
      return this;
    }
  }, {
    key: "one",
    value: function one(type, callback) {
      if (!this._events[type]) {
        this._events[type] = [];
      }

      var self = this;
      var once = function once() {
        var argus = [].slice.call(arguments);

        if (callback.apply(self, argus) === true) {
          self.remove(type, once);
        }
      };
      this.on(type, once);
      return this;
    }
  }, {
    key: "emit",
    value: function emit(type) {
      var _this = this;

      var types = type.split(" "),
          argus = [].slice.call(arguments, 1);

      types.forEach(function (type) {
        if (!_this._events[type]) {
          return;
        }

        _this._events[type].forEach(function (callback) {
          callback.apply(_this, argus);
        });
      });
    }
  }, {
    key: "remove",
    value: function remove(type, callback) {
      var _this2 = this;

      if (!this._events[type]) {
        return;
      }

      this._events[type].forEach(function (cb, i) {
        if (callback === cb) {
          _this2._events[type].splice(i, 1);
          return false;
        }
      });
    }
  }]);

  return emit;
}();

exports.default = emit;
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var RAF = exports.RAF = window.requestAnimationFrame || function (fn) {
  setTimeout(fn, 1000 / 60);
};

var tween = exports.tween = {
  linear: function linear(t, b, c, d) {
    return t / d * c + b;
  },


  quad: {
    easeIn: function easeIn(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function easeOut(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function easeInOut(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * (--t * (t - 2) - 1) + b;
    }
  }
};

var getScrollParent = exports.getScrollParent = function () {
  var regex = /(auto|scroll)/;
  var scroll = ["overflow", "overflow-x", "overflow-y"];

  var style = void 0,
      parent = void 0;

  return function getParent(node) {
    try {
      style = getComputedStyle(parent = node.parentNode, null);
    } catch (e) {
      return null;
    }

    if (scroll.some(function (item) {
      return regex.test(style.getPropertyValue(item));
    })) {
      return parent;
    }

    return getParent(parent);
  };
}();

var getOffset = exports.getOffset = function getOffset(rect, rect2) {
  var width = Math.min(rect.right, rect2.right) - Math.max(rect.left, rect2.left);
  var height = Math.min(rect.bottom, rect2.bottom) - Math.max(rect.top, rect2.top);

  return width > 0 && height > 0 ? (rect.width = width, rect.height = height, rect) : 0;
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=watcher.js.map