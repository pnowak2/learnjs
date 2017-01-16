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
      it('should use imperative version', () => {

      });
    });
  });

});