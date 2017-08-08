(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.UForm = factory());
}(this, (function () { 'use strict';

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

// polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// using the polyfill specifically to avoid the call to `Object.defineProperty` for performance reasons
function fastFilter(fun/*, thisArg*/) {
	'use strict';

	if (this === void 0 || this === null) {
		throw new TypeError();
	}

	var t = Object(this);
	var len = t.length >>> 0;
	if (typeof fun !== 'function') {
		throw new TypeError();
	}

	var res = [];
	var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
	for (var i = 0; i < len; i++) {
		if (i in t) {
			var val = t[i];

			// NOTE: Technically this should Object.defineProperty at
			//       the next index, as push can be affected by
			//       properties on Object.prototype and Array.prototype.
			//       But that method's new, and collisions should be
			//       rare, so use the more-compatible alternative.
			if (fun.call(thisArg, val, i, t)) {
				res.push(val);
			}
		}
	}

	return res;
}

function Tapable() {
	this._plugins = {};
}
var Tapable_1 = Tapable;

function copyProperties(from, to) {
	for(var key in from)
		to[key] = from[key];
	return to;
}

Tapable.mixin = function mixinTapable(pt) {
	copyProperties(Tapable.prototype, pt);
};

Tapable.prototype.applyPlugins = function applyPlugins(name) {
	if(!this._plugins[name]) return;
	var args = Array.prototype.slice.call(arguments, 1);
	var plugins = this._plugins[name];
	for(var i = 0; i < plugins.length; i++)
		plugins[i].apply(this, args);
};

Tapable.prototype.applyPlugins0 = function applyPlugins0(name) {
	var plugins = this._plugins[name];
	if(!plugins) return;
	for(var i = 0; i < plugins.length; i++)
		plugins[i].call(this);
};

Tapable.prototype.applyPlugins1 = function applyPlugins1(name, param) {
	var plugins = this._plugins[name];
	if(!plugins) return;
	for(var i = 0; i < plugins.length; i++)
		plugins[i].call(this, param);
};

Tapable.prototype.applyPlugins2 = function applyPlugins2(name, param1, param2) {
	var plugins = this._plugins[name];
	if(!plugins) return;
	for(var i = 0; i < plugins.length; i++)
		plugins[i].call(this, param1, param2);
};

Tapable.prototype.applyPluginsWaterfall = function applyPluginsWaterfall(name, init) {
	if(!this._plugins[name]) return init;
	var args = Array.prototype.slice.call(arguments, 1);
	var plugins = this._plugins[name];
	var current = init;
	for(var i = 0; i < plugins.length; i++) {
		args[0] = current;
		current = plugins[i].apply(this, args);
	}
	return current;
};

Tapable.prototype.applyPluginsWaterfall0 = function applyPluginsWaterfall0(name, init) {
	var plugins = this._plugins[name];
	if(!plugins) return init;
	var current = init;
	for(var i = 0; i < plugins.length; i++)
		current = plugins[i].call(this, current);
	return current;
};

Tapable.prototype.applyPluginsWaterfall1 = function applyPluginsWaterfall1(name, init, param) {
	var plugins = this._plugins[name];
	if(!plugins) return init;
	var current = init;
	for(var i = 0; i < plugins.length; i++)
		current = plugins[i].call(this, current, param);
	return current;
};

Tapable.prototype.applyPluginsWaterfall2 = function applyPluginsWaterfall2(name, init, param1, param2) {
	var plugins = this._plugins[name];
	if(!plugins) return init;
	var current = init;
	for(var i = 0; i < plugins.length; i++)
		current = plugins[i].call(this, current, param1, param2);
	return current;
};

Tapable.prototype.applyPluginsBailResult = function applyPluginsBailResult(name) {
	if(!this._plugins[name]) return;
	var args = Array.prototype.slice.call(arguments, 1);
	var plugins = this._plugins[name];
	for(var i = 0; i < plugins.length; i++) {
		var result = plugins[i].apply(this, args);
		if(typeof result !== "undefined") {
			return result;
		}
	}
};

Tapable.prototype.applyPluginsBailResult1 = function applyPluginsBailResult1(name, param) {
	if(!this._plugins[name]) return;
	var plugins = this._plugins[name];
	for(var i = 0; i < plugins.length; i++) {
		var result = plugins[i].call(this, param);
		if(typeof result !== "undefined") {
			return result;
		}
	}
};

Tapable.prototype.applyPluginsBailResult2 = function applyPluginsBailResult2(name, param1, param2) {
	if(!this._plugins[name]) return;
	var plugins = this._plugins[name];
	for(var i = 0; i < plugins.length; i++) {
		var result = plugins[i].call(this, param1, param2);
		if(typeof result !== "undefined") {
			return result;
		}
	}
};

Tapable.prototype.applyPluginsBailResult3 = function applyPluginsBailResult3(name, param1, param2, param3) {
	if(!this._plugins[name]) return;
	var plugins = this._plugins[name];
	for(var i = 0; i < plugins.length; i++) {
		var result = plugins[i].call(this, param1, param2, param3);
		if(typeof result !== "undefined") {
			return result;
		}
	}
};

Tapable.prototype.applyPluginsBailResult4 = function applyPluginsBailResult4(name, param1, param2, param3, param4) {
	if(!this._plugins[name]) return;
	var plugins = this._plugins[name];
	for(var i = 0; i < plugins.length; i++) {
		var result = plugins[i].call(this, param1, param2, param3, param4);
		if(typeof result !== "undefined") {
			return result;
		}
	}
};

Tapable.prototype.applyPluginsBailResult5 = function applyPluginsBailResult5(name, param1, param2, param3, param4, param5) {
	if(!this._plugins[name]) return;
	var plugins = this._plugins[name];
	for(var i = 0; i < plugins.length; i++) {
		var result = plugins[i].call(this, param1, param2, param3, param4, param5);
		if(typeof result !== "undefined") {
			return result;
		}
	}
};

Tapable.prototype.applyPluginsAsyncSeries = Tapable.prototype.applyPluginsAsync = function applyPluginsAsyncSeries(name) {
	var args = Array.prototype.slice.call(arguments, 1);
	var callback = args.pop();
	var plugins = this._plugins[name];
	if(!plugins || plugins.length === 0) return callback();
	var i = 0;
	var _this = this;
	args.push(copyProperties(callback, function next(err) {
		if(err) return callback(err);
		i++;
		if(i >= plugins.length) {
			return callback();
		}
		plugins[i].apply(_this, args);
	}));
	plugins[0].apply(this, args);
};

Tapable.prototype.applyPluginsAsyncSeries1 = function applyPluginsAsyncSeries1(name, param, callback) {
	var plugins = this._plugins[name];
	if(!plugins || plugins.length === 0) return callback();
	var i = 0;
	var _this = this;
	var innerCallback = copyProperties(callback, function next(err) {
		if(err) return callback(err);
		i++;
		if(i >= plugins.length) {
			return callback();
		}
		plugins[i].call(_this, param, innerCallback);
	});
	plugins[0].call(this, param, innerCallback);
};

Tapable.prototype.applyPluginsAsyncSeriesBailResult = function applyPluginsAsyncSeriesBailResult(name) {
	var args = Array.prototype.slice.call(arguments, 1);
	var callback = args.pop();
	if(!this._plugins[name] || this._plugins[name].length === 0) return callback();
	var plugins = this._plugins[name];
	var i = 0;
	var _this = this;
	args.push(copyProperties(callback, function next() {
		if(arguments.length > 0) return callback.apply(null, arguments);
		i++;
		if(i >= plugins.length) {
			return callback();
		}
		plugins[i].apply(_this, args);
	}));
	plugins[0].apply(this, args);
};

Tapable.prototype.applyPluginsAsyncSeriesBailResult1 = function applyPluginsAsyncSeriesBailResult1(name, param, callback) {
	var plugins = this._plugins[name];
	if(!plugins || plugins.length === 0) return callback();
	var i = 0;
	var _this = this;
	var innerCallback = copyProperties(callback, function next(err, result) {
		if(arguments.length > 0) return callback(err, result);
		i++;
		if(i >= plugins.length) {
			return callback();
		}
		plugins[i].call(_this, param, innerCallback);
	});
	plugins[0].call(this, param, innerCallback);
};

Tapable.prototype.applyPluginsAsyncWaterfall = function applyPluginsAsyncWaterfall(name, init, callback) {
	if(!this._plugins[name] || this._plugins[name].length === 0) return callback(null, init);
	var plugins = this._plugins[name];
	var i = 0;
	var _this = this;
	var next = copyProperties(callback, function(err, value) {
		if(err) return callback(err);
		i++;
		if(i >= plugins.length) {
			return callback(null, value);
		}
		plugins[i].call(_this, value, next);
	});
	plugins[0].call(this, init, next);
};

Tapable.prototype.applyPluginsParallel = function applyPluginsParallel(name) {
	var args = Array.prototype.slice.call(arguments, 1);
	var callback = args.pop();
	if(!this._plugins[name] || this._plugins[name].length === 0) return callback();
	var plugins = this._plugins[name];
	var remaining = plugins.length;
	args.push(copyProperties(callback, function(err) {
		if(remaining < 0) return; // ignore
		if(err) {
			remaining = -1;
			return callback(err);
		}
		remaining--;
		if(remaining === 0) {
			return callback();
		}
	}));
	for(var i = 0; i < plugins.length; i++) {
		plugins[i].apply(this, args);
		if(remaining < 0) return;
	}
};

Tapable.prototype.applyPluginsParallelBailResult = function applyPluginsParallelBailResult(name) {
	var args = Array.prototype.slice.call(arguments, 1);
	var callback = args[args.length - 1];
	if(!this._plugins[name] || this._plugins[name].length === 0) return callback();
	var plugins = this._plugins[name];
	var currentPos = plugins.length;
	var currentResult;
	var done = [];
	for(var i = 0; i < plugins.length; i++) {
		args[args.length - 1] = (function(i) {
			return copyProperties(callback, function() {
				if(i >= currentPos) return; // ignore
				done.push(i);
				if(arguments.length > 0) {
					currentPos = i + 1;
					done = fastFilter.call(done, function(item) {
						return item <= i;
					});
					currentResult = Array.prototype.slice.call(arguments);
				}
				if(done.length === currentPos) {
					callback.apply(null, currentResult);
					currentPos = 0;
				}
			});
		}(i));
		plugins[i].apply(this, args);
	}
};

Tapable.prototype.applyPluginsParallelBailResult1 = function applyPluginsParallelBailResult1(name, param, callback) {
	var plugins = this._plugins[name];
	if(!plugins || plugins.length === 0) return callback();
	var currentPos = plugins.length;
	var currentResult;
	var done = [];
	for(var i = 0; i < plugins.length; i++) {
		var innerCallback = (function(i) {
			return copyProperties(callback, function() {
				if(i >= currentPos) return; // ignore
				done.push(i);
				if(arguments.length > 0) {
					currentPos = i + 1;
					done = fastFilter.call(done, function(item) {
						return item <= i;
					});
					currentResult = Array.prototype.slice.call(arguments);
				}
				if(done.length === currentPos) {
					callback.apply(null, currentResult);
					currentPos = 0;
				}
			});
		}(i));
		plugins[i].call(this, param, innerCallback);
	}
};

Tapable.prototype.hasPlugins = function hasPlugins(name) {
	var plugins = this._plugins[name];
	return plugins && plugins.length > 0;
};


Tapable.prototype.plugin = function plugin(name, fn) {
	if(Array.isArray(name)) {
		name.forEach(function(name) {
			this.plugin(name, fn);
		}, this);
		return;
	}
	if(!this._plugins[name]) this._plugins[name] = [fn];
	else this._plugins[name].push(fn);
};

Tapable.prototype.apply = function apply() {
	for(var i = 0; i < arguments.length; i++) {
		arguments[i].apply(this);
	}
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * @interface IForm
 * interface of all basic forms
 */
var IForm = function (_Tapable) {
    inherits(IForm, _Tapable);

    function IForm() {
        classCallCheck(this, IForm);
        return possibleConstructorReturn(this, (IForm.__proto__ || Object.getPrototypeOf(IForm)).apply(this, arguments));
    }

    createClass(IForm, [{
        key: 'init',

        // constructor () {
        //     super()
        // }

        value: function init() {}
    }, {
        key: 'setValue',
        value: function setValue(val) {}
    }, {
        key: 'getValue',
        value: function getValue() {}
    }, {
        key: 'validate',
        value: function validate() {}
    }, {
        key: 'render',
        value: function render() {}
    }, {
        key: 'reset',
        value: function reset() {}
    }, {
        key: 'destroy',
        value: function destroy() {}
    }]);
    return IForm;
}(Tapable_1);

/**
 * basic class of all form controls
 */
var FormControl = function (_IForm) {
    inherits(FormControl, _IForm);

    function FormControl(schema) {
        classCallCheck(this, FormControl);

        var _this = possibleConstructorReturn(this, (FormControl.__proto__ || Object.getPrototypeOf(FormControl)).call(this));

        if (!schema) {
            throw Error('need schema info to create a form control');
        }

        _this.schema = schema;

        _this.type = schema.type;
        _this.name = schema.name;
        _this.label = schema.label || '';
        _this.elem = null;
        return _this;
    }

    createClass(FormControl, [{
        key: 'getType',
        value: function getType() {
            return this.type;
        }
    }, {
        key: 'getName',
        value: function getName() {
            return this.name;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.value;
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.value = value;
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            return this.elem;
        }
    }, {
        key: 'setElement',
        value: function setElement(elem) {
            this.elem = elem;
        }
    }, {
        key: 'getSchema',
        value: function getSchema() {
            return this.schema;
        }
    }]);
    return FormControl;
}(IForm);

/**
 * Register all control types
 */
var ControlRegister = function () {
    function ControlRegister() {
        classCallCheck(this, ControlRegister);

        this.controlTypes = {};
    }

    createClass(ControlRegister, [{
        key: 'register',
        value: function register(type, control) {
            if (!type) {
                console.error('register control type failed: no params');
                return;
            }

            if (Object.getPrototypeOf(control).name !== FormControl.name) {
                console.error('register control type failed: control should be inherited of FormControl');
                return;
            }

            var types = this.controlTypes;
            if (types[type]) {
                console.warn('type ' + type + ' already registered');
                return;
            }

            types[type] = control;
        }
    }, {
        key: 'getControl',
        value: function getControl(type) {
            return this.controlTypes[type] || null;
        }
    }]);
    return ControlRegister;
}();

/**
 * prepare form schema
 */

var SchemaPlugin = function () {
    function SchemaPlugin() {
        classCallCheck(this, SchemaPlugin);
    }

    createClass(SchemaPlugin, [{
        key: 'apply',
        value: function apply(form) {
            form.plugin('schema', function (schema, next) {
                if (!schema) {
                    return next({ msg: 'no schema defined' });
                }

                var schemaType = typeof schema === 'undefined' ? 'undefined' : _typeof(schema);
                if (schemaType === 'object') {
                    return next(null, schema);
                } else if (schemaType === 'string') {
                    setTimeout(function () {
                        return next(null, { async: schema });
                    }, 1000);
                }
            });
        }
    }]);
    return SchemaPlugin;
}();

/**
 * render form controls
 */

var RenderPlugin = function () {
    function RenderPlugin() {
        classCallCheck(this, RenderPlugin);
    }

    createClass(RenderPlugin, [{
        key: 'apply',
        value: function apply(form) {
            form.plugin('before-render-form', function (options) {
                form.container.innerHtml = ''; // clear
            });
        }
    }]);
    return RenderPlugin;
}();

/**
 * basic class of all kinds of forms
 */
// import UiPlugin from '../plugins/UiPlugin'
var BasicForm = function (_IForm) {
    inherits(BasicForm, _IForm);

    function BasicForm(container, options) {
        classCallCheck(this, BasicForm);

        var _this = possibleConstructorReturn(this, (BasicForm.__proto__ || Object.getPrototypeOf(BasicForm)).call(this));

        if (!container) {
            throw new Error('Form should be created within a container !');
        }

        if (!options) {
            throw new Error('no options specified !');
        }

        // this.schemas = null

        // all controls
        _this.controls = [];

        if (typeof container === 'string') {
            // 直接传入选择器或 dom 对象
            container = document.querySelector(container);
        }

        _this.container = container;
        _this.options = options;

        _this.init();
        return _this;
    }

    /**
     * register default plugins and initialize
     */


    createClass(BasicForm, [{
        key: 'init',
        value: function init() {
            this.controlReg = new ControlRegister();

            // register plugins
            var uiLibPlugin = BasicForm.UiLib;
            this.apply(new uiLibPlugin(), new SchemaPlugin(), new RenderPlugin());

            /** register control types */
            var controlReg = this.controlReg;
            this.applyPlugins('register-controls', function (type, control) {
                controlReg.register(type, control);
            });

            /** create and render form view - without data bind */
            this.create();
        }

        /**
         * prepare form schema and start render
         */

    }, {
        key: 'create',
        value: function create() {
            var self = this;

            self.applyPlugins('before-create', self);

            self.applyPluginsAsyncWaterfall('schema', self.options.schema, function (err, value) {
                if (err) {
                    console.error('get schema failed ', err);
                    return;
                }

                self.applyPlugins('schema-loaded', value);

                if (value && value.length > 0) {
                    // build from schema list
                    self.buildControls(value);
                    self.render();
                }
            });
        }

        /**
         * build controls list from schema
         */

    }, {
        key: 'buildControls',
        value: function buildControls(schemaList) {
            var _this2 = this;

            var controlReg = this.controlReg;

            schemaList.forEach(function (schema) {
                var type = schema.type;
                var controlCls = controlReg.getControl(type);

                if (!controlCls) {
                    console.error('');
                } else {
                    _this2.addControl(new controlCls(schema));
                }
            });
        }
    }, {
        key: 'addControl',
        value: function addControl(control) {
            this.controls.push(control);
        }

        /**
         * render form controls
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var container = this.container,
                controls = this.controls;

            this.applyPlugins('before-render-form', container);
            var formBody = this.applyPluginsWaterfall('form-wrapper', document.createElement('form'));

            controls.forEach(function (control) {
                var controlPanel = _this3.applyPluginsWaterfall('before-render-control', null, control) || document.createElement('div');
                formBody.appendChild(controlPanel);
                // this.applyPlugins('render-control', control, controlPanel)
                control.render(controlPanel);
                _this3.applyPlugins('after-render-control', formBody, control);
            });

            container.appendChild(formBody);
            this.applyPlugins('after-render-form', container);
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.controls.forEach(function (control) {
                control.setValue(value[control.getName()]);
            });
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            this.controls.map(function (control) {
                var value = control.getValue();
                var name = control.getName();

                var typeVal = typeof value === 'undefined' ? 'undefined' : _typeof(value);
                value = value || '';

                if (typeVal === 'function') {
                    return { name: name, value: value.call(control) };
                } else {
                    return { name: name, value: value };
                }
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.applyPlugins('before-destroy');

            this.controls.map(function (control) {
                control.destroy();
            });

            this.controls = [];
            this.container = null;

            this.applyPlugins('after-destroy');
        }
    }]);
    return BasicForm;
}(IForm);

/**
 * basic class of all form controls
 */
var FormControl$2 = function (_IForm) {
    inherits(FormControl, _IForm);

    function FormControl(schema) {
        classCallCheck(this, FormControl);

        var _this = possibleConstructorReturn(this, (FormControl.__proto__ || Object.getPrototypeOf(FormControl)).call(this));

        if (!schema) {
            throw Error('need schema info to create a form control');
        }

        _this.schema = schema;

        _this.type = schema.type;
        _this.name = schema.name;
        _this.label = schema.label || '';
        _this.elem = null;
        return _this;
    }

    createClass(FormControl, [{
        key: 'getType',
        value: function getType() {
            return this.type;
        }
    }, {
        key: 'getName',
        value: function getName() {
            return this.name;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.value;
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.value = value;
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            return this.elem;
        }
    }, {
        key: 'setElement',
        value: function setElement(elem) {
            this.elem = elem;
        }
    }, {
        key: 'getSchema',
        value: function getSchema() {
            return this.schema;
        }
    }]);
    return FormControl;
}(IForm);

var Input = function (_FormControl) {
    inherits(Input, _FormControl);

    function Input(schema) {
        classCallCheck(this, Input);

        var _this = possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, schema));

        _this.placeholder = schema.placeholder || '';
        return _this;
    }

    createClass(Input, [{
        key: 'render',
        value: function render(panel) {
            var label = document.createElement('label');
            label.innerText = this.label;

            var dom = document.createElement('input');
            dom.className = 'form-control';
            dom.placeholder = this.placeholder;

            panel.dataset['name'] = this.name;
            panel.appendChild(label);
            panel.appendChild(dom);
        }
    }]);
    return Input;
}(FormControl$2);

Input.type = 'input';

var CONTROLS = defineProperty({}, Input.type, Input);

/**
 * render form controls
 */
var UiPlugin = function () {
    function UiPlugin() {
        classCallCheck(this, UiPlugin);
    }

    createClass(UiPlugin, [{
        key: 'apply',
        value: function apply(form) {
            form.plugin('register-controls', function (register) {
                for (var type in CONTROLS) {
                    register(type, CONTROLS[type]);
                }
            });

            form.plugin('before-render-control', function () {
                var panel = document.createElement('div');
                panel.className = 'form-group';
                return panel;
            });
        }
    }]);
    return UiPlugin;
}();

BasicForm.UiLib = UiPlugin;
BasicForm.Control = FormControl;

return BasicForm;

})));
