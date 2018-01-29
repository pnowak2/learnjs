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
      it('should be possible to chain assignments', () => {
        let a, b, c;
        a = b = c = 2 + 2;

        expect(a).to.eql(4);
        expect(b).to.eql(4);
        expect(c).to.eql(4);
      });

      it('should return value too', () => {
        let x;
        expect(x = 'test').to.eql('test');
      });
    });

    describe('Remainder %', () => {
      it('should return remainder of integer division', () => {
        expect(10 % 3).to.eql(1);
        expect(10 % 2).to.eql(0);
      });
    });

    describe('Exponentiation **', () => {
      it('should work as x^n or Math.pow (i suppose)', () => {
        expect(3 ** 3).to.eql(27);
        expect(Math.pow(3, 3)).to.eql(27);
      });
    });

    describe('Increment / Decrement', () => {
      it('should increment by 1', () => {
        let counter = 2;
        counter++;
        expect(counter).to.eql(3);

        expect(++counter).to.eql(4);
      });

      it('should decrement by 1', () => {
        let counter = 2;
        counter--;
        expect(counter).to.eql(1);

        expect(--counter).to.eql(0);
      });
    });

    describe('Bitwise operators', () => {
      it('should have those operators', () => {
        // AND ( & )
        // OR ( | )
        // XOR ( ^ )
        // NOT ( ~ )
        // LEFT SHIFT ( << )
        // RIGHT SHIFT ( >> )
        // ZERO-FILL RIGHT SHIFT ( >>> )
      });

      it('should increment by 1', () => {
        let reg = 0xf & 0b100;

        expect(reg).to.eql(0x4);
      });
    });

    describe('Modify in Place', () => {
      it('should use shorthand modify in place syntax', () => {
        let n = 2;
        n += 5;

        expect(n).to.eql(7);
      });
    });

    describe('Comma', () => {
      it('should evaluate all expressions, but return only last one', () => {
        expect((1 + 2, 3 + 4)).to.eql(7);
      });
    });
  });
  
  describe('2.8 Comparisons', () => {
    it('should read the section', function () { });

    describe('Boolean as Result', () => {
      it('should return always boolean', () => {
        expect(2 > 1).to.eql(true);
      });
    });

    describe('String Comparison', () => {
      it('should compare string treating as numbers from ascii (my simplification)', () => {
        expect('Z' > 'A').to.eql(true);
      });

      it('should compare strings char by char', () => {
        // G is the same as G.
        // l is the same as l.
        // o is greater than e. Stop here. The first string is greater.
        expect('Glow' > 'Glee').to.eql(true);
      });
    });

    describe('Comparison of Different Types', () => {
      it('should convert to numbers before compare', () => {
        expect('2' > 1).to.eql(true); // string '2' becomes number first
        expect(true > 0).to.eql(true);
        // because
        expect(Number(true)).to.eql(1);
      });
    });

    describe('Strict equality', () => {
      it('should not use equality check for secure comparisons', () => {
        // works because types are converted to number by == operator
        expect(0 == false).to.be.true;
      });

      it('should use strict equality check for secure comparisons', () => {
        // no type conversion made here below
        expect(0 === false).to.be.false;
      });
    });

    describe('Comparison with Null and Undefined', () => {
      it('should work as expected with strict equality', () => {
        // works because types are converted to number by == operator
        expect(null === undefined).to.be.false;
      });

      it('should NOT work as expected with normal equality', () => {
        // works because types are converted to number by == operator
        expect(null == undefined).to.be.true;

        // even though those are different when converted to number
        expect(Number(null)).to.eql(0);
        expect(Number(undefined)).to.eql(NaN);
      });
    });
  });
  
  describe('2.9 Interaction alert, prompt, confirm', () => {
    it('should read the section', function () { });
    
    describe('Name of the group', () => {
      it('should behave...', () => {
        
      });
    });
  });
});