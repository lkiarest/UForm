(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('handlebars')) :
	typeof define === 'function' && define.amd ? define(['handlebars'], factory) :
	(global.UForm = factory(global.Handlebars));
}(this, (function (Handlebars) { 'use strict';

Handlebars = 'default' in Handlebars ? Handlebars['default'] : Handlebars;

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







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
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
 * @interface IControl
 * interface of all forms and controls
 */
var IControl = function (_Tapable) {
    inherits(IControl, _Tapable);

    function IControl() {
        classCallCheck(this, IControl);
        return possibleConstructorReturn(this, (IControl.__proto__ || Object.getPrototypeOf(IControl)).apply(this, arguments));
    }

    createClass(IControl, [{
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
    return IControl;
}(Tapable_1);

/**
 * basic class of all form controls
 */
var FormControl = function (_IControl) {
    inherits(FormControl, _IControl);

    function FormControl(schema) {
        classCallCheck(this, FormControl);

        var _this = possibleConstructorReturn(this, (FormControl.__proto__ || Object.getPrototypeOf(FormControl)).call(this));

        if (!schema) {
            throw Error('need schema info to create a form control');
        }

        _this.schema = schema;

        _this.type = schema.$type;
        _this.name = schema.name;
        _this.label = schema.label || '';
        // this.disabled = schema.disabled || false
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
            throw new Error('user defined control should override getValue method');
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            throw new Error('user defined control should override setValue method');
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

        // get data to fill template

    }, {
        key: 'getData',
        value: function getData() {}

        // get render help function

    }, {
        key: 'getRenderer',
        value: function getRenderer() {}
    }, {
        key: 'destroy',
        value: function destroy() {
            this.elem && this.elem.remove();
            this.elem = null;
            this.schema = null;
        }
    }]);
    return FormControl;
}(IControl);

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

            if (FormControl.prototype.isPrototypeOf(control.prototype)) {
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
var controlReg = new ControlRegister();

var BasicForm = function (_IControl) {
    inherits(BasicForm, _IControl);

    function BasicForm(container, options) {
        classCallCheck(this, BasicForm);

        var _this = possibleConstructorReturn(this, (BasicForm.__proto__ || Object.getPrototypeOf(BasicForm)).call(this));

        if (!container) {
            throw new Error('form should be created within a container !');
        }

        if (!options) {
            throw new Error('no form options specified !');
        }

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
            // register default plugins
            this.apply(BasicForm.UiLibPlugin, new SchemaPlugin(), new RenderPlugin());

            // user defined plugins
            var plugins = this.options.plugins;
            if (plugins && plugins.length > 0) {
                this.apply.apply(this, plugins);
            }

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

            schemaList.forEach(function (schema) {
                var type = schema.$type;
                var controlCls = controlReg.getControl(type);

                if (!controlCls) {
                    console.error('no control type:' + type);
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
            this.applyPlugins('render', this);
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.applyPlugins('set-value', value);
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.applyPluginsWaterfall('get-value');
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
}(IControl);

/**
 * register control types
 * @param  {String|Array|Object} type    support register by an array, an object or by type/entity
 */


BasicForm.registerControl = function (type, control) {
    if (Array.isArray(type)) {
        // register controls as a list
        type.forEach(function (item) {
            item && BasicForm.registerControl(item.type, item.control);
        });

        return;
    } else if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
        BasicForm.registerControl(Object.keys(type).map(function (t) {
            return {
                type: t,
                control: type[t]
            };
        }));

        return;
    }

    controlReg.register(type, control);
};

BasicForm.Control = FormControl;

/**
 * for vue-based UI lib
 */

var VuePlugin = function () {
    function VuePlugin() {
        classCallCheck(this, VuePlugin);
    }

    createClass(VuePlugin, [{
        key: 'apply',
        value: function apply(form) {
            form.plugin('before-create', function () {
                this.vm = null;
                this.formDataName = 'form'; // default data model name
            });

            form.plugin('form-wrapper', function (wrapper) {
                wrapper.setAttribute('v-model', this.formDataName);
                return wrapper;
            });

            form.plugin('after-render-form', function (container, formBody) {
                // prepare events handler
                var methods = {};

                form.controls.forEach(function (control) {
                    var name = control.name;
                    var events = control.schema.$events;
                    var usedEvents = control.getData().events;

                    if (usedEvents && usedEvents.length > 0) {
                        usedEvents.forEach(function (ae) {
                            var methodName = name + ae;
                            if (!methods[methodName]) {
                                var callback = events[ae];
                                methods[methodName] = function () {
                                    return function () {
                                        var args = Array.prototype.slice.call(arguments);
                                        args = args.concat([control, form]);
                                        return callback.apply(this, args);
                                    };
                                }();
                            }
                        });
                    }
                });

                // new vue component
                var FormVm = Vue.extend({
                    template: formBody.outerHTML,
                    data: function data() {
                        return {
                            // controls
                            controls: form.controls.reduce(function (ret, item) {
                                var name = item.name;
                                ret[name] = item;

                                // inject context into all methods
                                Object.keys(item).forEach(function (key) {
                                    var value = item[key];
                                    if (typeof value === 'function') {
                                        item[key] = function () {
                                            return function () {
                                                var context = this;
                                                var args = [].slice.call(arguments);
                                                args = args.concat([form.vm, item, form.vm.form]);
                                                return value.apply(context, args);
                                            };
                                        }();
                                    }
                                });

                                return ret;
                            }, {}),
                            // init data model names
                            form: form.options.schema.reduce(function (ret, item) {
                                ret[item.name] = '';
                                return ret;
                            }, {})
                        };
                    },

                    methods: methods
                });

                this.vm = new FormVm().$mount(container);
            });

            form.plugin('set-value', function (value) {
                Object.assign(this.vm.form, value);
            });

            form.plugin('get-value', function () {
                return this.vm.form;
            });
        }
    }]);
    return VuePlugin;
}();

var UiPlugin = function () {
    function UiPlugin() {
        classCallCheck(this, UiPlugin);
    }

    createClass(UiPlugin, [{
        key: 'apply',
        value: function apply(form) {
            // first use VuePlugin
            form.apply(new VuePlugin());

            form.plugin('render', function () {
                var container = form.container;
                var controls = form.controls;

                form.applyPlugins('before-render-form', container);
                var formBody = form.applyPluginsWaterfall('form-wrapper', document.createElement('el-form'));

                controls.forEach(function (control) {
                    var controlPanel = form.applyPluginsWaterfall('before-render-control', null, control) || document.createElement('div');
                    formBody.appendChild(controlPanel);
                    form.applyPlugins('render-control', control, controlPanel);
                    form.applyPlugins('after-render-control', formBody, control);
                });

                form.applyPlugins('after-render-form', container, formBody);
            });

            form.plugin('before-render-control', function (rendered, control) {
                var panel = document.createElement('el-form-item');
                var label = control.label;

                if (label) {
                    var labelWidth = form.options.labelWidth || '100';
                    panel.setAttribute('label', label);
                    panel.setAttribute('label-width', labelWidth + 'px');
                }

                return panel;
            });

            form.plugin('render-control', function (control, panel) {
                panel.dataset['name'] = control.name;
                var renderer = control.getRenderer();

                if (renderer && typeof renderer === 'function') {
                    panel.innerHTML = renderer(control.getData());
                }

                control.setElement(panel);
            });
        }
    }]);
    return UiPlugin;
}();

/**
 * basic class of all form controls
 */
var FormControl$2 = function (_IControl) {
    inherits(FormControl, _IControl);

    function FormControl(schema) {
        classCallCheck(this, FormControl);

        var _this = possibleConstructorReturn(this, (FormControl.__proto__ || Object.getPrototypeOf(FormControl)).call(this));

        if (!schema) {
            throw Error('need schema info to create a form control');
        }

        _this.schema = schema;

        _this.type = schema.$type;
        _this.name = schema.name;
        _this.label = schema.label || '';
        // this.disabled = schema.disabled || false
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
            throw new Error('user defined control should override getValue method');
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            throw new Error('user defined control should override setValue method');
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

        // get data to fill template

    }, {
        key: 'getData',
        value: function getData() {}

        // get render help function

    }, {
        key: 'getRenderer',
        value: function getRenderer() {}
    }, {
        key: 'destroy',
        value: function destroy() {
            this.elem && this.elem.remove();
            this.elem = null;
            this.schema = null;
        }
    }]);
    return FormControl;
}(IControl);

/**
 * @class VueControl
 * @description basic class of all vue-based controls
 */
Handlebars.registerHelper('linecase', function (options) {
    var str = options.fn(this);
    return str.replace(/[A-Z]/g, function (m) {
        return '-' + m.toLowerCase();
    });
});

var VueControl = function (_FormControl) {
    inherits(VueControl, _FormControl);

    function VueControl() {
        classCallCheck(this, VueControl);
        return possibleConstructorReturn(this, (VueControl.__proto__ || Object.getPrototypeOf(VueControl)).apply(this, arguments));
    }

    createClass(VueControl, [{
        key: 'getData',
        value: function getData() {
            var _this2 = this;

            var props = this.allowedProps();
            var schema = this.schema;
            var name = this.name;

            var events = this.allowedEvents() || [];
            var $methods = this.schema.$events || {};

            events = events.filter(function (event) {
                return !!$methods[event];
            });

            if (!props) {
                console.warn('no props specified with control: ' + name);
                return { name: name, props: [] };
            }

            if (schema) {
                Object.keys(props).forEach(function (key) {
                    if (key in schema) {
                        props[key] = schema[key];
                    }
                });
            }

            return {
                name: name,
                props: Object.keys(props).filter(function (key) {
                    return props[key] !== null;
                }).map(function (key) {
                    var value = props[key];
                    _this2[key] = value;
                    return { key: key, value: value };
                }),
                events: events
            };
        }

        /**
         * define all allowed properties, to be override
         * @return {Object} properties name list
         */

    }, {
        key: 'allowedProps',
        value: function allowedProps() {
            return null;
        }

        /**
         * defined all events, to be override
         * @return {Array} events name list
         */

    }, {
        key: 'allowedEvents',
        value: function allowedEvents() {
            return null;
        }
    }]);
    return VueControl;
}(FormControl$2);

/**
 * make vue render function, process props
 */


VueControl.makeRenderer = function (tmpl) {
    tmpl = tmpl.replace('{{props}}', '\n        {{#each props}}\n        :{{#linecase}}{{key}}{{/linecase}}="controls.{{../name}}.{{key}}"\n        {{/each}}\n    ').replace('{{events}}', '\n        {{#each events}}\n        @{{#linecase}}{{this}}{{/linecase}}="{{../name}}{{this}}"\n        {{/each}}\n    ');

    return Handlebars.compile(tmpl);
};

var renderer = VueControl.makeRenderer('\n    <el-input v-model="form.{{name}}" {{props}} {{events}}></el-input>\n');

var Input = function (_VueControl) {
    inherits(Input, _VueControl);

    function Input() {
        classCallCheck(this, Input);
        return possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
    }

    createClass(Input, [{
        key: 'allowedProps',
        value: function allowedProps() {
            return {
                type: 'text',
                maxlength: null, // 可选属性设置为 null
                disabled: false,
                placeholder: null
            };
        }
    }, {
        key: 'allowedEvents',
        value: function allowedEvents() {
            return ['click', 'blur', 'focus', 'change'];
        }
    }, {
        key: 'getRenderer',
        value: function getRenderer() {
            return renderer;
        }
    }]);
    return Input;
}(VueControl);

Input.type = 'input';

var renderer$1 = VueControl.makeRenderer('\n    <el-checkbox-group v-model="form.{{name}}" {{props}} {{events}}>\n        {{#each options}}\n            <el-checkbox\n                label="{{name}}"\n                name="{{../name}}"\n                {{#if disabled}} :disabled=\'true\'{{/if}}\n            >\n            </el-checkbox>\n        {{/each}}\n    </el-checkbox-group>\n');

var Checkbox = function (_VueControl) {
    inherits(Checkbox, _VueControl);

    function Checkbox() {
        classCallCheck(this, Checkbox);
        return possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
    }

    createClass(Checkbox, [{
        key: 'getData',
        value: function getData() {
            // options is used within renderer, so need more data
            var data = get(Checkbox.prototype.__proto__ || Object.getPrototypeOf(Checkbox.prototype), 'getData', this).call(this);
            data.options = this.schema.options; // more data definition
            return data;
        }
    }, {
        key: 'getRenderer',
        value: function getRenderer() {
            return renderer$1;
        }
    }, {
        key: 'allowedEvents',
        value: function allowedEvents() {
            return ['change'];
        }
    }]);
    return Checkbox;
}(VueControl);

Checkbox.type = 'checkbox';

var renderer$2 = VueControl.makeRenderer('\n    <el-radio-group v-model="form.{{name}}" {{props}} {{events}}>\n        {{#each options}}\n            <el-radio\n                label="{{name}}"\n                name="{{../name}}"\n                {{#if disabled}} :disabled=\'true\'{{/if}}\n            >\n            </el-radio>\n        {{/each}}\n    </el-radio-group>\n');

var Radio = function (_VueControl) {
    inherits(Radio, _VueControl);

    function Radio() {
        classCallCheck(this, Radio);
        return possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
    }

    createClass(Radio, [{
        key: 'getData',
        value: function getData() {
            // options is used within renderer, so need more data
            var data = get(Radio.prototype.__proto__ || Object.getPrototypeOf(Radio.prototype), 'getData', this).call(this);
            data.options = this.schema.options; // more data definition
            return data;
        }
    }, {
        key: 'getRenderer',
        value: function getRenderer() {
            return renderer$2;
        }
    }, {
        key: 'allowedProps',
        value: function allowedProps() {
            return {
                size: null,
                fill: null,
                textColor: null
            };
        }
    }, {
        key: 'allowedEvents',
        value: function allowedEvents() {
            return ['change'];
        }
    }]);
    return Radio;
}(VueControl);

Radio.type = 'radio';

var renderer$3 = VueControl.makeRenderer('\n    <el-input type=\'textarea\' v-model="form.{{name}}"{{props}}></el-input>\n');

var Textarea = function (_VueControl) {
    inherits(Textarea, _VueControl);

    function Textarea() {
        classCallCheck(this, Textarea);
        return possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).apply(this, arguments));
    }

    createClass(Textarea, [{
        key: 'allowedProps',
        value: function allowedProps() {
            return {
                maxlength: null, // 可选属性设置为 null
                disabled: false,
                inputType: 'text',
                placeholder: null,
                rows: 3 // 行数
            };
        }
    }, {
        key: 'getRenderer',
        value: function getRenderer() {
            return renderer$3;
        }
    }, {
        key: 'allowedEvents',
        value: function allowedEvents() {
            return ['click', 'blur', 'focus', 'change'];
        }
    }]);
    return Textarea;
}(VueControl);

Textarea.type = 'textarea';

var renderer$4 = VueControl.makeRenderer('\n    <el-select v-model="form.{{name}}" {{props}} {{events}}>\n        <el-option\n            v-for="item in controls.{{name}}.options"\n            :key=\'item.value\'\n            :label="item.label"\n            :value="item.value"\n            :disabled="item.disabled">\n        </el-option>\n    </el-select>\n');

var Select = function (_VueControl) {
    inherits(Select, _VueControl);

    function Select(schema) {
        classCallCheck(this, Select);

        var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, schema));

        _this.options = schema.options;
        return _this;
    }

    createClass(Select, [{
        key: 'allowedProps',
        value: function allowedProps() {
            return {
                placeholder: '请选择',
                size: null,
                disabled: false,
                multiple: false, // 可多选
                filterable: false, // 可搜索
                remote: false, // 是否远程搜索
                remoteMethod: null, // 远程搜索方法
                loading: false,
                loadingText: '加载中',
                noMatchText: '无匹配数据',
                noDataText: '无数据'
            };
        }
    }, {
        key: 'allowedEvents',
        value: function allowedEvents() {
            return ['change', 'visibleChange'];
        }
    }, {
        key: 'getRenderer',
        value: function getRenderer() {
            return renderer$4;
        }
    }]);
    return Select;
}(VueControl);

Select.type = 'select';

/**
 * render form controls
 */
// all ui controls
var controls = [Input, Checkbox, Textarea, Select, Radio];

var ElementUI = {
    register: function register(UForm) {
        UForm.registerControl(controls.reduce(function (ret, control) {
            ret[control.type] = control;
            return ret;
        }, {}));

        UForm.UiLibPlugin = new UiPlugin();

        var extend = function extend(Vue) {
            Vue.component('uform', Vue.extend({
                data: function data() {
                    return {
                        form: null
                    };
                },
                template: '<div></div>',
                props: {
                    options: {
                        type: Object,
                        required: true
                    }
                },
                mounted: function mounted() {
                    this.form = new UForm(this.$el, this.options);
                },

                methods: {
                    setValue: function setValue(value) {
                        this.form.setValue(value);
                    },
                    getValue: function getValue() {
                        return this.form.getValue();
                    }
                }
            }));
        };

        // register [uform] as global component for convenience
        if (window.Vue) {
            extend(Vue);
        } else {
            UForm.install = function (Vue) {
                return extend(Vue);
            };
        }
    }
};

ElementUI.register(BasicForm);

return BasicForm;

})));
