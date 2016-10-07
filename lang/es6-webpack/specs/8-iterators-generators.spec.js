import { expect } from 'chai';

describe('Iterators and Generators', function () {
	describe('Simple iterators', function () {
		var createIterator = function (items) {
			var i = 0;

			return {
				next: function () {
					var done = (i >= items.length);
					var value = done ? undefined : items[i++];

					return { done, value };
				}
			};
		};

		it('should create ES5 iterator', function () {
			var items = ['a', 'b', 'c'];

			var it = createIterator(items);
			expect(it.next()).to.eql({
				done: false,
				value: 'a'
			});

			expect(it.next()).to.eql({
				done: false,
				value: 'b'
			});

			expect(it.next()).to.eql({
				done: false,
				value: 'c'
			});

			expect(it.next()).to.eql({
				done: true,
				value: undefined
			});

			expect(it.next()).to.eql({
				done: true,
				value: undefined
			});
		});

		it('should use yield keyword only in star interator functions', function () {
			function* createIterator() {
				yield 1;
			}

			let it = createIterator();

			expect(it.next()).to.eql({
				done: false,
				value: 1
			});
		});

		it('should use yield in for loop', function () {
			let createIterator = function* (items) {
				for (let i = 0; i < items.length; i++) {
					yield items[i];
				}
			};

			let items = ['a', 'b', 'c'];
			let iterator = createIterator(items);

			expect(iterator.next()).to.eql({
				done: false,
				value: 'a'
			});

			expect(iterator.next()).to.eql({
				done: false,
				value: 'b'
			});

			expect(iterator.next()).to.eql({
				done: false,
				value: 'c'
			});

			expect(iterator.next()).to.eql({
				done: true,
				value: undefined
			});
		});

		it('iterator as es6 object method', function () {
			let o = {
				*createIterator() {
					yield 2;
				}
			};

			let iterator = o.createIterator();

			expect(iterator.next()).to.eql({
				done: false,
				value: 2
			});
		});
	});

	describe('for-of', function () {
		it('can iterate on array of numbers (built-in)', function () {
			let result = '';
			for (let num of [1, 2, 3]) {
				result += num;
			}

			expect(result).to.eql('123');
		});

		it('should access default iterator', function () {
			let values = [1, 2, 3];
			let iterator = values[Symbol.iterator]();

			expect(iterator.next().value).to.eql(1);
		});

		it('should provide IsIterable() method', function () {
			var IsIterable = function (object) {
				return typeof object[Symbol.iterator] === 'function';
			};

			expect(IsIterable('abcd')).to.be.true;
			expect(IsIterable([])).to.be.true;
			expect(IsIterable(new Set())).to.be.true;
			expect(IsIterable(new Map())).to.be.true;
			expect(IsIterable(new WeakSet())).to.be.false;
			expect(IsIterable(new WeakMap())).to.be.false;
		});
	});

	describe('Creating Iterables', function () {
		it('should create iterator for custom object', function () {
			let obj = {
				items: ['a', 'b', 'c'],
				*[Symbol.iterator]() {
					for (let item of this.items) {
						yield item;
					}
				}
			};

			let result = '';
			for (let o of obj) {
				result += o;
			}

			expect(result).to.eql('abc');
		});
	});

	describe('Built-in Iterators for arrays, maps and sets', function () {
		it('should use entries()', function () {
			let colors = ['red', 'blue', 'green'];
			let result = '';

			for (let entry of colors.entries()) {
				result += entry[0] + entry[1];
			}

			expect(result).to.eql('0red1blue2green');
		});

		it('should use values()', function () {
			let colors = new Map();
			colors.set('red', 'czerwony');
			colors.set('green', 'zielony');
			colors.set('blue', 'niebieski');

			let result = '';

			for (let val of colors.values()) {
				result += val;
			}

			expect(result).to.eql('czerwonyzielonyniebieski');
		});

		it('should use keys()', function () {
			let colors = new Map();
			colors.set('red', 'czerwony');
			colors.set('green', 'zielony');
			colors.set('blue', 'niebieski');

			let result = '';

			for (let key of colors.keys()) {
				result += key;
			}

			expect(result).to.eql('redgreenblue');
		});

		it('should destructure in for of loop', () => {
			let colors = new Map();
			colors.set('red', 'czerwony');
			colors.set('green', 'zielony');
			colors.set('blue', 'niebieski');

			let result = '';

			for (let [key, value] of colors) {
				result += key + value;
			}

			expect(result).to.eql('redczerwonygreenzielonyblueniebieski');
		});

		it('should have string iterator', () => {
			let result = '';

			for (let s of 'hello') {
				result += s + '-';
			}

			expect(result).to.eql('h-e-l-l-o-');
		});
	});

	describe('Spread operator and non-array iterables', () => {
		it('should use spread operator to convert to array', () => {
			let set = new Set([1, 2, 3, 3, 3, 4, 5]);

			expect([...set]).to.eql([1, 2, 3, 4, 5]);
		});

		it('should use spread to concatenate arrays', () => {
			let smallNumbers = [1, 2, 3],
				bigNumbers = [100, 101, 102],
				allNumbers = [0, ...smallNumbers, ...bigNumbers];

			expect(allNumbers).to.eql([0, 1, 2, 3, 100, 101, 102]);
		});
	});

	describe('Advanced Iterator Funcionality', () => {
		it('should pass arguments to iterator', () => {
			function* createIterator() {
				let first = yield 1;
				let second = yield first + 2;
				yield second + 3;
			}

			let iterator = createIterator();

			expect(iterator.next().value).to.eql(1);
			expect(iterator.next(4).value).to.eql(6);
			expect(iterator.next(5).value).to.eql(8);
			expect(iterator.next().value).to.eql(undefined);
		});

		it('should throw errors in iterator', () => {
			function* createIterator() {
				let first = yield 1;
				let second = yield first + 2;
				yield second + 3;
			}

			let iterator = createIterator();

			expect(iterator.next().value).to.eql(1);
			expect(iterator.next(4).value).to.eql(6);

			expect(() => iterator.throw(new Error('Boom'))).to.throw();
		});

		it('should catch errors in iterator, throw return iterator entry too!', () => {
			function* createIterator() {
				let first = yield 1;
				let second;
				try {
					second = yield first + 2;
				} catch (e) {
					second = 6;
				}
				yield second + 3;
			}

			let iterator = createIterator();

			expect(iterator.next().value).to.eql(1);
			expect(iterator.next(4).value).to.eql(6);
			expect(iterator.throw(new Error('Boom')).value).to.eql(9);
		});

		it('should return early with return statement (will be last value got from iterator)', () => {
			function* createIterator() {
				yield 1;
				return 'we are done';
				yield 2;
			}

			let iterator = createIterator();

			expect(iterator.next().value).to.eql(1);
			expect(iterator.next().value).to.eql('we are done');
		});

		it('should combine iterators', () => {
			function* createNumbersIterator() {
				yield 1;
				yield 2;
			}

			function* createColorsIterator() {
				yield 'red';
				yield 'blue';
			}

			function* createCombinedIterator() {
				yield* createNumbersIterator();
				yield* createColorsIterator();
				yield 'end';
			}

			let iterator = createCombinedIterator();

			expect(iterator.next().value).to.eql(1);
			expect(iterator.next().value).to.eql(2);
			expect(iterator.next().value).to.eql('red');
			expect(iterator.next().value).to.eql('blue');
			expect(iterator.next().value).to.eql('end');
		});
	});

	describe('Asynchronous Task Running', () => {
		it('should run with iterator', () => {
			function run(taskDef) {
				// create the iterator, make available elsewhere
				let task = taskDef();
				// start the task
				let result = task.next();
				// recursive function to keep calling next()
				function step() {
					// if there's more to do
					if (!result.done) {
            result = task.next(result.value);
            step();
					}
				}
				// start the process
				step();
			}

			run(function* () {
				let value = yield 1;
				value = yield + 3;
			});
		});
	});
});