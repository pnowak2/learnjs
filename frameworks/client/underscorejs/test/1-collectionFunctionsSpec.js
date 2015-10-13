var expect = require('chai').expect;
var _ = require('underscore');

describe('collection functions', function() {

	describe('_.each(list, iteratee, [context]) - iterates over list of elements', function() {
		it('simple iteration', function() {
			var result = '';
			_.each([1, 2, 3], function (element) {
				result += element;
			});

			expect(result).to.equal('123');
		});

		it('arguments passed to iteratee - element, index, list', function() {
			_.each([1, 2, 3], function (element, index, list) {
				expect(element).to.equal(index + 1);
				expect(list).to.deep.equal([1, 2, 3]);
			});
		});

		it('works on arrays, objects, array like objects like arguments', function() {
			var result = '';

			_.each({a: 1, b: 2, c: 3}, function (element, index) {
				result += (element + index)
			});

			expect(result).to.equal('1a2b3c');
		});
	});

	describe('_.map(list, iteratee, [context]) - produces new array by mapping each value', function() {
		it('simple map', function() {
			var result = _.map([1, 2, 3], function (num) {
				return num * 3;
			});

			expect(result).to.eql([3, 6, 9]);	
		});

		it('arguments passed to iteratee - value, index, list', function() {
			var result = _.map([1, 2, 3], function (value, index, list) {
				return value * index /* 0, 1, 2, ... */;
			});

			expect(result).to.eql([0, 2, 6]);	
		});
	});

	describe('_.reduce(list, iteratee, [memo], [context]) - (inject, foldl) reduces list to single value', function() {
		it('memo is the initial state of reduction', function() {
			var result = _.reduce([1, 2, 3], function (memo, num) {
				return memo + num;
			}, 0);

			expect(result).to.eql(6);
		});
	});

	describe('.reduceRight(list, iteratee, memo, [context]) - same as reduce but takes element from right side', function() {
			var result = _.reduceRight([1, 2, 3], function (memo, num) {
				return '' + memo + num;
			}, 0);

			expect(result).to.eql('0321');
	});
});
