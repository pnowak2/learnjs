describe('Chapter 6', function() {

	it('should inherit with classical pattern #1', function() {
		function Parent (name) {
			this.name = name || 'Valor';
		}

		Parent.prototype.say = function () {
			return this.name;
		}

		function Child (name) {
		}

		var inherit = function(C, P) {
			C.prototype = new P();
		}

		inherit(Child, Parent);

		var child = new Child('baby');

		expect(child.say).toBeDefined();
		expect(child.say()).toBe('Valor');

		child.name = 'Peter';

		expect(child.say()).toBe('Peter');

		delete child.name;

		expect(child.say()).toBe('Valor');
	});

	it('should inherit with classical pattern #2 Rent-a-Constructor', function() {
		function Parent (name) {
			this.name = name || 'Valor';
		}

		Parent.prototype.say = function () {
			return this.name;
		}

		function Child (name) {
			Parent.apply(this, arguments);
		}

		var child = new Child('baby');

		expect(child.say).not.toBeDefined();
		expect(child.name).toBe('baby');
	});

	it('should inherit with classical pattern #3 Rent and Set Prototype', function() {
		function Parent (name) {
			this.name = name || 'Valor';
		}

		Parent.prototype.say = function () {
			return this.name;
		}

		function Child (name) {
			Parent.apply(this, arguments);
		}

		Child.prototype = new Parent();

		var child = new Child('baby');

		expect(child.say).toBeDefined();
		expect(child.name).toBe('baby');
		expect(child.say()).toBe('baby');
	});

	it('should inherit with classical pattern #4 Share the Prototype', function() {
		function Parent (name) {
			this.name = name || 'Valor';
		}

		Parent.prototype.say = function () {
			return this.name;
		}

		function Child (name) {
		}

		function GrandChild(name) {
		}

		var inherit = function (C, P) {
			C.prototype = P.prototype;
		}

		inherit(Child, Parent);
		inherit(GrandChild, Child);

		var child = new Child('baby');
		var grandChild = new GrandChild('grandbaby');

		expect(child.say).toBeDefined();
		expect(grandChild.say).toBeDefined();
		expect(child.name).not.toBeDefined();
		expect(grandChild.name).not.toBeDefined();
	});

	it('should inherit with classical pattern #5 A Temporary Constructor', function() {
		function Parent (name) {
			this.name = name || 'Valor';
		}

		Parent.prototype.say = function () {
			return this.name;
		}

		function Child (name) {
			this.say = function () {
				Child.uber.say();
			}
		}

		var inherit = function(C, P) {
			var F = function () {}
			F.prototype = P.prototype;
			C.prototype = new F();
			C.prototype.constructor = C;
			C.uber = P.prototype;
		}

		inherit(Child, Parent);

		var child = new Child('baby');

		expect(child.name).not.toBeDefined();
		expect(child.say).toBeDefined();
		expect(child.say()).not.toBeDefined();
	});

	it('should have Backbone like inheritance with Base class', function() {

		var global = {};

		(function (obj) {
			var extend = function(options) {
				var Parent = this, // Base in first step
						Child, 
						Surrogate = function () {};

				// creating child constructor on fly
				Child = function () {
					Parent.apply(this, arguments); // invoke parent constructor
					Child.extend = extend; // allow children to be also extensible
				}

				// classic inheritance pattern
				Surrogate.prototype = Base.prototype;
				Child.prototype = new Surrogate();
				Child.prototype.constructor = Child;
				Child.uber = Parent.prototype;

				// copy properties from extend to child prototype
				for(attr in options) {
					Child.prototype[attr] = options[attr];
				}

				return Child;
			}

			// After creating new object in the Parent.apply, see^, 
			// we copy the options passed to constructor directly to the object
			// to allow local overrides
			var Base = function (options) {
				for(attr in options) {
					this[attr] = options[attr];
				}
			}

			// Default methods in Base.prototype visible to any descendants
			Base.prototype = (function () {
				return {
					say: function () {
						return "base-";
					}
				}
			})()

			Base.extend = extend;
			obj.Base = Base;
		})(global);

		expect(global.extend).toBeUndefined();
		expect(global.Base).toEqual(jasmine.any(Function));
		expect(global.Base.extend).toEqual(jasmine.any(Function));

		var Manager = global.Base.extend({
					name: 'default',
					say: function () {
						return Manager.uber.say.call(this) + 'manager says'
					}
				}),
				john = new Manager({
					name: 'johnny'
				});

		expect(Manager.extend).toEqual(jasmine.any(Function));
		expect(Manager).toEqual(jasmine.any(Function));
		expect(john instanceof Manager).toBe(true);
		expect(john.say).toEqual(jasmine.any(Function));
		expect(john.say()).toEqual('base-manager says');

		// name property override
		expect(john.name).toBe('johnny');
		expect(john.hasOwnProperty('name')).toBe(true);
		expect(Manager.prototype.hasOwnProperty('name')).toBe(true);
		expect(Manager.prototype.name).toBe('default');

		var Boss = Manager.extend({
					name: 'bossy'
				}),
				steve = new Boss({
					name: 'stevie'
				});

		expect(Boss).toEqual(jasmine.any(Function));
		expect(steve instanceof Boss).toBe(true);
		expect(steve.say).toEqual(jasmine.any(Function));
		expect(steve.name).toBe('stevie');

	});

	it('should inherit with klass classical inheritance', function() {

		var klass = function (Parent, props) {

			var Child = function () {
				if(Child.uber && Child.uber.hasOwnProperty('__construct')) {
					Child.uber.__construct.apply(this, arguments);
				}
				if(Child.prototype.hasOwnProperty('__construct')) {
					Child.prototype.__construct.apply(this, arguments);
				}
			}

			Parent = Parent || Object;

			var F = function () {};
			F.prototype = Parent.prototype;
			Child.prototype = new F();
			Child.prototype.constructor = Child;
			Child.uber = Parent.prototype;

			for(prop in props) {
				if(props.hasOwnProperty(prop)) {
					Child.prototype[prop] = props[prop];
				}
			}

			return Child;
		}

		var Man = klass(null, {
			__construct: function () {
			},
			name: 'parent',
			getName: function () {
				return this.name;
			}
		});

		var SuperMan = klass(Man, {
			__construct: function (name) {
				this.name = name;
			},
			getName: function () {
				return SuperMan.uber.getName() + ' ' + this.name;
			}
		});

		var superman = new SuperMan('super valor');
		expect(typeof Man).toBe('function');
		expect(superman).toBeDefined();
		expect(superman.getName).toBeDefined();
		expect(superman.name).toBe('super valor');
		expect(superman.getName()).toBe('parent super valor')
	});

	it('should do prototypal inheritance + extend', function() {
		var object = function (o, props) {
			var F = function () {}
			F.prototype = o;

			for(p in props) {
				if(props.hasOwnProperty(p)) {
					F.prototype[p] = props[p];
				}
			}

			return new F();
		}

		var Person = function (name) {
			this.name = name;
		}

		Person.prototype.getName = function () {
			return this.name;
		}

		var adam = new Person('adam'),
			nextAdam = object(adam, {
				say: function () {

				}
			});

		expect(nextAdam.getName).toBeDefined();
		expect(nextAdam.name).toBeDefined();
		expect(nextAdam.name).toBe('adam');
		expect(nextAdam.hasOwnProperty('name')).toBe(false);
		expect(nextAdam.say).toBeDefined();
		expect(nextAdam.hasOwnProperty('say')).toBe(false);
		expect(nextAdam.__proto__.hasOwnProperty('say')).toBe(true);
	});

	it('should do mixins', function() {

		var mix = function () {
			var obj,
				child = {};

			for (var i = 0; i < arguments.length; i++) {
				for(prop in arguments[i]) {
					if(arguments[i].hasOwnProperty(prop)) {
						child[prop] = arguments[i][prop];
					}
				}
			};

			return child;
		}

		var cake = mix(
			{
				eggs: 2,
				large: true
			},
			{
				butter: 1,
				salted: true
			}
		);

		expect(cake.eggs).toBe(2);
		expect(cake.large).toBe(true);
		expect(cake.butter).toBe(1);
		expect(cake.salted).toBe(true);
	});

	it('should bind method', function() {
		var bind = function (func, obj) {
			return function () {
				return func.apply(obj, [].slice.call(arguments));
			};
		}

		var obj = {
			surname: 'valor'
		}

		var callback = function () {
			return this.surname;
		}

		expect(callback.call(obj)).toBe('valor');
		expect(callback()).toBeUndefined();

		var boundCallback = bind(callback, obj);

		expect(boundCallback()).toBe('valor');
	});

	it('should Function prototype bind', function() {
	
		if(typeof Function.prototype.bind2 === 'undefined') {
			Function.prototype.bind2 = function (thisArg) {
				var fn = this,
					slice = Array.prototype.slice,
					args = slice.call(arguments, 1);

				return function () {
					return fn.call(thisArg, args.concat(slice.call(arguments)));
				}
			}
		}

		var obj = {
			testName: 'hello'
		}

		var func = function () {
			return this.testName;
		}

		expect(func()).toBeUndefined();
		
		var boundFunc = func.bind2(obj);

		expect(boundFunc()).toBe('hello');

	});
});
