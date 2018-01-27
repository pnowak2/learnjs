var expect = require('chai').expect;
var _ = require('lodash');

describe('1 Becoming Functional', () => {
  describe('1.2 What is Functional Programming', () => {
    describe('1.2.1 Functional Programming is Declarative', () => {
      it('should try imperative way', () => {
        var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < array.length; i++) {
          array[i] = Math.pow(array[i], 2);
        }

        expect(array).to.eql([0, 1, 4, 9, 16, 25, 36, 49, 64, 81]);
      });

      it('should shift to functional approach', () => {
        var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => Math.pow(num, 2));

        expect(array).to.eql([0, 1, 4, 9, 16, 25, 36, 49, 64, 81]);
      });
    });

    describe('1.2.2 Pure functions and the problem with side effects', () => {
      it('should review function with side effects', () => {
        var counter = 0;
        function increment() {
          return ++counter;
        }

        increment();
        increment();

        expect(counter).to.eql(2);
      });
    });

    describe('1.2.3 Referential transparency and substitutability', () => {
      it('should review function which is NOT referential transparent because of external dependency variable', () => {
        var counter = 0;
        function increment() {
          return ++counter;
        }

        increment();
        increment();

        expect(counter).to.eql(2);
      });

      it('should review function which is referential transparent, no side effects, no dependencies', () => {
        let increment = counter => counter + 1;

        let result = increment(0);
        let result2 = increment(result);

        expect(result2).to.eql(2);
      });

      it('should compose referential transparent functions to achieve effect', () => {
        var sum = (total, current) => total + current;
        var total = arr => arr.reduce(sum);
        var size = arr => arr.length;
        var divide = (a, b) => a / b;
        var average = arr => divide(total(arr), size(arr));

        expect(average([2, 3, 5, 10])).to.eql(5);
      });
    });

    describe('1.2.4 Preserving Immutable Data', () => {
      it('should be careful with modifying data (modified array elements, working on the same reference)', () => {
        var sortDesc = function (arr) {
          return arr.sort(function (a, b) {
            return b - a;
          });
        }

        var arr = [1, 2, 3, 4];
        var result = sortDesc(arr);

        expect(result).to.equal(arr); // Bad, should be a copy !
        expect(result).to.eql([4, 3, 2, 1]);
      });
    });
  });

  describe('1.3 Benefits of Functional Programming', () => {
    describe('1.3.1 Encouraging the decomposition of complex tasks', () => {
      it('should simplify tasks to lower level functions and compose with them more complicated features', () => {
        let find = function(id) { 
          return ['a', 'b', 'b', 'c'].filter(function(val) {
            return id === val;
          }) 
        }

        let uppercase = function(text) {
          return text.toUpperCase();
        }

        let last = function(arr) {
          return arr[arr.length - 1];
        }

        expect(find('b')).to.eql(['b', 'b']);
        expect(uppercase('peter')).to.eql('PETER');
        expect(last([1, 2, 3])).to.eql(3);

        expect(uppercase(last(find('b')))).to.eql('B');
      });
    });

    describe('1.3.2 Processing Data with Fluent Chains', () => {
      it('should chain functions to get rid of loops', () => {
        let enrollment = [
          { enrolled: 2, grade: 100 },
          { enrolled: 2, grade: 80 },
          { enrolled: 1, grade: 89 }
        ];

        let result = _.chain(enrollment)
          .filter(student => student.enrolled > 1)
          .map('grade')
          .value();

        expect(result).to.eql([100, 80]);
      });
    });
  });
});