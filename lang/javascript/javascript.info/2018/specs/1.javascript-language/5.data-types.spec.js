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
      it('should have no methods, no wrappers', () => { });
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

        it('should use string length', () => {
          expect('he\n'.length).to.eql(3);
        });
      });
    });

    describe('Accessing characters', () => {
      it('should use brackets []', () => {
        expect('string'[3]).to.eql('i');
      });

      it('should use charAt()', () => {
        expect('string'.charAt(3)).to.eql('i');
      });

      it('should see difference between [n] and charAt()', () => {
        expect('test'[22]).to.be.undefined;
        expect('test'[22]).not.to.eql('');
        expect('test'.charAt(22)).to.eql('');
      });
    });

    describe('Strings are Immutable', () => {
      it('should not be possible to change characterin string', () => {
        let str = 'hello';

        expect(function () {
          str[0] = 'b';
        }).to.throw();

        expect(str).to.eql('hello');
      });
    });

    describe('Changing The Case', () => {
      it('should change to upper', () => {
        expect('test'.toUpperCase()).to.eql('TEST');
      });

      it('should change to lower', () => {
        expect('TEST'.toLowerCase()).to.eql('test');
      });
    });

    describe('Searching For a Substring', () => {
      it('should use .indexOf()', () => {
        expect('test'.indexOf('st')).to.eql(2);
        expect('test'.indexOf('ast')).to.eql(-1);
      });

      it('should use .indexOf() with starting index position', () => {
        expect('hello'.indexOf('lo', 4)).to.eql(-1);
      });

      it('should use .lastIndexOf() to find index of last occurence', () => {
        expect('hello hello'.lastIndexOf('o')).to.eql(10);
      });

      it('should use ~ operator for bitwise NOT trick', () => {
        expect('test'.indexOf('test')).to.eql(0);
        // trick when using if
        expect(~'test'.indexOf('test')).to.eql(-1);

        expect(0b00000000000000000000000000000010).to.eql(2);
        expect(~0b00000000000000000000000000000010).to.eql(-3);

        expect(-0b11).to.eql(-3);
        expect(~2).to.eql(-3)
      });

      it('should use .includes()', () => {
        expect('hello'.includes('lo')).to.be.true;
      });

      it('should use .startsWith()', () => {
        expect('hello'.startsWith('he')).to.be.true;
      });

      it('should use .endsWith()', () => {
        expect('hello'.endsWith('lo')).to.be.true;
      });
    });

    describe('Getting a Substring', () => {
      it('should use .slice()', () => {
        expect('hello'.slice(1, 3)).to.eql('el');
        expect('hello'.slice(3)).to.eql('lo');
        expect('hello'.slice()).to.eql('hello');
      });

      it('should use .substring(), same as slice() but can have start bigger than end index', () => {
        expect('hello'.substring(1, 3)).to.eql('el');
      });

      it('should use .substr(), from start, with the given length', () => {
        expect('hello'.substr(1, 3)).to.eql('ell');
      });
    });

    describe('Comparing Strings', () => {
      it('should lower case be always greater than uppercase', () => {
        expect('a' > 'A').to.be.true;
      });

      it('should umlauts/diacritical be out of order', () => {
        expect('Österreich' > 'Zeeland').to.be.true;
      });

      it('should get number representation of character with .codePointAt()', () => {
        expect('a'.codePointAt(0)).to.eql(97);
        expect('A'.codePointAt(0)).to.eql(65);
      });

      it('should get character by number representation', () => {
        expect(String.fromCodePoint(97)).to.eql('a');
      });

      it('should see chars betwen 65.220', () => {
        let str = '';

        for (let i = 65; i <= 220; i++) {
          str += String.fromCodePoint(i);
        }

        expect(str).to.contain('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      });

      it('should use .localeCompare() (ie10 >) to properly compare strings', () => {
        expect('Österreich'.localeCompare('Zealand')).to.eql(-1);
      });
    });
  });

  describe('5.4 Arrays', () => {
    describe('Declaration', () => {
      it('should declare array with Object syntax', () => {
        let arr = new Array('a', 'b');

        expect(arr).to.eql(['a', 'b']);
      });

      it('should declare array with literal syntax', () => {
        let arr = ['a', 'b'];

        expect(arr).to.eql(['a', 'b']);
      });

      it('should retrieve value with square brackets', () => {
        const arr = ['a', 'b', 'c'];

        expect(arr[1]).to.eql('b');
      });

      it('should add new item to array ', () => {
        const arr = ['a', 'b', 'c'];

        arr[3] = 'd';

        expect(arr[3]).to.eql('d');
      });

      it('should check length of array', () => {
        const arr = ['a', 'b', 'c'];

        expect(arr.length).to.eql(3);
      });

      it('should have ability to keep different typed elements', () => {
        let arr = ['apple', { name: 'peter' }, 6];

        expect(arr[1].name).to.eql('peter');
      });
    });

    describe('Methods for putting / removing values', () => {
      describe('.push()', () => {
        it('should append element to the end', () => {
          let fruits = ['a', 'b'];
          fruits.push('c');

          expect(fruits).to.eql(['a', 'b', 'c']);
        });
      });

      describe('.pop()', () => {
        it('should remove last element from array and return it', () => {
          let fruits = ['a', 'b', 'c'];
          let el = fruits.pop();

          expect(fruits).to.eql(['a', 'b']);
          expect(el).to.eql('c');
        });
      });

      describe('.shift()', () => {
        it('should remove first element and return it', () => {
          let fruits = ['a', 'b', 'c'];
          let el = fruits.shift();

          expect(fruits).to.eql(['b', 'c']);
          expect(el).to.eql('a');
        });
      });

      describe('.unshift()', () => {
        it('should add element to beginning of array', () => {
          let fruits = ['b', 'c'];
          let el = fruits.unshift('a');

          expect(fruits).to.eql(['a', 'b', 'c']);
          expect(el).to.eql(3); // size
        });
      });
    });

    describe('Internals', () => {
      it('should be an object, not primitive', () => {
        let fruits = ['banana'];
        let arr = fruits;

        expect(arr === fruits).to.be.true;

        fruits.push('apple');

        expect(arr).to.eql(['banana', 'apple']);
      });
    });
  });

  describe('5.5 Array Methods', () => {
    describe('.splice() for add, remove and insert elements, destructive', () => {
      it('should delete items and return deleted elements array', () => {
        let arr = ['a', 'b', 'c'];
        let spliced = arr.splice(1, 1);

        expect(arr).to.eql(['a', 'c']);
        expect(spliced).to.eql(['b']);
      });

      it('should remove 2 elements and add two', () => {
        let arr = ['a', 'b', 'c'];
        let spliced = arr.splice(1, 2, 'hello', 'world');

        expect(arr).to.eql(['a', 'hello', 'world']);
        expect(spliced).to.eql(['b', 'c']);
      });

      it('should add elements without any removals', () => {
        let arr = ['a', 'b', 'c'];
        let spliced = arr.splice(1, 0, 'hello', 'world');

        expect(arr).to.eql(['a', 'hello', 'world', 'b', 'c']);
        expect(spliced).to.eql([]);
      });
    });

    describe('.slice() for getting part of arrays (non destructive)', () => {
      it('should get part of array', () => {
        let arr = ['a', 'b', 'c'];
        let sliced = arr.slice(1, 1);

        expect(arr).to.eql(['a', 'b', 'c']);
        expect(sliced).to.eql(['a', 'c']);
      });
    });
  });
});

