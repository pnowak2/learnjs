describe('functions', function() {
	describe('default parameters', function() {
		it('should define some params as default', function() {
			var callbackSpy = jasmine.createSpy();
			var makeRequest = function(url, timeout = 1000, callback = callbackSpy) {
				expect(url).toBe('/url');
				expect(timeout).toBe(1000);
				expect(callback).toBe(callbackSpy);
			}

			makeRequest('/url');
		});

		it('default parameter is used when undefined is passed or omitted', function() {
			var makeRequest = function (url, timeout = 1000) {
				expect(url).toBe('/url');
				expect(timeout).toBe(1000);
			}

			makeRequest('/url', undefined);
		});

		it('could get default parameter as expression', function() {
			var getTimeout = function () { return 2 },
					makeRequest = function (url, timeout = getTimeout()) {
						expect(timeout).toBe(2);
					};

			makeRequest();
		});
	});

	describe('rest parameters', function() {
		it('rest parameters gathered as array', function() {
			var source = {},
					name1 = 'a',
					name2 = 'b',
					pick = function (obj, ...names) {
						expect(obj).toBe(source);
						expect(names).toEqual(jasmine.any(Array));
						expect(names[0]).toBe('a');
						expect(names[1]).toBe('b');
					};

			pick(source, name1, name2);
		});

		it('can destructure function call', function() {
			var fn = function(a, {b, c}) {
				expect(a).toBe('a');
				expect(b).toBe('b');
				expect(c).toBe('c');
			}

			fn('a', {a: 'a1', b: 'b', c: 'c'});
		});
	});

	describe('arguments object', function() {
		it('changes in function params do not change arguments', function() {
			var mixArgs = function (arg1, arg2) {
				expect(arg1).toBe('a');
				expect(arguments[0]).toBe('a');
				expect(arg2).toBe('b');
				expect(arguments[1]).toBe('b');

				arg1 = 'a2';
				arg2 = 'b2';

				expect(arg1).toBe('a2');
				expect(arguments[0]).toBe('a');
				expect(arg2).toBe('b2');
				expect(arguments[1]).toBe('b');
			}

			mixArgs('a', 'b');
		});
	});

	describe('spread operator - an array is splitted and passed as separate arguments', function() {
		it('should convert array to separate arguments', function() {
			var myMax = function (arg1, arg2, arg3) {
				expect(arg1).toBe('a');
				expect(arg2).toBe('b');
				expect(arg3).toBe('c');
			}

			myMax(...['a', 'b', 'c']);
		});
	});

	// not working with babelify
	xdescribe('function constructor (does not work with babeljs)', function() {
		it('can create function on fly with default parameters', function() {
			var fn = new Function('first', 'second = ",hello"', 'return first + second');
			expect(fn('piotr')).toBe('piotr,hello');
		});
	});

	describe('name property of function', function() {
		it('each function now has its name property, even anonymous declaration', function() {
			function doSomething() {};
			var doAnotherThing = function () {},
			obj = {
				hello: function () {}
			};

			expect(doSomething.name).toBe('doSomething');
			expect(doAnotherThing.name).toBe('doAnotherThing');
			expect(obj.hello.name).toBe('hello');
		});

		xit('functions bound with bind() have "bound in name. (does not work with babel)"', function() {
			var hello = function () {};

			expect(hello.bind({}).name).toBe('bound hello');
		});
	});

		// When a function is called without new, the [[Call]] method is executed, 
		// which executes the body of the function as it appears in the code. 
		// When a function is called with new, that’s when the [[Construct]] method is called. 
		// The [[Construct]] method is responsible for creating a new object, called the new target, 
		// and then executing the function body with this set to the new target. 
		// Functions that have a [[Construct]] method are called constructors.

		// not all functions have [[Construct]], and therefore not all functions can be called with new. 
		// Arrow functions do not have a [[Construct]] method.
	describe('new.target, [[call]] and [[construct]]', function() {
		describe('classic way of telling if function was called with new keyword', function() {
			it('should throw error if invoked without new, could trick it with Object.call', function() {
				var Person = function (name) {
					if(this instanceof Person) {
						this.name = name;
					} else {
						throw new Error('You must use new with Person');
					}
				}

				expect(function () {
					new Person('john')
				}).not.toThrow();

				expect(function () {
					Person.call(new Person, 'john')
				}).not.toThrow();

				expect(function () {
					Person('john')
				}).toThrowError('You must use new with Person')
			});
		});

		xdescribe('new way using new.target. (does not work with babel)', function() {
			// 'new.target metaproperty (non-object) provides info about its target - new'
			// it('new.target is set with target of the new operator', function() {
			// 	var Person = function (name) {
			// 		if(typeof new.target !== 'undefined' /* or typeof new.target === Person */) {
			// 			this.name = name;
			// 		} else {
			// 			throw new Error('You must use new with Person');
			// 		}
			// 	}

			// 	expect(function () {
			// 		new Person('john')
			// 	}).not.toThrow();

			// 	expect(function () {
			// 		Person.call(new Person, 'john')
			// 	}).not.toThrow();

			// 	expect(function () {
			// 		Person('john')
			// 	}).toThrowError('You must use new with Person')
			// });
		});
	});

	describe('block level functions', function() {
		it('should be defined and accessible only in block', function() {
			if (true) {
				function doSomething() {

				}

				expect(typeof doSomething).toBe('function');
			}

			expect(typeof doSomething).toBe('undefined');
		});
	});

	describe('arrow functions (not newable, cant change this, no arguments object)', function() {
		describe('syntax', function() {
			it('one argument (one argument does not need paranthesis and body does not need curly braces', function() {
				var arrowFn = value => value

				expect(arrowFn(5)).toBe(5);
			});

			it('two or more arguments (needed parenthesis)', function() {
				var arrowFn = (arg1, arg2) => arg1 + arg2;

				expect(arrowFn(1, 4)).toBe(5);
			});

			it('no arguments (parenthesis mandatory)', function() {
				var arrowFn = () => 'piotr nowak';

				expect(arrowFn()).toBe('piotr nowak');
			});

			it('more expressions in body requires curly brace', function() {
				var arrowFn = (arg1, arg2) => {
					var sum = arg1 + arg2;
					return sum;
				}

				expect(arrowFn(1, 6)).toBe(7);
			});

			it('returning just object (must use parenthesis to wrap the object)', function() {
				var getItem = id => ({ id: id});

				expect(getItem(5)).toEqual({
					id: 5
				});
			});
		});

		describe('arguments is not available', function() {
			it('arguments is accessible but from parent scope. arrow functions do not have own arguments', function() {
				function outer() {
					var arrowFn = (...args) => {
						expect(arguments[0]).toBe('outer');
						// can use spread feature though..
						expect(args[0]).toBe('inner');
					}

					arrowFn('inner');
				}

				outer('outer');
			});
		});

		describe('cannot create new instance of arror function', function() {
			xit('should throw because arrow functions cannot be [[constructor]]s', function() {
				var arrowFn = () => {};

				expect(function () {
					new arrowFn();
				}).toThrowError();
			});
		});

		describe('IIFEs (immediately invoked functions)', function() {
			it('can invoke arrow function as IIFE', function() {
				let person = ((name) => {
					return {
						getName() {
							return name;
						}
					}
				})('piotr nowak');

				expect(person.getName()).toBe('piotr nowak');
			});
		});

		describe('lexical this binding', function() {
			it('this is used from context where arrow function was defined', function() {
				var Person = function (name) {
					this.name = name;

					this.getName = function () {
						return formatName();
					}

					var formatName = () => {
						return `${this.name} - formatted`;
					}
				}

				var peter = new Person('peter');

				expect(peter.getName()).toBe('peter - formatted');
			});

			it('have to bind with classical function', function() {
				var Person = function (name) {
					this.name = name;

					this.getName = function () {
						return formatName.bind(this)();
					}

					var formatName = function () {
						return `${this.name} - formatted`;
					}
				}

				var peter = new Person('peter');

				expect(peter.getName()).toBe('peter - formatted');
			});
		});
	});
});
