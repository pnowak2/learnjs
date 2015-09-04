describe("Chapter 5", function () {
	it('should use namespace', function() {
		var MYAPP = {}
		MYAPP.Parent = function () {};
		MYAPP.Child = function () {};
		MYAPP.someVar = 2;
		MYAPP.modules = {}
		MYAPP.modules.module1 = {}

		expect(MYAPP.Parent).toBeDefined();
		expect(typeof MYAPP.Parent).toBe('function');
		expect(typeof MYAPP.Child).toBe('function');
		expect(typeof MYAPP.someVar).toBe('number');
		expect(typeof MYAPP.modules.module1).toBe('object');
	});

	it('should have namespace helper method', function() {
		var MYAPP = MYAPP || {};
		MYAPP.namespace = function (namespace) {
			var parts = namespace.split('.'),
				parent = MYAPP;

			if(parts[0] === 'MYAPP') {
				parts = parts.slice(1);
			}

			for(var i = 0; i < parts.length; i++) {
				if(typeof parent[parts[i]] === 'undefined') {
					parent[parts[i]] = {};
					parent = parent[parts[i]];
				}
			}

			return parent;
		}

		var module = MYAPP.namespace('MYAPP.modules.module1');

		expect(module).toEqual({});
		expect(MYAPP.modules.module1).toEqual({});
		
		module.property = 'prop';
		expect(module.property).toBe('prop');

	});

	it('should expose private members', function() {
		var Valor = function () {
			var privProperty = 'private';

			this.getProperty = function () {
				return privProperty;
			}
		}

		var v = new Valor();

		expect(v.getProperty()).toBe('private');
		expect(v.privProperty).not.toBeDefined();
	});

	it('should have object literal with internal private properties', function() {
		var myObj = (function () {
			var priv = 'private';

			return {
				getName: function () {
					return priv;
				}
			}
		})();

		expect(typeof myObj).toBe('object');
		expect(window.priv).not.toBeDefined();
		expect(myObj.getName()).toBe('private');
		expect(myObj.priv).not.toBeDefined();
	});

	it('should create prototype method with privacy', function() {
		var Gadget = function (name) {
			this.getName = function () {
				return name;
			}
		}

		Gadget.prototype = (function () {

			var browser = "Mobile Webkit";

			return {
				getBrowser: function () {
					return browser;
				}
			}
		})();

		var g = new Gadget('browser');

		expect(g.getName()).toBe('browser');
		expect(g.getBrowser()).toBe('Mobile Webkit');
	});

	it('should define a revealing private functions pattern', function() {
		var myArray = (function () {

			var isArray = function (a) {
				return Object.prototype.toString.call(a) === '[object Array]';
			}

			return {
				isArray: isArray
			}
		})();

		expect(myArray.isArray([1, 2, 3])).toBe(true);
	});

	it('should define module', function() {
		MYAPP.namespace('utilities.array');
		MYAPP.utilities.array = (function () {

			var arrayString = '[object Array]',
				toString = Object.prototype.toString;

			return {
				isArray: function (a) {
					return toString.call(a) === arrayString;
				}
			}
		})();

		expect(MYAPP.utilities.array).toBeDefined();
		expect(MYAPP.utilities.array.isArray).toBeDefined();
		expect(MYAPP.utilities.array.isArray([1,2,3])).toBe(true);
		expect(MYAPP.utilities.array.isArray({length: 5})).toBe(false);
	});

	it('should define revealing module pattern', function() {
		MYAPP.namespace('utilities.array');
		MYAPP.utilities.array = (function () {
			var arrayString = '[object Array]',
				toString = Object.prototype.toString,
				isArray = function (a) {
					return toString.call(a) === arrayString;
				};

			return {
				isArray: isArray
			}
		})();

		expect(MYAPP.utilities.array).toBeDefined();
		expect(MYAPP.utilities.array.isArray).toBeDefined();
		expect(MYAPP.utilities.array.isArray([1,2,3])).toBe(true);
		expect(MYAPP.utilities.array.isArray({length: 5})).toBe(false);
	});

	it('should define module that create constructor', function() {
		MYAPP.namespace('utilities.array');
		MYAPP.utilities.array = (function () {
			var Constr = function () { },
				arrayString = '[object Array]';

			Constr.prototype = {
				isArray: function (a) {
					return toString.call(a) === arrayString;
				}
			}

			return Constr;
		})();

		expect(typeof MYAPP.utilities.array).toBe('function');
		expect(new MYAPP.utilities.array()).toBeDefined();
		expect(new MYAPP.utilities.array().isArray).toBeDefined();
		expect(new MYAPP.utilities.array().isArray([1,2,3])).toBe(true);
	});

	it('should import globals to module', function() {
		MYAPP.namespace('utilities.array');
		MYAPP.utilities.array = (function (app, global) {
			expect(global).toBe(window);
			expect(app).toBe(MYAPP);
		})(MYAPP, window);
	});

	it('should define sandbox pattern', function() {

		var Sandbox = function () {
			var slice = Array.prototype.slice,
				args = slice.call(arguments),
				callback = args.pop(),
				modules = (args[0] && typeof args[0] === 'string') ? args : args[0];

			if(!(this instanceof Sandbox)) {
				return new Sandbox(modules, callback);
			}

			this.a = 1;
			this.b = 2;

			for (var i = 0; i < modules.length; i++) {
				var module = Sandbox.modules[modules[i]];
				if(module) {
					module(this);
				}
			};

			callback(this);
		}

		var domModuleSpy = jasmine.createSpy('domModule')

		Sandbox.modules = {};
		Sandbox.modules.dom = domModuleSpy;
		Sandbox.modules.ajax = function (box) {
			box.ajax = function () {
				return 'ajax call';
			}
		}

		var boxSpy = jasmine.createSpy('boxSpy'),
			box = Sandbox('dom', 'ajax', boxSpy);

		expect(boxSpy).toHaveBeenCalledWith(box);
		expect(box.a).toBe(1);
		expect(box.b).toBe(2);
		expect(domModuleSpy).toHaveBeenCalledWith(box);
		expect(box.ajax).toBeDefined();
		expect(box.ajax()).toBe('ajax call');
	});

	it('should define public static members', function() {
		var Gadget = function () {

		}

		Gadget.isShiny = function () {}
		Gadget.prototype.setPrice = function () {}

		expect(Gadget.isShiny).toBeDefined();
		expect(new Gadget().isShiny).not.toBeDefined();
		expect(Gadget.setPrice).not.toBeDefined();
		expect(new Gadget().setPrice).toBeDefined();
	});

	it('should define method() method', function() {

		if(typeof Function.prototype.method !== 'function')	{
			Function.prototype.method = function (name, func) {
				var Clazz = this;
				Clazz.prototype[name] = func;
				return this;
			}
		}

		Number.method('dbl', function () {
			return this * 2;
		});

		expect((5).dbl()).toBe(10);
	});
});
