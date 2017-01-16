import { expect } from 'chai';
import Person from '../src/model/person';
import Address from '../src/model/address';

describe('3 Few data structures, many operations', () => {
  const p1 = new Person('Haskell', 'Curry', '111-11-1111');
  p1.address = new Address('US');
  p1.birthYear = 1900;

  const p2 = new Person('Barkley', 'Rosser', '222-22-2222');
  p2.address = new Address('Greece');
  p2.birthYear = 1907;

  const p3 = new Person('John', 'von Neumann', '333-33-3333');
  p3.address = new Address('Hungary');
  p3.birthYear = 1903;

  const p4 = new Person('Alonzo', 'Church', '444-44-4444');
  p4.address = new Address('US');
  p4.birthYear = 1903;

  describe('3.3.1 Understanding lambda expressions', () => {
    it('should create compact function notation', () => {
      const name = p => p.fullname;

      expect(name(p1)).to.eql('Haskell Curry');
    });
  });
});