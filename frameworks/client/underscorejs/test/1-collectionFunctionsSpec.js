var expect = require('chai').expect;
var _ = require('underscore');

describe('collection functions', function() {

  describe('_.each(list, iteratee, [context]) - iterates over list of elements', function() {
    it('simple iteration', function() {
      var result = '';
      _.each([1, 2, 3], function(element) {
        result += element;
      });

      expect(result).to.equal('123');
    });

    it('arguments passed to iteratee - element, index, list', function() {
      _.each([1, 2, 3], function(element, index, list) {
        expect(element).to.equal(index + 1);
        expect(list).to.deep.equal([1, 2, 3]);
      });
    });

    it('works on arrays, objects, array like objects like arguments', function() {
      var result = '';

      _.each({
        a: 1,
        b: 2,
        c: 3
      }, function(element, index) {
        result += (element + index)
      });

      expect(result).to.equal('1a2b3c');
    });
  });

  describe('_.map(list, iteratee, [context]) - produces new array by mapping each value', function() {
    it('simple map', function() {
      var result = _.map([1, 2, 3], function(num) {
        return num * 3;
      });

      expect(result).to.eql([3, 6, 9]);
    });

    it('arguments passed to iteratee - value, index, list', function() {
      var result = _.map([1, 2, 3], function(value, index, list) {
        return value * index /* 0, 1, 2, ... */ ;
      });

      expect(result).to.eql([0, 2, 6]);
    });
  });

  describe('_.reduce(list, iteratee, [memo], [context]) - (inject, foldl) reduces list to single value', function() {
    it('memo is the initial state of reduction', function() {
      var result = _.reduce([1, 2, 3], function(memo, num) {
        return memo + num;
      }, 0);

      expect(result).to.eql(6);
    });
  });

  describe('.reduceRight(list, iteratee, memo, [context]) - same as reduce but takes element from right side', function() {
    var result = _.reduceRight([1, 2, 3], function(memo, num) {
      return '' + memo + num;
    }, 4);

    expect(result).to.eql('4321');
  });

  describe('_.find(list, predicate, [context]) - Looks through each value in the list, returning the first one that passes a truth test (predicate), or undefined if no value passes the test', function() {
    it('find even numbers', function() {
      var even = _.find([1, 2, 3, 4, 5, 6], function(number) {
        return number % 2 === 0;
      });

      expect(even).to.eql(2);
    });
  });

  describe('_.filter(list, predicate, [context]) - Looks through each value in the list, returning an array of all the values that pass a truth test', function() {
    it('find even numbers', function() {
      var evens = _.filter([1, 2, 3, 4, 5, 6], function(number) {
        return number % 2 === 0;
      });

      expect(evens).to.eql([2, 4, 6]);
    });
  });

  describe('_.where(list, properties) - Looks through each value in the list, returning an array of all the values that contain all of the key-value pairs listed in properties', function() {
    it('finds persons', function() {
      var list = [{
        type: 'person',
        name: 'john'
      }, {
        type: 'job',
        name: 'developer'
      }, {
        type: 'person',
        name: 'peter'
      }, {
        type: 'thing',
        name: 'tdd'
      }];

      var persons = _.where(list, {
        type: 'person'
      });

      expect(persons).to.eql([{
        type: 'person',
        name: 'john'
      }, {
        type: 'person',
        name: 'peter'
      }]);
    });
  });

  describe('_.findWhere(list, properties) - Looks through the list and returns the first value that matches all of the key-value pairs listed in properties', function() {
    it('find first person', function() {
      var list = [{
        type: 'person',
        name: 'john'
      }, {
        type: 'job',
        name: 'developer'
      }, {
        type: 'person',
        name: 'peter'
      }, {
        type: 'thing',
        name: 'tdd'
      }];

      var persons = _.findWhere(list, {
        type: 'person'
      });

      expect(persons).to.eql({
        type: 'person',
        name: 'john'
      });
    });
  });

  describe('_.reject(list, predicate, [context]) - Returns the values in list without the elements that the truth test (predicate) passes. The opposite of filter. ', function() {
    it('reject bigger or equal than 3', function() {
      var rejected = _.reject([1, 2, 3, 4, 5, 6], function(num) {
        return num >= 3
      });

      expect(rejected).to.eql([1, 2]);
    });
  });

  describe('_.every(list, [predicate], [context]), alias .all - Returns true if all of the values in the list pass the predicate truth test', function() {
    it('checks if all numbers are even', function() {
      var areAllEven = _.every /*_.all*/ ([2, 4, 8, 16, 256], function(num) {
        return num % 2 === 0;
      });

      expect(areAllEven).to.be.true;
    });
  });

  describe('_.some(list, [predicate], [context]), alias .any - Returns true if any of the values in the list pass the predicate truth test', function() {
    it('checks if all numbers are even', function() {
      var areSomeEven = _.some /*_.any*/ ([1, 3, 5, 8, 9, 17], function(num) {
        return num % 2 === 0;
      });

      expect(areSomeEven).to.be.true;
    });
  });

  describe('_.contains(list, value, [fromIndex]) - Returns true if the value is present in the list', function() {
    it('has 3 inside', function() {
      expect(_.contains([1, 2, 3], 3)).to.be.true;
    });
  });

  describe('_.invoke(list, methodName, *arguments) - Calls the method named by methodName on each value in the list', function() {
    it('should uppercase letters', function() {
      var result = _.invoke(['a', 'b'], 'toUpperCase');

      expect(result).to.eql(['A', 'B']);
    });
  });

  describe('_.pluck(list, propertyName) - A convenient version of what is perhaps the most common use-case for map: extracting a list of property values', function() {
    it('retrieve names', function() {
      var list = [{
        id: 1,
        name: 'peter',
        age: 35
      }, {
        id: 2,
        name: 'john',
        age: 24
      }, {
        id: 3,
        name: 'barry',
        age: 62
      }, ];

      var names = _.pluck(list, 'name');

      expect(names).to.eql(['peter', 'john', 'barry']);
    });
  });

  describe('_.max(list, [iteratee], [context]) - Returns the maximum value in list', function() {
    it('should get oldest member', function() {
      var list = [{
        id: 1,
        name: 'peter',
        age: 35
      }, {
        id: 2,
        name: 'john',
        age: 24
      }, {
        id: 3,
        name: 'barry',
        age: 62
      }, ];

      var oldest = _.max(list, function(member) {
        return member.age;
      });

      expect(oldest).to.be.an('object');
      expect(oldest).to.have.property('age', 62);
    });
  });

  describe('_.min(list, [iteratee], [context]) - Returns the minimum value in list', function() {
    it('should get youngest member', function() {
      var list = [{
        id: 1,
        name: 'peter',
        age: 35
      }, {
        id: 2,
        name: 'john',
        age: 24
      }, {
        id: 3,
        name: 'barry',
        age: 62
      }, ];

      var youngest = _.min(list, function(member) {
        return member.age;
      });

      expect(youngest).to.be.an('object');
      expect(youngest).to.have.property('age', 24);
    });
  });

  describe('_.sortBy(list, iteratee, [context]) - Returns a (stably) sorted copy of list, ranked in ascending order by the results of running each value through iteratee', function() {
    it('sort stooges by name', function() {
      var stooges = [{
        name: 'moe',
        age: 40
      }, {
        name: 'larry',
        age: 50
      }, {
        name: 'curly',
        age: 60
      }];

      var sorted = _.sortBy(stooges, 'name');

      expect(sorted).to.eql([{
        name: 'curly',
        age: 60
      }, {
        name: 'larry',
        age: 50
      }, {
        name: 'moe',
        age: 40
      }])
    });
  });

  describe('_.groupBy(list, iteratee, [context]) - Splits a collection into sets, grouped by the result of running each value through iteratee', function() {
    it('group by whole numbers', function() {
      var list = [1.1, 1.2, 2.6, 2.7];

      var grouped = _.groupBy(list, function(num) {
        return Math.floor(num);
      });

      expect(grouped).to.eql({
        1: [1.1, 1.2],
        2: [2.6, 2.7]
      })
    });
  });

  describe('_.indexBy(list, iteratee, [context]) - Given a list, and an iteratee function that returns a key for each element in the list (or a property name), returns an object with an index of each item', function() {
    it('group by whole numbers', function() {
      var list = [{
        name: 'moe',
        age: 40
      }, {
        name: 'larry',
        age: 50
      }];

      var grouped = _.indexBy(list, 'age');

      expect(grouped).to.eql({
        '40': {
          name: 'moe',
          age: 40
        },
        '50': {
          name: 'larry',
          age: 50
        }
      })
    });
  });

  describe('_.countBy(list, iteratee, [context]) - Sorts a list into groups and returns a count for the number of objects in each group', function() {
    it('count how many even and odd numbers are in the array', function() {
      var list = [1, 2, 3, 4, 5, 6, 7];

      var counted = _.countBy(list, function(number) {
        return number % 2 === 0 ? 'even' : 'odd'
      });

      expect(counted).to.eql({
        'even': 3,
        'odd': 4
      })
    });
  });

  describe('_.shuffle(list) - Returns a shuffled copy of the list', function() {
    it('shuffle the array', function() {
      var shuffled = _.shuffle([1, 2, 3, 4, 5]);

      expect(shuffled).to.contain(1, 2, 3, 4, 5);
    });
  });

  describe('_.sample(list, [n]) - Produce a random sample from the list. Pass a number to return n random elements from the list', function() {
    it('take one random number from list', function() {
      var list = [1, 2, 3, 4, 5, 6];

      var sampledOne = _.sample(list);

      expect(sampledOne)
        .to.be.a('number')
        .and.within(1, 6);
    });

    it('take 3 random numbers from list', function() {
      var list = [1, 2, 3, 4, 5, 6];

      var sampledThree = _.sample(list, 3);

      expect(sampledThree)
        .to.be.an('array')
        .with.length(3);
    });
  });

  describe('_.toArray(list) - Creates a real Array from the list (anything that can be iterated over). Useful for transmuting the arguments object', function() {
    it('converts arguments to array', function() {
      var result = (function() {
        return _.toArray(arguments)
      })(1, 2, 3, 4);

      expect(result)
      	.to.be.an('array')
      	.with.length(4);
    });
  });

  describe('_.size(list) - Return the number of values in the list', function() {

  	it('checks size of the array', function() {
  		expect(_.size([1, 2, 3, 4])).to.eql(4);
  	});

  	it('checks size of object (keys)', function() {
  		var obj = {
  			name: 'peter',
  			age: 35,
  			proffession: 'developer'
  		}

  		expect(_.size(obj)).to.eql(3);
  	});
  });

  describe('_.partition(array, predicate) - Split array into two arrays: one whose elements all satisfy predicate and one whose elements all do not satisfy predicate', function() {
  	it('split dogs from cats', function() {
  		var list = [
  			{ type: 'dog', name: 'butch'},
  			{ type: 'cat', name: 'cattie'},
  			{ type: 'dog', name: 'rusty'},
  			{ type: 'dog', name: 'azor'},
  			{ type: 'cat', name: 'meowee'},
  		];

  		var result = _.partition(list, function (obj) {
  			return obj.type === 'dog';
  		});

  		expect(result).to.eql([
  			[
  				{ type: 'dog', name: 'butch'},
  				{ type: 'dog', name: 'rusty'},
  				{ type: 'dog', name: 'azor'}
  			],
  			[
  				{ type: 'cat', name: 'cattie'},
  				{ type: 'cat', name: 'meowee'}
  			]
  		])
  	});
  });
});
