var expect = require('chai').expect;

describe('2. JavaScript Fundamentals', function () {
  describe('2.1 Hello, world!', function () {
    it('should read the section', function () { });
  });

  describe('2.2 Code Structure', function () {
    it('should read the section', function () { });
  });

  describe('2.3 The modern mode - "use strict"', function () {
    it('should read the section', function () { });
  });

  describe('2.4 Variables"', function () {
    it('should read the section', function () { });
  });

  describe('2.5 Data types"', function () {
    it('should read the section', function () { });

    describe('typeof', () => {
      it('should behave...', () => {
        expect(typeof 5).to.eql('number')
      });
    });

  });

  describe('2.6 Type Conversions"', function () {
    it('should read the section', function () { });

    describe('ToString', () => {
      it('should convert to string using String()', () => {
        expect(String(5)).to.eql('5');
      });

      it('should convert boolean to string', () => {
        expect(String(false)).to.eql('false');
      });
    });

    describe('ToNumber', () => {
      it('should convert string to numbers for math operations', () => {
        expect('6' / '3').to.eql(2);
      });

      it('should convert to number using Number()', () => {
        expect(Number('123')).to.eql(123);
        expect(typeof Number('123')).to.eql('number');
      });
      
      it('should convert undefined to NaN', () => {
        expect(Number(undefined)).to.be.NaN;
      });
        
    });
  });
});