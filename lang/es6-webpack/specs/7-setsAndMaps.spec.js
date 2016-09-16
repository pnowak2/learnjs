import { expect } from 'chai';

describe('Sets and Maps', function() {
	describe('ES5 approach', function() {
		it('should simulate with object properties', function() {
			let set = Object.create(null);

			set.foo = true;

			expect(set.foo).to.eql(true);
		});
	});

	describe('Sets', function() {
		it('should create the set', function() {
			let set = new Set();

			expect(set).to.be.an.instanceOf(Set);
		});

		it('should add to the set non unique values', function() {
			let set = new Set();

			expect(set.size).to.eql(0);

			set.add(5);
			set.add(5);

			expect(set.size).to.eql(1);
		});

		it('should add to the set unique values', function() {
			let set = new Set();

			expect(set.size).to.eql(0);

			set.add(5);
			set.add('5');

			expect(set.size).to.eql(2);
		});

		it('should initialize with array', function() {
			let set = new Set([1, 2, 3]);

			expect(set.size).to.eql(3);
		});

		it('should remove values', function() {
			let set = new Set([1, 2, 3]);

			expect(set.size).to.eql(3);

			set.delete(2);

			expect(set.size).to.eql(2);
		});

		it('should remove all values', function() {
			let set = new Set([1, 2, 3]);

			expect(set.size).to.eql(3);

			set.clear();

			expect(set.size).to.eql(0);
		});

		it('should check if contains value', function() {
			let set = new Set([1, 2, 3]);
			expect(set.has(3)).to.eql(true);
		});

		it('should convert set to array', function() {
			let set = new Set([1, 2, 3]);
			
			set.delete(3);

			expect([...set]).to.eql([1, 2]);
		});
	});

	describe('Weak Sets', function() {
		it('should create weak set', function() {
			let weakSet = new WeakSet(),
				key = {};

			weakSet.add(key);

			expect(weakSet.has(key)).to.be.true;
		});

		it('should not be possible to add not object to weak set', function() {
			let weakSet = new WeakSet(),
				key = {};

			expect(function () {
				weakSet.add(5);
			}).to.throw();
		});

		it('should not have reference to item once it was deleted', function() {
			let weakSet = new WeakSet(),
				key = {};

			weakSet.add(key);

			key = null;

			expect(weakSet.has(key)).to.be.false;
		});
	});

	describe('Maps', function() {
		it('should create map', function() {
			let map = new Map();

			expect(map).to.be.an.instanceOf(Map);
		});

		it('should set and get some values from map', function() {
			let map = new Map();

			map.set('foo', 'bar');
			map.set('baz', 'dar');

			expect(map.get('foo')).to.eql('bar');
			expect(map.get('baz')).to.eql('dar');
		});
	});
});