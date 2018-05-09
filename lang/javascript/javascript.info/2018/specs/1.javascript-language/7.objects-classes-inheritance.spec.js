var expect = require('chai').expect;
var sinon = require('sinon');

describe('7. Objects, Classes, Inheritance', () => {
  describe('7.1 Property Flags And Descriptors', function () {
    it('should be configurable', () => { });
    it('should be writable', () => { });
    it('should be enumerable', () => { });

    describe('Object.getOwnPropertyDescriptor()', () => {
      it('should retrieve property descriptor', () => {
        let user = {
          name: 'peter'
        };

        let descr = Object.getOwnPropertyDescriptor(user, 'name');

        expect(descr.configurable).to.eql(true);
        expect(descr.writable).to.eql(true);
        expect(descr.enumerable).to.eql(true);
        expect(descr.value).to.eql('peter');
      });
    });

    describe('Object.defineProperty()', () => {
      it('should define property for object', () => {
        let user = {
          name: 'peter'
        };

        Object.defineProperty(user, 'age', {
          writable: false,
          configurable: false,
          enumerable: false,
          value: 12
        });

        expect(user.age).to.eql(12);
      });
    });

    describe('Object.defineProperties()', () => {
      it('should define properties for object', () => {
        let user = {
          name: 'peter'
        };

        Object.defineProperties(user, {
          age: {
            value: 38
          },
          job: {
            value: 'it guy'
          }
        });

        expect(user.age).to.eql(38);
        expect(user.job).to.eql('it guy');
      }); 
    });

    describe('Object.getOwnPropertyDescriptors()', () => {
      it('should get own property descriptors', () => {
        let user = {
          name: 'peter'
        };

        let descrs = Object.getOwnPropertyDescriptors(user);
        console.log(descrs);
        expect(descrs.name.value).to.eql('peter');
      });
    });

    describe('Sealing an object globally', () => {
      it('Object.preventExtensions() - forbids adding properties', () => { });
      it('Object.seal() - forbids adding / removing properites, configurable = false', () => { });
      it('Object.freeze() - forbids adding / removing / modifiying properties, configurable = false, writable = false', () => { });
      it('Object.isExtensible()', () => { });
      it('Object.isSealed()', () => { });
      it('Object.isFrozen()', () => { });
    });
  });

  describe('7.2 Property Getters and Setters', () => {
    it('should behave...', () => {
      
    }); 
  });
});