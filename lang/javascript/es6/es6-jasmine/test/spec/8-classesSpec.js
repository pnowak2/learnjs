describe('classes', function() {
	describe('ES5 way', function() {
		it('defines "class" with method', function() {
			function PersonType (name) {
				this.name = name;
			}

			PersonType.prototype.sayName = function () {
				return 'hello ' + this.name
			}

			var p = new PersonType('peter');

			expect(p.name).toBe('peter');
			expect(p.sayName()).toBe('hello peter');
		});
	});

	describe('class declarations (just syntactic sugar)', function() {
		it('declares class (methods like in object literals, without commas)', function() {
			class PersonClass {
				constructor(name) {
					this.name = name;
				}

				sayName() {
					return `hello ${this.name}`
				}
			}

			let p = new PersonClass('peter');

			expect(PersonClass).toEqual(jasmine.any(Function));
			expect(PersonClass.prototype.sayName).toEqual(jasmine.any(Function));
			expect(p.name).toBe('peter');

			expect(p).toEqual(jasmine.any(PersonClass));
			expect(p).toEqual(jasmine.any(Object));
			expect(p.sayName()).toBe('hello peter');
		});

		it('class expressions', function() {
			var PersonClass = class {
				constructor(name) {
					this.name = name;
				}

				sayName() {
					return `hello ${this.name}`
				}
			}

			let p = new PersonClass('peter');

			expect(PersonClass).toEqual(jasmine.any(Function));
			expect(PersonClass.prototype.sayName).toEqual(jasmine.any(Function));
			expect(p.name).toBe('peter');

			expect(p).toEqual(jasmine.any(PersonClass));
			expect(p).toEqual(jasmine.any(Object));
			expect(p.sayName()).toBe('hello peter');
		});

		it('Own properties (instance properties) can be only created in constructor() function');
		it('All methods are created in function prototype');
		it('Class declarations are not hoisted');
		it('All code inside class runs on strict mode');
		it('All methods are non enumerable');
		it('Calling class constructor without new throws an error');

		it('ES5 equivalent', function() {
			let PersonClass = (function () {
				const PersonClass = function(name) {

					// if(typeof new.target === 'undefined') {
					// 	throw new Error('Constructor must be called with new.')
					// }

					this.name = name;
				}

				Object.defineProperty(PersonClass.prototype, 'sayName', {
					value: function () {
						return 'hello ' + this.name;
					},
					enumerable: false,
					writable: true,
					configurable: true
				});

				return PersonClass;
			})();

			let p = new PersonClass('peter');

			expect(PersonClass).toEqual(jasmine.any(Function));
			expect(PersonClass.prototype.sayName).toEqual(jasmine.any(Function));
			expect(p.name).toBe('peter');

			expect(p).toEqual(jasmine.any(PersonClass));
			expect(p).toEqual(jasmine.any(Object));
			expect(p.sayName()).toBe('hello peter');
		});
	});

	describe('accessor properties', function() {
		it('get and set declarations', function() {
			class Person {
				constructor(name) {
					this.name = name
				}

				get greeting() {
					return `hello ${this.name}`;
				}

				set greeting(name) {
					this.name = name
				}
			}

			let p = new Person('peter');
			expect(p.greeting).toBe('hello peter');
			expect(p.hasOwnProperty('greeting')).toBe(false);
			expect(Person.prototype.hasOwnProperty('greeting')).toBe(true);
		});

		it('ES5 equivalent', function() {
			const Person = (function () {
				var Constr = function (name) {
					this.name = name;
				}

				Object.defineProperty(Constr.prototype, 'greeting', {
					enumerable: false,
					configurable: true,
					get: function () {
						return 'hello ' + this.name;
					},
					set: function (name) {
						this.name = name;
					}
				});

				return Constr;
			})();

			let p = new Person('peter');
			expect(p.greeting).toBe('hello peter');
			expect(p.hasOwnProperty('greeting')).toBe(false);
			expect(Person.prototype.hasOwnProperty('greeting')).toBe(true);
		});
	});

	describe('static members', function() {

		it('defined with static keyword', function() {
			class Person {
				constructor (name) {
					this.name = name;
				}

				static create (name) {
					return new Person(name);
				}
			}

			var p = Person.create('peter');
			expect(Person.create).toEqual(jasmine.any(Function));
			expect(p).toEqual(jasmine.any(Person));
		});

		it('ES5 equivalent', function() {
			function Person (name) {
				this.name = name;
			}

			Person.create = function (name) {
				return new Person(name);
			}

			Person.prototype.sayName = function () {
				return 'hello ' + this.name;
			}

			var p = Person.create('peter');
			expect(Person.create).toEqual(jasmine.any(Function));
			expect(p).toEqual(jasmine.any(Person));
		});
	});

	describe('derived classes', function() {

		it('with extends keyword', function() {
			class Rectangle {
				constructor (length, width) {
					this.length = length;
					this.width = width;
				}

				area () {
					return this.length * this.width;
				}
			}

			class Square extends Rectangle {
				constructor (length) {
					super(length, length);
				}
			}

			var square = new Square(5);
			expect(square.area()).toBe(25);
			expect(square).toEqual(jasmine.any(Square));
			expect(square).toEqual(jasmine.any(Rectangle));
		});

		it('ES5 equivalent', function() {
			function Rectangle(length, width) {
				this.length = length;
				this.width = width;
			}

			Rectangle.prototype.area = function () {
				return this.length * this.width;
			}

			function Square(length) {
				Rectangle.call(this, length, length);
			}

			Square.prototype = Object.create(Rectangle.prototype, {
				constructor: {
					value: Square,
					enumerable: true,
					writable: true,
					configurable: true
				}
			});

			var square = new Square(5);
			expect(square.area()).toBe(25);
			expect(square).toEqual(jasmine.any(Square));
			expect(square).toEqual(jasmine.any(Rectangle));
		});

		it('calls constructor from base class if not defined in child', function() {
			var constrSpy = jasmine.createSpy();

			class Parent {
				constructor () {
					constrSpy(Array.prototype.slice.apply(arguments));
				}
			}

			class Child extends Parent {

			}

			var c = new Child('a', 'b', 'c');

			expect(constrSpy).toHaveBeenCalledWith(['a', 'b', 'c']);
		});

		it('shadowing base methods and calling super methods', function() {
			class Parent {
				greet () {
					return 'parent';
				}
			}

			class Child extends Parent {
				greet() {
					return `${super.greet()}-child`;
				}
			}

			let c = new Child;
			expect(c.greet()).toBe('parent-child');
		});

		it('class computed method names', function() {
			let methodName = 'greet';
			class Person {
				[methodName]() {
					return 'hello';
				}
			}

			let p = new Person;
			expect(p.greet()).toBe('hello');
		});

		it('static members from base class are visible to descendants', function() {
			class Person {
				static greet (name) {
					return `hello ${name}`;
				}
			}

			class User extends Person {

			}

			expect(User.greet('peter')).toBe('hello peter');
		});

		it('derived classes from expressions (has to have [[construct]] and prototype property)', function() {
			function Rectangle (length, width) {
				this.length = length;
				this.width = width;
			}

			Rectangle.prototype.area = function () {
				return this.length * this.width;
			}

			class Square extends Rectangle {
				constructor(width) {
					super(width, width);
				}
			}

			let s = new Square(5);
			expect(s.area()).toBe(25);
		});
	});

	describe('inheriting from built-ins', function() {
		xit('derive from Array (does not work with babel)', function() {
			class MyArray extends Array {

			}

			let colors = new MyArray();
			colors[0] = 'red';

			expect(colors.length).toBe(1);
			expect(colors[0]).toBe('red');
		});
	});

	describe('new.target to determine how the class was invoked', function() {
		// xit('creating abstract classes (new.target does not work with babel)', function() {
		// 	class Shape {
		// 		constructor () {
		// 			if(typeof new.target === 'Shape') {
		// 				throw new Error('This class cannot be instantiated directly.');
		// 			}
		// 		}
		// 	}

		// 	class Square extends Shape {

		// 	}

		// 	expect(function () {
		// 		new Shape();
		// 	}).toThrow();

		// 	expect(function () {
		// 		new Square();
		// 	}).not.toThrow();
		// });
	});
});