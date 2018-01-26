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

      it('should convert null to 0', () => {
        expect(Number(null)).to.eql(0);
      });

      it('should convert true to 1', () => {
        expect(Number(true)).to.eql(1);
      });

      it('should convert false to 0', () => {
        expect(Number(false)).to.eql(0);
      });

      it('should convert empty space to 0', () => {
        expect(Number('')).to.eql(0);
      });

      it('should convert "abc" space to NaN', () => {
        expect(Number('abc')).to.eql(NaN);
      });
    });

    describe('ToBoolean', () => {
      it('should convert 1 to true', () => {
        expect(Boolean(1)).to.eql(true);
      });

      it('should convert 0 to false', () => {
        expect(Boolean(0)).to.eql(false);
      });

      it('should empty string to false', () => {
        expect(Boolean('')).to.eql(false);
      });

      it('should nont empty string to true', () => {
        expect(Boolean('abc')).to.eql(true);
      });
    });
  });

  describe('2.7 Operators"', function () {
    it('should read the section', function () { });


    describe('Concatenation with +', () => {
      it('should concatenate strings', () => {
        expect('my' + 'string').to.eql('mystring');
      });

      it('should concatenate string and number converting number to string', () => {
        expect('1' + 2).to.eql('12');
      });

      it('should not concatenate string and number with anything other than plus operator', () => {
        expect('1' - 2).to.eql(-1);
      });
    });

    describe('Unary +', () => {
      it('should do nothing with numbers', () => {
        expect(+5).to.eql(5);
      });

      it('should convert to number for non numbers', () => {
        expect(+'5').to.eql(5);
        expect(+'').to.eql(0);
        expect(+true).to.eql(1);
      });

      it('should sum two strings as numbers (like got them from html inputs)', () => {
        const inp1 = '5';
        const inp2 = '6';

        expect(+inp1 + +inp2).to.eql(11);
      });

    });

    describe('Assignment', () => {
    });
  });
});