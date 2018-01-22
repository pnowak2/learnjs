import { expect } from 'chai';

describe('Symbols', () => {
  describe('Introduction', () => {
    // does not compile for some reason Symbol is not recognized in ts
    // it('should declare symbol', () => {
    //   let s = Symbol();
    // });

    // it('should declare symbol with string key', () => {
    //   let s = Symbol('key');
    // });

    // it('should declare symbol with string key and those are different', () => {
    //   let s1 = Symbol('key');
    //   let s2 = Symbol('key');

    //   expect(s1 === s2).to.be.false;
    // });

    // it('should use symbols as object properties', () => {
    //   let s = Symbol('key');
    //   const obj = {
    //     [s]: 'hello'
    //   }

    //   expect(obj[s]).to.eql('hello');
    // });

    // it('should use symbols as class properties/methods', () => {
    //   let s = Symbol('key');
    //   class Person {
    //     [s](): string {
    //       return 'world';
    //     }
    //   }

    //   expect(new Person()[s]()).to.eql('hello');
    // });
  });
});
