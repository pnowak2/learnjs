var expect = require('chai').expect;
var sinon = require('sinon');

describe('5. Data Types', () => {
  describe('5.1 Methods of Primitives', function () {
    it('should read the section', function () { });

    describe('A primitive as an object', () => {
      it('should have wrapper for primitive when accessing its methods', () => {

      });

      it('should have wrappers for String, Number, Boolean and Symbol', () => {
        // i.e.
        let str = 'hello';

        expect(str.toUpperCase()).to.eql('HELLO'); // wrapped to String when method called
      });
    });

    describe('null / undefined', () => {
      it('should have no methods, no wrappers', () => {

      });
    });
  });

  describe('5.2 Numbers', () => {
    describe('More ways to write a number', () => {
      it('should write billion', () => {
        let billion = 1000000000;
      });

      it('should exp notation', () => {
        let billion = 1e9;
      });

      it('should use hex, binary and octal notations', () => {
        let x = 0xff;
        let y = 0b111;
        let z = 0o22;
      });
    });

    describe('toString(base)', () => {
      it('should format with given notation', () => {
        expect((255).toString(16)).to.eql('ff');
        expect((255).toString(8)).to.eql('377');
        expect((255).toString(2)).to.eql('11111111');
      });

      it('should use .. notation to call method directly on number primitive', () => {
        expect(255..toString(16)).to.eql('ff');
      });
    });

    describe('Rounding', () => {
      it('should use Math.floor to round down', () => {
        expect(Math.floor(3.1)).to.eql(3);
      });

      it('should use Math.ceil to round up', () => {
        expect(Math.ceil(3.1)).to.eql(4);
      });

      it('should use Math.round to round to closest integer', () => {
        expect(Math.round(3.1)).to.eql(3);
        expect(Math.round(3.55)).to.eql(4);
      });

      it('should use Math.trunc to remove everything after dot', () => {
        expect(Math.trunc(3.1)).to.eql(3);
      });

      it('should round to two spaces after dot', () => {
        expect(Math.floor(3.183 * 100) / 100).to.eql(3.18);
      });

      it('should use number.toFixed() to return string, rounded to n digits after the point', () => {
        expect(3.183.toFixed(2)).to.eql('3.18');
        expect(+3.183.toFixed(2)).to.eql(3.18);
      });
    });

    describe('Imprecise Calculations', () => {
      it('should have problem with decimals', () => {
        expect(0.1 + 0.2).not.to.eql(0.3);
        expect(0.1 + 0.2).to.be.closeTo(0.3, 0.0000000000000001);
      });
    });

    describe('Infinite, NaN, isFinite, isNaN', () => {
      it('should use Infinite', () => {
        expect(Infinity).to.equal(1 / 0);
        expect(-Infinity).to.equal(-1 / 0);
      });

      it('should use isInfinite()', () => {
        expect(isFinite(1 / 0)).to.be.false;
      });

      it('should use NaN', () => {
        expect('a' / 2).to.eql(NaN);
      });

      it('should use isNan()', () => {
        expect(isNaN('a' / 2)).to.be.true;
      });
    });

    describe('Object.is', () => {
      it('should compare tricky cases', () => {
        expect(Object.is(NaN, NaN)).to.be.true;
        expect(Object.is(Infinity, Infinity)).to.be.true;
        expect(Object.is(0, -0)).to.be.false;
      });
    });

    describe('parseInt() and parseFloat()', () => {
      it('should read number from string if its possible', () => {
        expect(parseInt('100px')).to.eql(100);
        expect(parseFloat('54.72pt')).to.eql(54.72);
      });

      it('should return NaN for string non convertible to numbers', () => {
        expect(parseInt('a12')).to.be.NaN;
        expect(parseFloat('g12.5')).to.be.NaN;
      });

      it('should use radix to tell base conversion type', () => {
        expect(parseInt(15, 10)).to.eql(15);
        expect(parseInt('0xff', 16)).to.eql(255);
      });
    });

    describe('Other math functions', () => {
      it('should user Math.random() to generate numbers', () => {
        expect(Math.random()).to.be.closeTo(0.5, 0.5);
      });

      it('should use Math.max and Math.min', () => {
        expect(Math.max(1, 2)).to.eql(2);
        expect(Math.min(1, 2)).to.eql(1);
      });
    });
  });

  describe('5.3 Strings', () => {
    describe('Quotes', () => {
      it('should use double quotes', () => {
        const s = "test";
        expect(s).to.eql('test');
      });

      it('should use single quotes', () => {
        const s = 'test';
        expect(s).to.eql('test');
      });

      it('should use backticks for multiline', () => {
        const s = `
          hello
          world
        `;
        expect(s).to.eql('\n          hello\n          world\n        ');
      });

      it('should use backticks for interpolation', () => {
        const name = 'peter';
        const s = `test ${name}`;
        expect(s).to.eql('test peter');
      });
    });

    describe('Special Characters', () => {
      it('should use new line symbol', () => {
        const line = 'hello\nworld';
        expect(line).to.eql(`hello
world`);

        it('should escape with \\', () => {
          let line = 'hello \'peter\'';

          expect(line).to.eql(`hello 'peter'`);
        });
      });
    });
  });
});

