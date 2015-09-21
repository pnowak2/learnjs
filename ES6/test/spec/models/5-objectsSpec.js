describe('objects', function() {
	describe('property initializer shorthand', function() {
		it('shorthand for mapping between local variable name and object property', function() {
			function createPerson (name, age) {
				return {
					name,
					age,
					// notFound // will throw error, because that variable does not exist
				}
			}

			expect(createPerson('piotr', 35)).toEqual({
				name: 'piotr',
				age: 35
			})
		});
	});

	describe('method initializer shorthand', function() {
		it('can omit function keyword (no colon after function descriptor)', function() {
			var person = {
				name: 'peter',
				sayName(greeting) {
					return `${greeting}, ${this.name}`
				}
			}

			expect(person.sayName('hello')).toBe('hello, peter');
		});
	});

	describe('computed property names', function() {
		it('ES5 way', function() {
			var propName = 'my name',
					obj = {};

			obj[propName] = 'test';

			expect(obj['my name']).toBe('test');
		});

		it('ES6 way', function() {
			var propName = 'my name',
					obj = {
						[propName]: 'test'
					};

			expect(obj['my name']).toBe('test');
		});

		it('can also more complicated example', function() {
			var name = 'hello world',
					obj = {
						['prefix-' + name]: 'test more'
					};

			expect(obj['prefix-hello world']).toBe('test more');
		});
	});

	describe('Object.is()', function() {
		it('should behave...', function() {
			
		});
	});
});