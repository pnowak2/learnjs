import {
  expect
}
from 'chai';

describe('Symbols', function() {
  describe('creating symbols', function() {
    it('should have no literal way to create symbol', function() {
      var firstName = Symbol();
      expect(firstName).to.be.ok;
    });

    it('should have symbols as object property identifier', function() {
      var firstName = Symbol();
      var person = {};

      person[firstName] = 'Peter';

      expect(person[firstName]).to.eql('Peter');
      expect(person.firstName).to.be.undefined;
    });

    it('should have description for debugging purposes', function() {
      var firstName = Symbol('first name');

      expect(firstName.toString()).to.eql('Symbol(first name)');
    });

    it('should check with typeof for Symbol', function() {
      expect(typeof Symbol()).to.eql('symbol');
    });
  });

  describe('Using Symbols', function() {
    beforeEach(function() {
      this.firstName = Symbol('first name');
    });

    it('should use symbol as computed property', function() {
      var person = {
        [this.firstName]: 'Peter'
      }

      expect(person[this.firstName]).to.eql('Peter');
    });

    it('should use symbol with defineProperty', function() {
      var person = {};
      var lastName = Symbol('last name');

      Object.defineProperty(person, this.firstName, {
        value: 'Peter',
        writable: false
      });

      Object.defineProperties(person, {
        [lastName]: {
          value: 'Nowak',
          writable: false
        }
      });

      expect(person[this.firstName]).to.eql('Peter');
      expect(person[lastName]).to.eql('Nowak');
    });
  });

  describe('Sharing symbols', function() {
  	it('should use Symbol.for()', function() {
  		var uid = Symbol.for('uid');
  		var obj = {};

  		obj[uid] = '12345';

  		expect(obj[Symbol.for('uid')]).to.eql('12345');
  	});

  	it('should use Symbol.keyFor()', function() {
  		var uid = Symbol.for('uid');
  		
  		expect(Symbol.keyFor(uid)).to.eql('uid');
  	});
  });

  describe('Retrieving symbol properties', function() {
    it('Object.getOwnPropertySymbols() should return array with symbols', function() {
      let uid = Symbol.for('uid');
      let name = Symbol.for('name');

      let object = {
        [uid]: '12345',
        [name]: 'valor'
      };

      var symbols = Object.getOwnPropertySymbols(object);

      expect(symbols).to.be.an('array');
      expect(symbols).to.have.length(2);
      expect(symbols[0]).to.equal(uid);
      expect(symbols[1]).to.equal(name);
    });
  });

  describe('Exposing internal operations with well known symbols', function() {
    it('Symbol.hasInstance() redefine', function() {
      var MyObject = function () {};

      Object.defineProperty(MyObject, Symbol.hasInstance, {
        value: function (v) {
          return false;
        }
      });

      var obj = new MyObject;

      // does not work with babel
      // expect(obj instanceof MyObject).to.eql(false);
    });
  });
});