describe('symbols like in ruby(new kind of primitive value with strings, numbers, booleans etc..)', function() {

	describe('definition', function() {
		it('symbols do not have literal form, just call Symbol like function', function() {
			var sbl = Symbol();
			expect(sbl).toBeDefined();
		});

		xit('typeof symbols is "symbol". (does not work with babel)', function() {
			var sbl = Symbol();
			expect(typeof sbl).toBe('symbol');
		});

		it('symbol just has name as declared', function() {
			var symbolName = Symbol();
			expect(symbolName).toBeDefined();
		});
	});

	describe('features', function() {
		it('symbol has description (just for debugging)', function() {
			var symbolName = Symbol('my description');
			expect(symbolName.toString()).toContain('my description');
		});

		it('cannot create symbol with new', function() {
			expect(function () {
				new Symbol();
			}).toThrow();
		});
	});

	describe('Object.defineProperty[ies] with symbols', function() {
		it('objects can have properties based on symbols', function() {
			var firstName = Symbol(),
			 		person = {
			 			[firstName]: 'piotr'
			 		};

			expect(person[firstName]).toBe('piotr');
			expect(person['firstName']).toBeUndefined();
		});

		it('can create symbol property with Object.defineProperty', function() {
			var obj = {},
					name = Symbol('last name');

			Object.defineProperty(obj, name, {
				writable: true,
				value: 'nowak'
			});

			expect(obj[name]).toBe('nowak');
		});

		it('can create symbol property with Object.defineProperties', function() {
			var obj = {},
					name = Symbol('last name'),
					age = Symbol('age');

			Object.defineProperties(obj, {
				[name]: {
					writable: true,
					value: 'nowak'
				},
				[age]: {
					writable: true,
					value: 35
				}
			});

			expect(obj[name]).toBe('nowak');
			expect(obj[age]).toBe(35);
		});
	});

	describe('sharing symbols, Symbol.for()', function() {
		it('creates or returns symbol with given key', function() {
			var uid = Symbol.for('uid'),
					uid2 = Symbol.for('uid');

			expect(uid).toBe(uid2);
		});

		it('can retrieve key of symbol with Symbol.keyFor()', function() {
			var sbl = Symbol.for('sbl');

			expect(Symbol.keyFor(sbl)).toBe('sbl');
		});
	});

	describe('Object.getOwnPropertySymbols()', function() {
		it('get own symbols from object', function() {
			var sbl = Symbol.for('uid'),
					obj = {
						[sbl]: 12345,
						name: 'js'
					};

			expect(Object.getOwnPropertySymbols(obj)).toEqual([sbl]);

			expect(Object.getOwnPropertyNames(obj)).toEqual(['name']);
			expect(Object.keys(obj)).toEqual(['name']);
		});
	});

	describe('well known symbols - built in js symbols as property of Symbol function', function() {
		it('@@toStringTag - a string used by Object.prototype.toString() to create an object description', function() {
			var Person = function (name) {
						this.name = name;
					},
					piotr = new Person('piotr');

			Person.prototype[Symbol.toStringTag] = 'Person';

			expect(Object.prototype.toString.call(piotr)).toBe('[object Person]');
		});
	});
});