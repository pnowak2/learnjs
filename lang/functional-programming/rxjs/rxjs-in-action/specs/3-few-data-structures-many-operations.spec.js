import { expect } from 'chai';
import _ from 'lodash';
import Person from '../src/model/person';
import Address from '../src/model/address';

describe('3 Few data structures, many operations', () => {
  const p1 = new Person('Haskell', 'Curry', '111-11-1111');
  p1.address = new Address('US');
  p1.birthYear = 1900;
  ``
  const p2 = new Person('Barkley', 'Rosser', '222-22-2222');
  p2.address = new Address('Greece');
  p2.birthYear = 1907;

  const p3 = new Person('John', 'von Neumann', '333-33-3333');
  p3.address = new Address('Hungary');
  p3.birthYear = 1903;

  const p4 = new Person('Alonzo', 'Church', '444-44-4444');
  p4.address = new Address('US');
  p4.birthYear = 1903;

  describe('3.3 Function chaining', () => {
    describe('3.3.1 Understanding lambda expressions', () => {
      it('should create compact function notation', () => {
        const name = p => p.fullname;

        expect(name(p1)).to.eql('Haskell Curry');
      });
    });

    describe('3.3.2 Transforming data with _.map', () => {
      it('should transform array without for loops', () => {
        var result = [];
        var persons = [p1, p2];

        result = _.map(persons, s => (s !== null && s !== undefined) ? s.fullname : '');

        expect(result).to.eql(['Haskell Curry', 'Barkley Rosser'])
      });
    });

    describe('3.3.3 Gathering results with _.reduce', () => {
      it('should reduce array without for loops', () => {
        var result = [];
        var persons = [p1, p2, p3, p4];

        result = persons.reduce(function (stat, person) {
          const country = person.address.country;
          stat[country] = _.isUndefined(stat[country]) ? 1 : stat[country] + 1;
          return stat;
        }, {});

        expect(result).to.eql({
          'US': 2,
          'Greece': 1,
          'Hungary': 1
        })
      });
    });

    describe('3.3.4 Removing unwanted elements with _.filter', () => {
      it('should filter array without for loops', () => {
        var result = [];
        var persons = [p1, p2, p3, p4];

        result = _(persons)
          .filter(function (p) {
            return p.birthYear > 1903
          })
          .map(function (p) {
            return p.fullname;
          }).value();

        expect(result).to.eql(['Barkley Rosser'])
      });
    });
  });

  describe('3.4 Reasoning about your code', () => {
    describe('3.4.1 Declarative and lazy function chains', () => {
      it('should use functional version', () => {
        var names = [
          'alonzo church',
          'Haskell curry',
          'stephen_kleene',
          'John Von Neumann',
          'stephen_kleene'
        ];

        let isValid = p => p !== undefined;

        let result = _.chain(names)
          .filter(isValid)
          .map(s => s.replace(/_/, ' '))
          .uniq()
          .map(_.startCase)
          .sort()
          .value();

        expect(result).to.eql(['Alonzo Church', 'Haskell Curry', 'John Von Neumann', 'Stephen Kleene']);
      });
    });

    describe('3.4.2 SQL-like data: functions as data', () => {
      it('should use sql like query', () => {
        _.mixin({
          'select': _.pluck,
          'from': _.chain,
          'where': _.filter,
          'groupBy': _.sortByOrder
        });

        var persons = [p1, p2, p3, p4];

        let result = _.from(persons)
          .where(p => p.birthYear > 1900 && p.address.country !== 'US')
          .filter('firstname', 'birthYear')
          .map(p => p.firstname)
          .value();

        expect(result).to.eql(['Barkley', 'John']);
      });
    });
  });

  describe('3.5 Learning to think recursively', () => {
    describe('3.5.2 Learning to think recursively', () => {
      it('should take imperative approach', () => {

        var nums = [1, 2, 3, 4];
        var acc = 0;
        for (let i = 0; i < nums.length; i++) {
          acc += nums[i];
        }

        expect(acc).to.eql(10);
      });

      it('should take functional approach', () => {
        var nums = [1, 2, 3, 4];
        var result = _(nums).reduce(function(acc, current) {
          return acc + current;
        }, 0);

        expect(result).to.eql(10);
      });

      it('should take recursive approach', () => {
        var nums = [1, 2, 3, 4];

        function sum(arr) {
          if(_.isEmpty(arr)) {
            return 0;
          }

          return _.head(arr) + sum(_.tail(arr));
        }

        expect(sum(nums)).to.eql(10);
      });
    });
  });

});