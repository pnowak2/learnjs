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
    it('should read the section', function () { });

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
    it('should read the section', function () { });

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
        expect(s).to.eql('\n        hello\n        world\n        ');
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
    it('should read the section', function () { });

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
    it('should read the section', function () { });

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
        let sliced = arr.slice(1, 2);

        expect(arr).to.eql(['a', 'b', 'c']);
        expect(sliced).to.eql(['b']);
      });
    });

    describe('.concat() for joining arrays together', () => {
      it('should concat two arrays', () => {
        let arr = [1, 2];

        expect([3, 4].concat(arr)).to.eql([3, 4, 1, 2]);
      });
    });

    describe('Searching in array', () => {
      describe('.indexOf', () => {
        it('should find index of found element', () => {
          let arr = [1, 0, false];
          expect(arr.indexOf(false)).to.eql(2);
        });
      });

      describe('.lastIndexOf', () => {
        it('should find last index of found element', () => {
          let arr = [1, false, 0, false];
          expect(arr.lastIndexOf(false)).to.eql(3);
        });
      });

      describe('.includes()', () => {
        it('should check if array includes the element', () => {
          let arr = [1, false, 0, false];
          expect(arr.includes(false)).to.be.true;
        });
      });

      describe('.find()', () => {
        it('should find one element in array with predicate', () => {
          let users = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Piotr' },
            { id: 3, name: 'Alicja' }
          ]

          let user = users.find((item, idx, array) => item.id === 1);

          expect(user).to.eql(users[0]);
        });
      });

      describe('.findIndex()', () => {
        it('should find index of one element in array with predicate', () => {
          let users = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Piotr' },
            { id: 3, name: 'Alicja' }
          ]

          let userIndex = users.findIndex((item, idx, array) => item.id === 3);

          expect(userIndex).to.eql(2);
        });
      });

      describe('.filter()', () => {
        it('should filter array with predicate', () => {
          let users = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Piotr' },
            { id: 3, name: 'Alicja' }
          ]

          let someUsers = users.filter((item, idx, array) => {
            return item.id < 3
          });

          expect(someUsers).to.eql([
            { id: 1, name: 'John' },
            { id: 2, name: 'Piotr' }
          ])
        });
      });
    });

    describe('Transform an array', () => {
      describe('.map()', () => {
        it('should map array to another array', () => {
          let lengths = ['Bilbo', 'Gandalf', 'Nazgul'].map((item, index, array) => {
            return item.length;
          });

          expect(lengths).to.eql([5, 7, 6]);
        });
      });

      describe('.map()', () => {
        it('should map array to another array', () => {
          let lengths = ['Bilbo', 'Gandalf', 'Nazgul'].map((item, index, array) => {
            return item.length;
          });

          expect(lengths).to.eql([5, 7, 6]);
        });
      });

      describe('.sort()', () => {
        it('should sort an array, by default as strings', () => {
          let sorted = [1, 2, 15].sort();

          expect(sorted).to.eql([1, 15, 2]);
        });

        it('should sort an array with custom comparer', () => {
          let sorted = [1, 2, 15].sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            if (a == b) return 0;
          });

          expect(sorted).to.eql([1, 2, 15]);
        });
      });

      describe('.reverse()', () => {
        it('should reverse array order', () => {
          let arr = [1, 2, 15]
          arr.reverse();

          expect(arr).to.eql([15, 2, 1]);
        });
      });

      describe('.split()', () => {
        it('should split string by delimiter to array', () => {
          let names = 'Bilbo, Gandalf, Nazgul';
          let arr = names.split(', ');

          expect(arr).to.eql(['Bilbo', 'Gandalf', 'Nazgul']);
        });
      });

      describe('.join()', () => {
        it('should join array by delimiter to string', () => {
          let arr = ['Bilbo', 'Gandalf', 'Nazgul']
          let text = arr.join(', ');

          expect(text).to.eql('Bilbo, Gandalf, Nazgul');
        });
      });

      describe('.reduce()', () => {
        it('should reduce array to one value', () => {
          let arr = ['Bilbo', 'Gandalf', 'Nazgul']
          let text = arr.reduce((prevItem, item, idx, arr) => {
            return prevItem + ':' + item
          }, '');

          expect(text).to.eql(':Bilbo:Gandalf:Nazgul');
        });
      });

      describe('.reduce()', () => {
        it('should reduce array to one value (from right)', () => {
          let arr = ['Bilbo', 'Gandalf', 'Nazgul'];
          let text = arr.reduceRight((prevItem, item, idx, arr) => {
            return prevItem + ':' + item
          }, '');

          expect(text).to.eql(':Nazgul:Gandalf:Bilbo');
        });
      });
    });

    describe('Iterating', () => {
      describe('.forEach()', () => {
        it('should iterate over array', () => {
          let arr = ['Bilbo', 'Gandalf', 'Nazgul'];
          let result = '';

          arr.forEach((item, idx, array) => {
            result += item;
          });

          expect(result).to.eql(arr.join(''));
        });
      });
    });

    describe('Other', () => {
      describe('.isArray()', () => {
        it('should check for arrayness', () => {
          expect(Array.isArray([])).to.be.true;
          expect(Array.isArray({
            0: 'hello',
            length: 1
          })).to.be.false;
        });
      });

      describe('thisArg', () => {
        it('should replace this object within methods', () => {
          let user = {
            age: 18,
            younger(otherUser) {
              return otherUser.age < this.age;
            }
          };

          let users = [
            { age: 12 },
            { age: 16 },
            { age: 32 }
          ];

          // find all users younger than user          thisArg
          let youngerUsers = users.filter(user.younger, user);

          expect(youngerUsers).to.eql([
            { age: 12 },
            { age: 16 }
          ])
        });
      });
    });
  });

  describe('5.6 Iterables', () => {
    it('should read the section', function () { });

    it('should write own simple iterator', function () {
      let range = {
        from: 1,
        to: 5,
        [Symbol.iterator]() {
          let from = this.from;
          let to = this.to;
          let current = this.from;

          return {
            next() {
              let result = {
                value: current,
                done: current > to
              }
              current = current + 1;

              return result;
            }
          }
        }
      }

      let result = '';
      for (let n of range) {
        result += n;
      }

      expect(result).to.eql('12345');
    });

    it('should write generator function', () => {
      function* gen() {
        yield 1;
        yield 2;
      }

      var g = gen();
      expect(g.next().value).to.eql(1);
      expect(g.next().value).to.eql(2);
      expect(g.next().done).to.be.true;
      expect(g.next().value).to.be.undefined;
    });

    it('should call iterator explicitly', () => {
      let it = 'piotr'[Symbol.iterator]();

      expect(it.next().value).to.eql('p');
    });

    describe('Array.from()', () => {
      it('should joing iterables and array likes with Array.from', () => {
        let arrayLike = {
          0: "Hello",
          1: "World",
          length: 2
        };

        let arr = Array.from(arrayLike);

        expect(Array.isArray(arr)).to.be.true;
        expect(arr[1]).to.eql('World');
      });

      it('should convert function args to real array', () => {
        function fn() {
          let ars = Array.from(arguments);
          return ars;
        }

        let args = fn(1, 2, 3);

        expect(Array.isArray(args)).to.be.true;
        expect(args).to.eql([1, 2, 3]);
      });

      it('should map elements before getting array', () => {
        let arrayLike = {
          0: "Hello",
          1: "World",
          length: 2
        };

        let arr = Array.from(arrayLike, (el, idx) => {
          return el + idx
        });

        expect(arr).to.eql(['Hello0', 'World1']);
      });
    });
  });

  describe('5.7 Map, Set, WeakMap and WeakSet', () => {
    it('should read the section', function () { });

    describe('Map', () => {
      it('should be collection of keyed data itmes', () => {
        let map = new Map();
        map.set(1, 'foo');
        map.set(2, 'bar');

        expect(map.get(1)).to.eql('foo');
        expect(map.get(2)).to.eql('bar');
      });

      describe('.get(), .set()', () => {
        it('should retrieve data', () => {
          let map = new Map();
          map.set(1, 'foo');

          expect(map.get(1)).to.eql('foo');
        });
      });

      describe('Using Objects as Keys', () => {
        let obj = {
          foo: 'bar'
        }

        let map = new Map();
        map.set(obj, 'value');

        expect(map.get(obj)).to.eql('value');
      });

      describe('Chaining', () => {
        it('should chain sets', () => {
          let map = new Map();
          map
            .set('1', 'one')
            .set('2', 'bar');

          expect(map.get('2')).to.eql('bar');
        });
      });

      describe('Map from Object', () => {
        it('should create a map from object', () => {
          let map = new Map([
            ['1', 'one'],
            ['2', 'two']
          ]);

          expect(map.get('1')).to.eql('one');
        });
      });

      describe('Iteration Over Map', () => {
        it('.keys()', () => {
          let recipeMap = new Map([
            ['cucumber', 500],
            ['tomatoes', 350],
            ['onion', 50]
          ]);

          let result = '';
          for (let key of recipeMap.keys()) {
            result += key;
          }

          expect(result).to.eql('cucumbertomatoesonion');
        });

        it('.keys()', () => {
          let recipeMap = new Map([
            ['cucumber', 500],
            ['tomatoes', 350],
            ['onion', 50]
          ]);

          let result = '';
          for (let value of recipeMap.values()) {
            result += value;
          }

          expect(result).to.eql('50035050');
        });

        it('.entries', () => {
          let recipeMap = new Map([
            ['cucumber', 500],
            ['tomatoes', 350]
          ]);

          expect(recipeMap.entries().next).to.be.a('function');
          expect(recipeMap.entries().next().value).to.eql(['cucumber', 500]);
        });
      });

      describe('Checking for key', () => {
        it('should check for given key', () => {
          let recipeMap = new Map([
            ['cucumber', 500],
            ['tomatoes', 350]
          ]);

          expect(recipeMap.has('cucumber')).to.be.true;
          expect(recipeMap.has('other')).to.be.false;
        });
      });
    });

    describe('Set', () => {
      it('should be collection where each value may occur only once', () => {
        let set = new Set();
        set.add(1);
        set.add(2);
        set.add(1);
        set.add(4);
        set.add(1);

        expect(set.size).to.eql(3);
      });
    });

    describe('WeakMap / WeakSet', () => {
      it('should use objects as keys', () => {
        let wm = new WeakMap();

        expect(function () {
          wm.set('one', 'two');
        }).to.throw();

        const obj = {};
        wm.set(obj, 'bar');
        expect(wm.get(obj)).to.eql('bar');
      });

      it('should garbage collect key and map if key is freed', () => {
        let wm = new WeakMap();
        let key = { name: 'John' };

        wm.set(key, 'bar');
        expect(wm.get(key)).to.eql('bar');

        key = null;
        expect(wm.get(key)).to.be.undefined;
      });
    });
  });

  describe('5.8 Object.keys, values, entries', () => {
    it('Object.keys()', () => {
      let obj = {
        one: 'jeden',
        two: 'dwa'
      }

      expect(Object.keys(obj).join(',')).to.eql('one,two');
    });

    it('Object.values()', () => {
      let obj = {
        one: 'jeden',
        two: 'dwa'
      }

      expect(Object.values(obj).join(',')).to.eql('jeden,dwa');
    });

    it('Object.entries()', () => {
      let obj = {
        one: 'jeden',
        two: 'dwa'
      }

      expect(Object.entries(obj)).to.eql([
        ['one', 'jeden'],
        ['two', 'dwa']
      ]);
    });
  });

  describe('5.9 Destructuring assignment', () => {
    describe('Array destructuring', () => {
      it('should destructure', () => {
        let arr = ['one', 'two', 'three'];
        let [first, second] = arr;

        expect(first).to.eql('one');
        expect(second).to.eql('two');
      });

      it('should ignore first args', () => {
        let arr = ['one', 'two', 'three'];
        let [, , last] = arr;

        expect(last).to.eql('three');
      });

      it('should work with any iterable', () => {
        let [a, b] = 'Hello world';
        expect(a).to.eql('H');
        expect(b).to.eql('e');
      });

      it('should user ... rest operator to get last values', () => {
        let [a, b, ...rest] = 'Hello';
        expect(rest).to.eql(['l', 'l', 'o']);
      });

      it('should use default values', () => {
        let [first = 'first', second] = [];

        expect(first).to.eql('first');
        expect(second).to.be.undefined;
      });
    });

    describe('Object destructuring', () => {
      it('should destructure objects', () => {
        let { name, age } = {
          name: 'peter',
          address: 'mamer',
          age: 38
        };

        expect(name).to.eql('peter');
        expect(age).to.eql(38);
      });

      it('should destructure and rename on the fly', () => {
        let { name: n, age: a } = {
          name: 'peter',
          address: 'mamer',
          age: 38
        };

        expect(n).to.eql('peter');
        expect(a).to.eql(38);
      });

      it('should use ... rest operator', () => {
        let { name: n, ...rest } = {
          name: 'peter',
          address: 'mamer',
          age: 38
        };

        expect(n).to.eql('peter');
        expect(rest).to.eql({
          address: 'mamer',
          age: 38
        });
      });

      it('should use nested destructuring', () => {
        let options = {
          size: {
            width: 100,
            height: 200
          },
          items: ["Cake", "Donut"],
          extra: true    // something extra that we will not destruct
        };

        // destructuring assignment on multiple lines for clarity
        let {
          size: { // put size here
            width,
            height
          },
          items: [item1, item2], // assign items here
          title = "Menu" // not present in the object (default value is used)
        } = options;

        expect(height).to.eql(200);
      });
    });

    describe('Function declarations destructure', () => {
      it('should destructure function input params', () => {
        function fn({ name = 'peter', age }) {
          return `${name}: ${age}`;
        }

        expect(fn({
          foo: 'bar',
          name: 'andrew',
          age: 12,
          other: 2
        })).to.eql('andrew: 12');
      });
    });
  });

  describe('5.10 Date and Time', () => {
    it('should create date object', () => {
      let now = new Date();
      expect(now).to.be.a('date');
    });

    it('should create from miliseconds', () => {
      let now = new Date(24 * 3600 * 1000);
      expect(now).to.be.a('date');
    });

    it('should parse from string', () => {
      let dt = new Date('2018-05-07');

      expect(dt.getMonth()).to.eql(4);
    });

    it('should provide all params', () => {
      let dt = new Date(2018, 4, 7, 12, 45, 2, 6);

      expect(dt.getMonth()).to.eql(4);
    });

    it('should use getters for date properties', () => {
      let dt = new Date(2018, 4, 7, 12, 45, 2, 6);

      expect(dt.getFullYear()).to.eql(2018);
      expect(dt.getMonth()).to.eql(4);
      expect(dt.getDate()).to.eql(7);
      expect(dt.getHours()).to.eql(12);
      expect(dt.getUTCHours()).to.eql(10); // UTC time
      expect(dt.getMinutes()).to.eql(45);
      expect(dt.getSeconds()).to.eql(2);
      expect(dt.getMilliseconds()).to.eql(6);
      expect(dt.getTime()).to.be.a('number');
    });

    it('should modify the date / time', () => {
      let dt = new Date();
      dt.setHours(0);

      expect(dt.getHours()).to.eql(0);
    });

    it('should parse from string', () => {
      let dt = Date.parse('2012-01-26T13:51:50.417-07:00');

      expect(dt).to.be.a('number');
    });
  });

  describe('5.10 JSON methods, toJSON()', () => {
    it('should implement it by hand..', () => {
      let usr = {
        name: 'peter',
        age: 38,
        toString() {
          return `name: ${this.name}, age: ${this.age}`
        }
      }

      expect(usr.toString()).to.eql('name: peter, age: 38');
    });

    describe('JSON.stringify()', () => {
      it('should convert js object to json string', () => {
        let usr = {
          name: 'peter',
          age: 38
        }

        expect(JSON.stringify(usr)).to.eql('{"name":"peter","age":38}');
      });

      it('should point which properties to encode', () => {
        let usr = {
          name: 'peter',
          age: 38
        }

        expect(JSON.stringify(usr, ['age'])).to.eql('{"age":38}');
      });

      it('should use replacer function', () => {
        let usr = {
          age: 38
        }

        expect(JSON.stringify(usr, function (key, value) {
          return key === 'age' ? `ux-${value}` : value;
        })).to.eql('{"age":"ux-38"}');
      });

      it('should format spacer', () => {
        let usr = {
          name: 'peter',
          age: 38
        }

        expect(JSON.stringify(usr, null, 2)).to.eql('{\n  "name": "peter",\n  "age": 38\n}');
      });

      it('should use custom toJSON() from object', () => {
        let usr = {
          name: 'peter',
          toJSON() {
            return `custom - ${this.name}`;
          }
        }

        expect(JSON.stringify(usr)).to.eql('"custom - peter"');
      });
    });

    describe('JSON.parse()', () => {
      it('should parse string to object', () => {
        let value = JSON.parse('{"name": "peter"}');

        expect(value).to.eql({
          name: 'peter'
        });
      });

      it('should use reviver to convert certain properties to correct type', () => {
        let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
        let obj = JSON.parse(str, function(key, value) {
          if(key === 'date') {
            return new Date(value);
          } else {
            return value;
          }
        });

        expect(obj.date.getFullYear()).to.eql(2017);
      });
    });
  });
});

