require("babelify/polyfill");

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

	describe('getters and setters (accessors)', function() {
		it('can use accessors', function() {
			var person = {
				get name() {
					return 'test';
				}
			}

			expect(person.name).toBe('test');
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

	describe('Object.is() to check identity including undefined, NaN, +0, -0', function() {
		it('checks if two given objects are the same', function() {
			expect(Object.is('hello', 'hello')).toBe(true);
			expect(Object.is(NaN, NaN)).toBe(true);
			expect(Object.is(undefined, undefined)).toBe(true);
			expect(Object.is(+0, +0)).toBe(true);
			expect(Object.is(-0, -0)).toBe(true);
		});

		it('not possible with ES5 and === operator', function() {
			expect(NaN === NaN).toBe(false);
		});
	});

	describe('Object.assign(). (Like _.extend(), mixin)', function() {
		it('allows to mixin', function() {
			var obj = {};

			Object.assign(obj, {
				title: 'hello',
				greet: function () {}
			}, {
				age: 12
			});

			expect(obj.title).toBe('hello');
			expect(obj.age).toBe(12);
			expect(obj.greet).toEqual(jasmine.any(Function));
			expect(obj.hasOwnProperty('title'));
			expect(obj.hasOwnProperty('greet'));
		});
	});

	describe('Chaning prototypes', function() {
		it('Object.getPrototypeOf() to get prototype of an object', function() {
			var Person = function () {},
					adam = new Person();
						
			expect(Object.getPrototypeOf({})).toBe(Object.prototype);
			expect(Object.getPrototypeOf(adam)).toBe(Person.prototype);
			expect(adam.__proto__).toBe(Person.prototype);
		});

		it('Object.setPrototypeOf() to change prototype of an object', function() {
			let person = {
						getGreeting() {
							return 'hello'
						}
					},
					dog = {
						getGreeting() {
							return 'woof'
						}
					},
					friend = Object.create(person);

			expect(friend.getGreeting()).toBe('hello');
			expect(Object.getPrototypeOf(friend)).toBe(person);

			Object.setPrototypeOf(friend, dog);

			expect(friend.getGreeting()).toBe('woof');
			expect(Object.getPrototypeOf(friend)).toBe(dog);
		});
	});

	describe('super references (Object.getPrototypeOf(this).method.call(this))', function() {
		it('traditional ES5 approach', function() {
			var parent = {
						greet: function () {
							return '-parent greet-';
						}
					},
					child = Object.create(parent);

			child.greet = function () {
				return Object.getPrototypeOf(this).greet.call(this) + 'child greet'
			}
				
			expect(child.greet()).toBe('-parent greet-child greet')
		});

		it('ES6 approach', function() {
			var parent = {
						greet: function () {
							return '-parent greet-';
						}
					},
					child = {
						greet() {
							/* super.greet() the same as Object.getPrototypeOf(this).getGreeting.call(this) */
							return super.greet() + 'child greet'
						}
					}

			Object.setPrototypeOf(child, parent);

			expect(child.greet()).toBe('-parent greet-child greet');
		});
	});

	describe('methods', function() {
		it('objects have methods attached with simplified syntax', function() {
			var parent = {
						greet() {
							return 'hello';
						},
						hi() {
							return 'hi';
						}
					}

			expect(parent.greet()).toBe('hello');
			expect(parent.hi()).toBe('hi');
		});
	});
});