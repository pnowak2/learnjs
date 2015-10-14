var expect = require('chai').expect;
var _ = require('underscore');

describe('arrays', function() {
  describe('_.first(array, [n]) - Returns the first element of an array. Passing n will return the first n elements of the array', function() {
    it('takes first element from array', function() {
      var list = [5, 4, 3, 2, 1];
      expect(_.first(list)).to.eql(5);
    });

    it('takes first n elements from array', function() {
      var list = [5, 4, 3, 2, 1];
      expect(_.first(list, 3)).to.eql([5, 4, 3]);
    });
  });

  describe('_.initial(array, [n]) - Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result', function() {
    it('get everything but last item', function() {
      var list = [5, 4, 3, 2, 1];
      expect(_.initial(list)).to.eql([5, 4, 3, 2]);
    });

    it('can exclude last n elements from the result', function() {
      var list = [5, 4, 3, 2, 1];
      expect(_.initial(list, 2)).to.eql([5, 4, 3]);
    });
  });

  describe('_.last(array, [n]) - Returns the last element of an array. Passing n will return the last n elements of the array', function() {
    it('gets the last element of array', function() {
      expect(_.last([1, 2, 3, 4, 5])).to.eql(5);
    });
  });

  describe('_.rest(array, [n]) - Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward', function() {
    it('gets the rest elements of array', function() {
      expect(_.rest([1, 2, 3, 4, 5])).to.eql([2, 3, 4, 5]);
    });
  });

  describe('_.compact(array) - Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "", undefined and NaN are all falsy', function() {
    it('remove falsy values from array', function() {
      expect(_.compact([0, 1, null, undefined, '', 2])).to.eql([1, 2]);
    });
  });

  describe('_.flatten(array, [shallow]) - Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level', function() {
    it('flattens nested array', function() {
      list = [1, [2, 3, [4, 5]]];
      expect(_.flatten(list)).to.eql([1, 2, 3, 4, 5]);
    });
  });

  describe('_.without(array, *values) - Returns a copy of the array with all instances of the values removed', function() {
    it('get copy of array with some items removed ', function() {
      list = [1, 2, 3, 4, 5];

      expect(_.without(list, 4, 5)).to.eql([1, 2, 3]);
    });
  });

  describe('_.union(*arrays) - Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays', function() {
    it('creates union of may arrays', function() {
      var result = _.union([1, 2, 3], [6, 10, 1, 2, 3], [2, 1]);

      expect(result).to.eql([1, 2, 3, 6, 10]);
    });
  });

  describe('_.intersection(*arrays) - Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays', function() {
    it('gets common items (intersection) from all arrays passed', function() {
      var result = _.intersection([1, 2, 3], [6, 10, 1, 2, 3], [2, 1]);
      expect(result).to.eql([1, 2]);
    });
  });

  describe('_.difference(array, *others) - Similar to without, but returns the values from array that are not present in the other arrays', function() {
    it('get elements not present in others arrays', function() {
      var result = _.difference([1, 2, 3, 4, 5], [1, 2, 8, 10]);
      expect(result).to.eql([3, 4, 5]);
    });
  });

  describe('_.uniq(array, [isSorted], [iteratee]) - Produces a duplicate-free version of the array, using === to test object equality', function() {
    it('get just unique items', function() {
      expect(_.uniq([1, 2, 3, 2, 1, 4, 5, 5])).to.eql([1, 2, 3, 4, 5]);
    });
  });

  describe('_.zip(*arrays) - Merges together the values of each of the arrays with the values at the corresponding position', function() {
    it('consolidate data from 3 data sources to one array of arrays', function() {
      var result = _.zip(
        ['peter', 'andrew', 'mark'], [35, 24, 62], [true, false, true]
      );

      expect(result).to.eql([
        ['peter', 35, true],
        ['andrew', 24, false],
        ['mark', 62, true]
      ]);
    });
  });

  describe('_.unzip(*arrays) - The opposite of zip. Given a number of arrays, returns a series of new arrays', function() {
    it('unzips zipped array', function() {
      var result = _.unzip([
        ['peter', 35, true],
        ['andrew', 24, false],
        ['mark', 62, true]
      ]);

      expect(result).to.have.length(3);
      expect(result).to.eql([
        ['peter', 'andrew', 'mark'],
        [35, 24, 62],
        [true, false, true]
      ]);
    });
  });

  describe('_.object(list, [values]) - Converts arrays into objects. Pass either a single list of [key, value] pairs, or a list of keys, and a list of values. If duplicate keys exist, the last value wins', function() {
    it('creates an object from two arrays', function() {
      var result = _.object(
        ['peter', 'andrew', 'mark'], [35, 24, 62]
      );

      expect(result).to.eql({
        peter: 35,
        andrew: 24,
        mark: 62
      })
    });
  });

  describe('_.indexOf(array, value, [isSorted]) - Returns the index at which value can be found in the array, or -1 if value is not present in the array', function() {
  	it('finds element index in array', function() {
  		expect(_.indexOf([1, 2, 3, 4, 5], 5)).to.eql(4);
  	});
  });

  describe('_.lastIndexOf(array, value, [fromIndex]) - Returns the index of the last occurrence of value in the array, or -1 if value is not present. Pass fromIndex to start your search at a given index', function() {
  	it('finds element last index in array', function() {
  		expect(_.lastIndexOf([1, 2, 3, 4, 5, 2], 2)).to.eql(5);
  	});
  });

  describe('_.sortedIndex(list, value, [iteratee], [context]) - Uses a binary search to determine the index at which the value should be inserted into the list in order to maintain the lists sorted order', function() {
		it('should give index to put the new value to maintain the sorting order', function() {
			expect(_.sortedIndex([10, 20, 30, 40, 50], 35)).to.eql(3);
		});

		it('works also for objects', function() {
			var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}],
					result = _.sortedIndex(stooges, {name: 'larry', age: 50}, 'age');	

			expect(result).to.eql(1);
		});  	
  });

  describe('_.findIndex(array, predicate, [context]) - Similar to _.indexOf, returns the first index where the predicate truth test passes; otherwise returns -1', function() {
		it('finds first even number index', function() {
			var list = [1, 2, 3, 4, 5, 7, 9, 10];

			expect(_.findIndex(list, function (number) {
				return (number % 2) === 0;
			})).to.eql(1);
		});  	
  });

  describe('_.findLastIndex(array, predicate, [context]) - Like to _.indexOf, returns the last index where the predicate truth test passes; otherwise returns -1', function() {
		it('finds last even number index', function() {
			var list = [1, 2, 3, 4, 5, 7, 9, 10];

			expect(_.findLastIndex(list, function (number) {
				return (number % 2) === 0;
			})).to.eql(7);
		}); 

		it('works also with objects', function() {
			var objects = [
				{ id: 1, name: 'peter'},
				{ id: 2, name: 'tom'},
				{ id: 3, name: 'peter'},
				{ id: 4, name: 'john'},
			]

			expect(_.findLastIndex(objects, { name: 'peter' })).to.eql(2);
		}); 	
  });

  describe('_.range([start], stop, [step]) - A function to create flexibly-numbered lists of integers, handy for each and map loops', function() {
  	it('should behave...', function() {
  		expect(_.range(5)).to.eql([0, 1, 2, 3, 4]);
  		expect(_.range(1, 5)).to.eql([1, 2, 3, 4]);
  		expect(_.range(0, 10, 2)).to.eql([0, 2, 4, 6, 8]);
  		expect(_.range(1, 10, 2)).to.eql([1, 3, 5, 7, 9]);
  	});	
  });

});