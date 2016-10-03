import { expect } from 'chai';

describe('Iterators', function () {
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

	
	it('', function() {
		
	});
		

});