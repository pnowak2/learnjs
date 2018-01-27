describe('ECMAScript 5', function() {
	it('Object.defineProperty', function() {
		var obj = {}

		Object.defineProperty(obj, 'prop', {
			value: 'my property',
			writable: false,
			configurable: false
		});

		expect(obj.prop).toBeDefined();
		expect(obj.prop).toBe('my property');

		obj.prop = 'test';
		expect(obj.prop).toBe('my property');

		delete obj.prop

		expect(obj.prop).toBeDefined();
	});

	it('Object.defineProperty with get/set. Here the writable and value must not be specified', function() {
		var obj = {},
				setSpy = jasmine.createSpy('setter'),
				getSpy = jasmine.createSpy('getter');

		Object.defineProperty(obj, 'name', {
			set: function (newValue) {
				value = newValue
				setSpy(newValue);
			},

			get: function () {
				getSpy(value)
				return value
			}
		});

		expect(setSpy).not.toHaveBeenCalled();
		obj.name = 'hello world';
		expect(setSpy).toHaveBeenCalledWith('hello world');

		expect(getSpy).not.toHaveBeenCalled();
		expect(obj.name).toBe('hello world')
		expect(getSpy).toHaveBeenCalledWith('hello world');
	});

	it('Object.defineProperties', function() {
		var obj = {}

		Object.defineProperties(obj, {
			'prop': {
				value: 'my property',
				writable: false,
				configurable: false
			},
			'other': {
				value: 'other property',
				writable: true,
				configurable: true
			}
		});

		expect(obj.prop).toBeDefined();
		expect(obj.prop).toBe('my property');

		expect(obj.other).toBeDefined();
		expect(obj.other).toBe('other property');

		obj.prop = 'test';
		expect(obj.prop).toBe('my property');

		delete obj.prop

		expect(obj.prop).toBeDefined();
	});

	it('Object.defineProperty should define getters and setters', function() {
		var obj = {};

		var setSpy = jasmine.createSpy('setSpy');
		var getSpy = jasmine.createSpy('getSpy');

		Object.defineProperty(obj, 'prop', {
			configurable: false,
			set: function (newValue) {
				setSpy(newValue);
			},

			get: function () {
				getSpy();
			}
		});

		obj.prop = 'test';

		expect(setSpy).toHaveBeenCalledWith('test');

		obj.prop;

		expect(getSpy).toHaveBeenCalled();
	});

	it('Object.create()', function() {
		var obj = {
			prop: 'myprop',
			action: function () {}
		}

		var copyObj = Object.create(obj, {
			another: {
				configurable: false,
				value: 'anothe value'
			}
		});

		expect(copyObj.prop).toBe('myprop');
		expect(copyObj.action).toBeDefined();

		expect(copyObj.hasOwnProperty('prop')).toBe(false);
		expect(copyObj.hasOwnProperty('another')).toBe(true);
	});

	it('Object.getOwnPropertyNames', function() {
		var obj = {
					name: 'piotr',
					age: 35
				},
				propNames;

		propNames = Object.getOwnPropertyNames(obj);

		expect(propNames.length).toBe(2);
		expect(propNames).toEqual(['name', 'age']);
	});

	it('Object.keys() - gives all object OWN keys', function () {
		var parentPrototype = {
					age: 0
				},
				Person = function (name) {
					this.name = name;
				};

		Person.prototype = Object.create(parentPrototype);

		var peter = new Person('peter');

		expect(Object.keys(peter)).toEqual(['name']);
	});

	it('Object.is() - checks identity of given objects', function () {
		expect(Object.is(NaN, NaN)).toBe(true);
		expect(Object.is('test', 'test')).toBe(true);
		expect(Object.is(undefined, undefined)).toBe(true);
		expect(Object.is(-0, -0)).toBe(true);
		expect(Object.is(+0, +0)).toBe(true);

		expect(Object.is({a: 'a'}, {a: 'a'})).toBe(false);

		// the same does not work with ===
		expect(NaN === NaN).toBe(false);
	});

	it('Object.freeze()');
	it('Object.isFrozen()');
	it('Object.seal()');
	it('Object.isSealed()');
	it('Object.getOwnPropertyDescriptor()');
	it('Object.getPrototypeOf()');
	it('Object.setPrototypeOf()');
	it('Object.isExtensible()');
	it('Object.getOwnPropertyDescriptor()');
	it('Object.getOwnPropertyDescriptor()');
	it('Object.observe()');
	it('Object.preventExtensions()');
});