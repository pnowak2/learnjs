describe('5. Data Types', () => {
  describe('5.1 Methods of primitives', () => {
    it('should not use primitive wrappers in js', () => { });
  });

  describe('5.2 Numbers', () => {
    describe('Helpful notations', () => {
      it('should user exponential notation', () => {
        const billion = 1000000000;
        const billexp = 1e9;

        expect(billion).toEqual(billexp);
      });

      it('should use hex notation', () => {
        expect(0xff).toEqual(255);
      });

      it('should use binary notation', () => {
        expect(0b1111).toEqual(15);
      });

      it('should use octal notation', () => {
        expect(0o10).toEqual(8);
      });
    });

    describe('toString(base)', () => {
      it('should return number in system with given base', () => {
        expect(15..toString(2)).toEqual('1111');
        expect(8..toString(8)).toEqual('10');
        expect((255).toString(16)).toEqual('ff');
      });
    });

    describe('Rounding with Math functions', () => {
      it('should use Math.floor to round down', () => {
        expect(Math.floor(3.99)).toEqual(3);
      });

      it('should use Math.ceil to round up', () => {
        expect(Math.ceil(3.001)).toEqual(4);
      });

      it('should use Math.trunc remove anything after decimal point', () => {
        expect(Math.trunc(3.001)).toEqual(3);
      });

      it('should use Math.round to round to nearest integer', () => {
        expect(Math.round(3.001)).toEqual(3);
        expect(Math.round(3.99)).toEqual(4);
      });
    });

    describe('Rounding with more precision to n digits after decimal point', () => {
      it('should use simple division with floor', () => {
        let num = 1.23456;
        let result = (Math.floor(num * 100) / 100); // Floor(123 / 100)

        expect(result).toEqual(1.23);
      });

      it('should use toFixed on number => string', () => {
        const result = 1.23456.toFixed('2');
        expect(result).toEqual('1.23');
        expect(+result).toEqual(1.23);
      });
    });

    describe('Imprecise calculations', () => {
      it('should have troubles representing fractions', () => {
        expect(0.1 + 0.2).not.toEqual(0.3);
        expect((0.1 + 0.2).toFixed(2)).toEqual('0.30');
        expect(+(0.1 + 0.2).toFixed(2)).toEqual(0.3);
      });
    });

    describe('isFinite, isNaN', () => {
      it('should check for number', () => {
        expect(isNaN('z')).toBe(true);
      });

      it('should check for infinity', () => {
        expect(isFinite(255)).toBe(true);
        expect(isFinite(255e9999999999999)).toBe(false);
        expect(255e9999999999999).toBe(Infinity);
      });

      it('should be comparable to Object.is', () => {
        expect(Object.is(0, -0)).toBe(false);
      });
    });

    describe('parseInt, parseFloat', () => {
      it('should parse string to number', () => {
        expect(parseInt('100px')).toEqual(100);
        expect(parseFloat('-56.08rem')).toEqual(-56.08);
        expect(parseFloat('rem')).toEqual(NaN);
      });

      it('should user radix param', () => {
        expect(parseInt('0xff', 16)).toEqual(255);
      });
    });

    describe('Other math functions', () => {
      it('should use Math.random, number from 0 to 1, not inclusive', () => {
        expect(Math.random()).toBeLessThan(1);
        expect(Math.random()).toBeGreaterThanOrEqual(0);
      });

      it('should use Math.max/min', () => {
        expect(Math.max(1, 2, 3, 100)).toEqual(100);
        expect(Math.min(1, 2, 3, 100)).toEqual(1);
      });

      it('should use Math.pow', () => {
        expect(Math.pow(5, 3)).toEqual(125);
      });
    });
  });

  describe('5.3 Strings', () => {
    describe('Quotes', () => {
      it('should use 3 quote types', () => {
        expect('test').toEqual('test');
        expect("test").toEqual('test');
        expect(`test`).toEqual('test');
      });
    });

    describe('Backticks', () => {
      it('should interpolate', () => {
        const result = `sum: ${1 + 2}`;
        expect(result).toEqual('sum: 3');
      });

      it('should use new lines', () => {
        const result = `sum: 
        ${1 + 2}`;
        expect(result).toContain('sum:');
      });
    });

    describe('String length', () => {
      it('should use length property', () => {
        expect('test'.length).toEqual(4);
      });
    });

    describe('Accessing characters', () => {
      it('should use indexing to get char', () => {
        const str = 'ec commission';

        expect(str[2]).toBe(' ');
        expect(str[5]).toBe('m');
        expect(str[500]).toBeUndefined();
      });

      it('should use charAt', () => {
        const str = 'ec commission';

        expect(str.charAt(2)).toBe(' ');
        expect(str.charAt(500)).toBe('');
      });

      it('should iterate with for..of', () => {
        let result = '';
        for (let char of 'test') {
          result += char + '-';
        }

        expect(result).toEqual('t-e-s-t-');
      });
    });

    describe('Changing the case', () => {
      it('should use toUpper, to Lower case', () => {
        expect('test'.toUpperCase()).toEqual('TEST');
        expect('TEST'.toLocaleLowerCase()).toEqual('test');
      });
    });

    describe('Searching for a substring', () => {
      it('should use str.indexOf(substr, pos)', () => {
        let str = 'Widget with id';
        expect(str.indexOf('i')).toBe(1);
        expect(str.indexOf('i', 2)).toBe(8);
        expect(str.indexOf('with')).toBe(7);
        expect(str.indexOf('with2')).toBe(-1);
      });

      it('should use str.LastIndexOf(substr, position)', () => {
        let str = 'Widget with id';
        expect(str.lastIndexOf('i')).toBe(12);
      });

      it('should use includes(sustr, pos)', () => {
        let str = 'Widget with id';
        expect(str.includes('i')).toBe(true);
        expect(str.startsWith('Widg')).toBe(true);
        expect(str.endsWith(' id')).toBe(true);
      });
    });

    describe('Getting a substring', () => {
      it('should use str.slice(start [,end])', () => {
        let str = 'stringify';
        expect(str.slice(2)).toEqual('ringify');
        expect(str.slice(2, 6)).toEqual('ring');
      });

      it('should use str.substring(start [,end]) (start can be lower than end)', () => {
        let str = 'stringify';
        expect(str.substring(2)).toEqual('ringify');
        expect(str.substring(2, 6)).toEqual('ring');
        expect(str.substring(6, 2)).toEqual('ring');
      });

      it('should use str.substr(start [,length])', () => {
        let str = 'stringify';
        expect(str.substr(2, 3)).toEqual('rin');
      });
    });

    describe('Comparing strings', () => {
      it('should read the section', () => { });

      it('should get code point at position', () => {
        expect('A'.codePointAt(0)).toBe(65);
        expect('A'.charCodeAt(0)).toBe(65);
      });

      it('should create char from code', () => {
        expect(String.fromCodePoint(65)).toEqual('A');
      });

      it('should use localeCompare(str)', () => {
        expect('błąd'.localeCompare('bład')).toBe(1);
      });
    });
  });

  describe('5.4 Arrays', () => {
    describe('Declaration', () => {
      it('using Array() syntax', () => {
        const arr = new Array();
        expect(arr).toEqual(jasmine.any(Array));
      });

      it('using literal', () => {
        const arr = [];
        expect(arr).toEqual(jasmine.any(Array));
      });
    });

    describe('Methods', () => {
      describe('pop', () => {
        it('should extract last element', () => {
          const arr = [1, 2, 3];
          const result = arr.pop();

          expect(arr).toEqual[1, 2];
          expect(result).toEqual(3);
        });
      });

      describe('shift', () => {
        it('should extract first element', () => {
          const arr = [1, 2, 3];
          const result = arr.shift();

          expect(arr).toEqual[2, 3];
          expect(result).toEqual(1);
        });
      });

      describe('push', () => {
        it('should append to end of array', () => {
          const arr = [1, 2, 3];
          const result = arr.push(4);

          expect(arr).toEqual[1, 2, 3, 4];
          expect(result).toEqual(4);
        });
      });

      describe('unshift', () => {
        it('should append to beggining of array', () => {
          const arr = [1, 2, 3];
          const result = arr.unshift(0);

          expect(arr).toEqual[0, 1, 2, 3];
        });
      });
    });

    describe('Loops', () => {
      it('should loop using classic for', () => {
        let result = '';

        for (let i = 0; i < 5; i++) {
          result += '-';
        }

        expect(result).toEqual('-----');
      });

      it('should loop using for..of (for iterables)', () => {
        let fruits = ["a", "b", "c"];
        let result = '';

        for (let fruit of fruits) {
          result += fruit;
        }

        expect(result).toEqual('abc');
      });

      it('should loop using for..in', () => {
        let fruits = ["a", "b", "c"];
        let result = '';

        for (let prop in fruits) {
          result += fruits[prop];
        }

        expect(result).toEqual('abc');
      });
    });

    describe('Can change toString behaviour', () => {
      it('should change to custom one', () => {
        const arr = [1, 2, 3];

        expect(arr.toString()).toEqual('1,2,3');

        Array.prototype[Symbol.toPrimitive] = function (hint) {
          return 'boo: ' + this.toString();
        };

        expect(arr + '').toEqual('boo: 1,2,3');
      });
    });
  });

  describe('5.5 Array methods', () => {
    describe('Add/remove items', () => {
      describe('splice(index[, deleteCount, elem1, ..., elemN)', () => {
        it('should delete some items', () => {
          const arr = [1, 2, 3, 4, 5];
          const result = arr.splice(1, 2);

          expect(result.length).toEqual(2);
          expect(result).toEqual([2, 3]);
          expect(arr).toEqual([1, 4, 5]);
        });

        it('should delete some items and add others', () => {
          const arr = [1, 2, 3, 4, 5];
          arr.splice(1, 2, 'hey', 'you');

          expect(arr).toEqual([1, 'hey', 'you', 4, 5]);
        });

        it('should add some items', () => {
          const arr = [1, 2, 3, 4, 5];
          arr.splice(1, 0, 'hey', 'you');

          expect(arr).toEqual([1, 'hey', 'you', 2, 3, 4, 5]);
        });
      });

      describe('slice(start, end)', () => {
        it('should get extract (copy) of original array ', () => {
          const arr = [1, 2, 3, 4, 5];
          const result = arr.slice(2, 4);

          expect(result).toEqual([3, 4]);
          expect(arr).toEqual([1, 2, 3, 4, 5]);
        });
      });

      describe('concat(arg1, arg2...)', () => {
        it('should join array with other arrays', () => {
          const arr = [1, 2, 3, 4, 5];
          const result = arr.concat(['a', 'b']);

          expect(arr).toEqual([1, 2, 3, 4, 5]);
          expect(result).toEqual([1, 2, 3, 4, 5, 'a', 'b']);
        });

        it('should join array with other items', () => {
          const arr = [1, 2, 3, 4, 5];
          const result = arr.concat('a', 'b');

          expect(arr).toEqual([1, 2, 3, 4, 5]);
          expect(result).toEqual([1, 2, 3, 4, 5, 'a', 'b']);
        });

        it('should join array with custom object declaring contact spreadable', () => {
          const arr = [1, 2, 3, 4, 5];
          const o = {
            0: 'peter',
            1: 38,
            [Symbol.isConcatSpreadable]: true,
            length: 2
          };
          const result = arr.concat(o);

          expect(arr).toEqual([1, 2, 3, 4, 5]);
          expect(result).toEqual([1, 2, 3, 4, 5, 'peter', 38]);
        });
      });
    });


    describe('Iterating', () => {
      describe('forEach', () => {
        it('should iterate over every array element', () => {
          const arr = [1, 2, 3, 4, 5];
          let result = '';

          arr.forEach((item, idx, array) => result += item);

          expect(result).toEqual('12345');
        });
      });
    });

    describe('Searching', () => {
      describe('indexOf', () => {
        it('should check if item exists in array and get its index', () => {
          const arr = [1, 2, 3];

          expect(arr.indexOf(2)).toEqual(1);
        });
      });

      describe('lastIndexOf', () => {
        it('should check if item exists in array and get its last index', () => {
          const arr = [1, 2, 3, 4, 3];

          expect(arr.lastIndexOf(3)).toEqual(4);
        });
      });

      describe('includes', () => {
        it('should check if item exists in array', () => {
          const arr = [1, 2, 3];

          expect(arr.includes(2)).toBe(true);
        });
      });

      describe('find', () => {
        it('should allow to find item with own predicate', () => {
          const arr = [1, 2, 3];
          const result = arr.find((item, idx, array) => (item === 2 && idx === 1));

          expect(result).toBe(2);
        });
      });

      describe('filter', () => {
        it('should allow to filter items with own predicate', () => {
          const arr = [
            { id: 1, name: "John" },
            { id: 2, name: "Pete" },
            { id: 3, name: "Jon" }
          ];
          const result = arr.filter(item => {
            return item.name.includes('n');
          });

          expect(result).toEqual([
            { id: 1, name: "John" },
            { id: 3, name: "Jon" }
          ]);
        });
      });
    });

    describe('Transform', () => {
      describe('map', () => {
        it('should convert one array to another', () => {
          const arr = [1, 2, 3];
          const result = arr.map(item => `item: ${item}`);

          expect(result).toEqual(['item: 1', 'item: 2', 'item: 3']);
        });
      });

      describe('Sort', () => {
        describe('sort()', () => {
          it('should sort array', () => {
            const arr = [1, 2, 15];
            const result = arr.sort();

            expect(result).toEqual([1, 15, 2]);
          });

          it('should provide custom comparer', () => {
            const arr = [1, 2, 15];
            const result = arr.sort((a, b) => a - b);

            expect(result).toEqual([1, 2, 15]);
          });
        });

        describe('reverse()', () => {
          it('should reverse order', () => {
            const arr = [1, 2, 15];
            const result = arr.reverse((a, b) => a - b);

            expect(result).toEqual([15, 2, 1]);
          });
        });
      });

      describe('Split and Join', () => {
        describe('split()', () => {
          it('should split string to array', () => {
            expect('1 2 3'.split(' ')).toEqual(['1', '2', '3']);
          });
        });

        describe('join()', () => {
          it('should join array to string', () => {
            expect(['1', '2', '3'].join(' ')).toEqual('1 2 3');
          });
        });
      });

      describe('Reduce', () => {
        describe('reduce()', () => {
          it('should produce reduced result from array', () => {
            const arr = [1, 2, 3];
            const result = arr.reduce((prev, item, idx, array) => {
              return prev + item;
            }, 0);

            expect(result).toEqual(6);
          });
        });
      });

      describe('Array.isArray', () => {
        it('should check if its real array', () => {
          expect(Array.isArray([])).toEqual(true);
          expect(Array.isArray({
            0: 'hello',
            length: 2
          })).toEqual(false);
        });
      });
    });
  });

  describe('5.6 Iterables', () => {
    describe('Symbol.iterator', () => {
      it('should make any object iterable and capable to for..of', () => {
        let range = {
          from: 1,
          to: 5,
          // calls it once
          [Symbol.iterator]: function () {
            return {
              current: this.from,
              last: this.to,
              // 3. next() is called on each iteration by the for..of loop
              next() {
                // 4. it should return the value as an object {done:.., value :...}
                if (this.current <= this.last) {
                  return { done: false, value: this.current++ };
                } else {
                  return { done: true };
                }
              }
            };
          }
        };

        let result = '';
        for (let item of range) {
          result += item;
        }

        expect(result).toEqual('12345');
      });

      it('should call iterator explicitly', () => {
        const it = 'abc'[Symbol.iterator]();

        expect(it.next()).toEqual({
          done: false,
          value: 'a'
        });
        expect(it.next()).toEqual({
          done: false,
          value: 'b'
        });
        expect(it.next()).toEqual({
          done: false,
          value: 'c'
        });
        expect(it.next()).toEqual({
          done: true,
          value: undefined
        });
      });

      it('should convert array like to real array - Array.from', () => {
        const o = {
          0: 'a',
          1: 'b',
          length: 2
        };

        const result = Array.from(o);
        expect(result.pop()).toEqual('b');
      });
    });
  });

  describe('5.7 Map, Set, WeakMap, WeakSet', () => {
    describe('Map, colleciton of key/value entries', () => {
      it('should create Map', () => {
        const map = new Map();
        expect(map).toEqual(jasmine.any(Map));
      });

      it('should set/get entry', () => {
        const map = new Map();
        map.set('key', 'value');

        expect(map.get('key')).toEqual('value');
      });

      it('should check for entry', () => {
        const map = new Map();
        map.set('key', 'value');

        expect(map.has('key')).toEqual(true);
        expect(map.has('other')).toEqual(false);
      });

      it('should delete entry', () => {
        const map = new Map();
        map.set('key', 'value');

        expect(map.has('key')).toEqual(true);

        map.delete('key');

        expect(map.has('key')).toEqual(false);
      });

      it('should check size', () => {
        const map = new Map();
        map.set('key', 'value');

        expect(map.size).toEqual(1);
      });

      it('should clear map', () => {
        const map = new Map();
        map.set('key', 'value');

        expect(map.size).toEqual(1);

        map.clear();

        expect(map.size).toEqual(0);
      });

      it('should use any type for key', () => {
        const map = new Map();
        const objKey = {};
        map.set(objKey, 'value');

        expect(map.get(objKey)).toEqual('value');
      });

      it('should chain map methods', () => {
        const map = new Map();
        map.set('foo', 'value1')
          .set('bar', 'value2')
          .set('baz', 'value3');

        expect(map.get('foo')).toEqual('value1');
        expect(map.get('bar')).toEqual('value2');
        expect(map.get('baz')).toEqual('value3');
      });

      it('should create a map out of array', () => {
        const entries = [
          [1, 'val1'],
          [2, 'val2'],
        ];

        const map = new Map(entries);

        expect(map.get(1)).toEqual('val1');
        expect(map.get(2)).toEqual('val2');
      });

      it('should iterate over map entries', () => {
        const map = new Map();
        map.set('foo', 'value1')
          .set('bar', 'value2')
          .set('baz', 'value3');

        let result = [];

        for (entry of map) {
          result.push(entry);
        }

        expect(result[0]).toEqual(['foo', 'value1']);
        expect(result[1]).toEqual(['bar', 'value2']);
        expect(result[2]).toEqual(['baz', 'value3']);
      });

      it('should not allow duplicates', () => {
        const map = new Map();
        map.set('foo', 'value1')
          .set('bar', 'value2')
          .set('foo', 'value2')
          .set('baz', 'value3');

        expect(map.size).toEqual(3);
      });

      it('should iterate over map keys', () => {
        const map = new Map();
        map.set('foo', 'value1')
          .set('bar', 'value2')
          .set('baz', 'value3');

        let result = '';

        for (entry of map.keys()) {
          result += entry;
        }

        expect(result).toEqual('foobarbaz');
      });

      it('should iterate over map values', () => {
        const map = new Map();
        map.set('foo', 'value1')
          .set('bar', 'value2')
          .set('baz', 'value3');

        let result = '';

        for (entry of map.values()) {
          result += entry;
        }

        expect(result).toEqual('value1value2value3');
      });

      it('should iterate with foreach', () => {
        const myMap = new Map();
        myMap.set('foo', 'value1')
          .set('bar', 'value2')
          .set('baz', 'value3');

        let result = '';

        myMap.forEach((value, key, map) => {
          result += value;
        });

        expect(result).toEqual('value1value2value3');
      });
    });

    describe('Set, collection without duplicates', () => {
      it('should not allow duplicates', () => {
        const set = new Set();
        set.add(1);
        set.add(2);
        set.add(3);
        set.add(2);
        set.add(1);

        expect(set.size).toEqual(3);
      });
    });

    describe('WeakMap, WeakSet', () => {
      it('should WeakMap have objects as keys. If key exists only as key of WeakMap, then key can be garbage collected, as opposed to normal map/array', () => {
        const wm = new WeakMap();

        let key = {};
        wm.set(key, 'val1');

        expect(wm.get(key)).toEqual('val1');

        key = null;
      });

      it('should not have iteration methods, keys, values, entries', () => {
        const wm = new WeakMap();
        // wm.keys(); // not defined
      });
    });
  });

  describe('5.8 Object.keys, values, entries', () => {
    describe('Object.keys()', () => {
      it('should return array of keys', () => {
        const o = {
          name: 'peter',
          age: 38
        };

        expect(Object.keys(o)).toEqual(['name', 'age']);
      });
    });

    describe('Object.values()', () => {
      it('should return array of values', () => {
        const o = {
          name: 'peter',
          age: 38
        };

        expect(Object.values(o)).toEqual(['peter', 38]);
      });
    });

    describe('Object.entries()', () => {
      it('should return array of entries (ignoring symbolic entries)', () => {
        const o = {
          name: 'peter',
          age: 38
        };

        expect(Object.entries(o)).toEqual([['name', 'peter'], ['age', 38]]);
      });

      it('should return array of entries with symbols', () => {
        const sbl = Symbol();
        const o = {
          name: 'peter',
          age: 38,
          [sbl]: 'sbl1'
        };

        expect(Object.entries(o)).toEqual([['name', 'peter'], ['age', 38]]);

        expect(Object.getOwnPropertySymbols(o)[0]).toEqual(sbl);
        expect(Reflect.ownKeys(o)).toEqual(['name', 'age', sbl]);
      });
    });
  });

  describe('5.9 Destructuring', () => {
    describe('Array', () => {
      it('should take first elements', () => {
        const arr = ['foo', 'bar', 'baz'];
        const [first, second] = arr;

        expect(first).toEqual('foo');
        expect(second).toEqual('bar');
      });

      it('should ignore some elements', () => {
        const arr = ['foo', 'bar', 'baz'];
        const [first, , third] = arr;

        expect(first).toEqual('foo');
        expect(third).toEqual('baz');
      });

      it('should get string elements', () => {
        const [f, l] = 'piotr nowak'.split(' ');
        expect(f).toEqual('piotr');
        expect(l).toEqual('nowak');
      });

      it('should work with any iterable', () => {
        const person = {
          name: 'peter',
          age: 38,
          [Symbol.iterator]: function () {
            const entries = Object.keys(this);
            const that = this;
            let i = 0;
            return {
              next() {
                const done = (i >= entries.length);
                const value = that[entries[i]];
                i++;
                return { done, value };
              }
            };
          }
        };

        const [name, age] = person;

        expect(name).toEqual('peter');
        expect(age).toEqual(38);
      });

      it('should assign to anything left side', () => {
        const user = {
          name: '',
          age: 0
        };

        [user.name, user.age] = ['peter', 38];

        expect(user.name).toEqual('peter');
        expect(user.age).toEqual(38);
      });

      it('should loop with entries', () => {
        const arr = ['foo', 'bar', 'baz'];
        let result = '';

        for (let [key, val] of arr.entries()) {
          result += key + val + '|';
        }

        expect(result).toEqual('0foo|1bar|2baz|');
      });

      it('should use rest ... values', () => {
        const arr = ['foo', 'bar', 'baz'];
        let [first, ...allRest] = arr;

        expect(first).toEqual('foo');
        expect(allRest).toEqual(['bar', 'baz']);
      });

      it('should use default values', () => {
        const arr = ['foo'];
        let [first, second = 'default'] = arr;

        expect(first).toEqual('foo');
        expect(second).toEqual('default');
      });
    });

    describe('Object', () => {
      it('should take selected props', () => {
        const obj = {
          name: 'peter',
          age: 38,
          role: 'dev'
        };

        let { name, age } = obj;

        expect(name).toEqual('peter');
        expect(age).toEqual(38);
      });

      it('should rename variables', () => {
        const obj = {
          name: 'peter',
          age: 38,
          role: 'dev'
        };

        let { name: n, age: a } = obj;

        expect(n).toEqual('peter');
        expect(a).toEqual(38);
      });

      it('should rename and give default values for variables', () => {
        const obj = {
          age: 38,
          role: 'dev'
        };

        let { name: n = 'david', age: a } = obj;

        expect(n).toEqual('david');
        expect(a).toEqual(38);
      });

      it('should use the rest ... operator', () => {
        const obj = {
          name: 'peter',
          age: 38,
          role: 'dev'
        };

        const { name, ...rest } = obj;

        expect(name).toEqual('peter');
        expect(rest).toEqual({
          age: 38,
          role: 'dev'
        });

      });

      it('should use existing variables', () => {
        const obj = {
          name: 'peter',
          age: 38,
          role: 'dev'
        };

        let name;

        ({ name, ...rest } = obj);

        expect(name).toEqual('peter');
        expect(rest).toEqual({
          age: 38,
          role: 'dev'
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

        let { size: {
          width,
          height
        } } = options;

        expect(width).toEqual(100);
        expect(height).toEqual(200);
      });

      it('should use smart function parameters', () => {
        function showMenu({ title = 'default', width = 100, height = 200 } = {}) {
          return `${title}, ${width}x${height}`;
        }

        const config = {
          title: 'form',
          height: 1000
        };

        expect(showMenu(config)).toEqual('form, 100x1000');
        expect(showMenu()).toEqual('default, 100x200');
      });
    });
  });

  describe('5.10 Date and time', () => {
    describe('Creation', () => {
      it('should create date object with current date/time', () => {
        const d = new Date();
        expect(d).toEqual(jasmine.any(Date));
      });

      it('should create date object with number of ms from beggining of epoch', () => {
        const d = new Date(0);
        expect(d.getFullYear()).toEqual(1970);
        expect(d.getMonth()).toEqual(0);
        expect(d.getDate()).toEqual(1);

        // one day later..
        const d2 = new Date(1000 * 3600 * 24);
        expect(d2.getFullYear()).toEqual(1970);
        expect(d2.getMonth()).toEqual(0);
        expect(d2.getDate()).toEqual(2);
      });

      it('should create with string parsing', () => {
        const d = new Date('2019-03-01');
        expect(d.getFullYear()).toEqual(2019);
        expect(d.getMonth()).toEqual(2);
        expect(d.getDate()).toEqual(1);
      });

      it('should create with given components', () => {
        const d = new Date(2019, 6, 28, 19, 36, 15, 12);
        expect(d.getFullYear()).toEqual(2019);
        expect(d.getMonth()).toEqual(6);
        expect(d.getDate()).toEqual(28);

        expect(d.getDay()).toEqual(0);
        expect(d.getUTCDay()).toEqual(0);

        expect(d.getHours()).toEqual(19);
        expect(d.getUTCHours()).toEqual(17);

        expect(d.getMinutes()).toEqual(36);
        expect(d.getUTCMinutes()).toEqual(36);

        expect(d.getSeconds()).toEqual(15);
        expect(d.getMilliseconds()).toEqual(12);
      });

      it('should get timezone offset', () => {
        const d = new Date(2019, 6, 28, 19, 36, 15, 12);
        expect(d.getTimezoneOffset() / 60).toEqual(-2); // in minutes
      });

      it('should set date properties', () => {
        const d = new Date();

        d.setFullYear(2019, 6, 28);
        d.setHours(19, 36, 15, 12);

        expect(d.getFullYear()).toEqual(2019);
        expect(d.getMonth()).toEqual(6);
        expect(d.getDate()).toEqual(28);
        expect(d.getMinutes()).toEqual(36);
        expect(d.getSeconds()).toEqual(15);
        expect(d.getMilliseconds()).toEqual(12);
      });
    });

    describe('Date to number, date diff', () => {
      it('should implement to primitive symbol', () => {
        const sbl = Date.prototype[Symbol.toPrimitive];

        expect(sbl).toEqual(jasmine.any(Function));
        const result = Date.prototype[Symbol.toPrimitive].call(new Date(1000 * 3600 * 24), 'number');
        expect(result).toEqual(1000 * 3600 * 24);
      });

      it('should make number operations on dates', () => {
        expect(new Date(10) - new Date(2)).toEqual(8); // milliseconds
      });
    });

    describe('Getting current date timestamp', () => {
      it('should use Date.now()', () => {
        expect(Date.now()).toEqual(jasmine.any(Number));
      });
    });

    describe('Parsing date from string (YYYY-MM-DDTHH:mm:ss.sssZ)', () => {
      it('should parse with given format', () => {
        const d = new Date('2019-04-03 19:36');

        expect(d.getFullYear()).toEqual(2019);
        expect(d.getMonth()).toEqual(3);
        expect(d.getDate()).toEqual(3);
        expect(d.getHours()).toEqual(19);
        expect(d.getMinutes()).toEqual(36);
      });
    });
  });

  describe('5.11 Json methods, toJSON', () => {
    describe('DIY toJson', () => {
      it('should make naive implementation', () => {
        function toJson(o) {
          const keys = Object.keys(o);

          return '{' + keys.reduce((arr, key) => {
            return arr.concat([`"${key}":"${o[key]}"`])
          }, []).join(',') + '}';
        }

        const o = {
          name: 'peter',
          age: 38
        }

        expect(toJson(o)).toEqual('{"name":"peter","age":"38"}');
      });
    });

    describe('JSON.stringify()', () => {
      it('should convert object to strings', () => {
        const o = {
          name: 'peter',
          age: 38,
          other: undefined,
          method() { return 'nothing ' }
        }

        expect(JSON.stringify(o)).toEqual('{"name":"peter","age":38}');
      });

      it('should use replacer to white list props to serialize as array', () => {
        const o = {
          name: 'peter',
          age: 38
        }

        expect(JSON.stringify(o, ['name'])).toEqual('{"name":"peter"}');

      });

      it('should use replacer to white list props to serialize as function', () => {
        const o = {
          name: 'peter',
          age: 38
        }

        expect(JSON.stringify(o, function (key, value) {
          return key === 'age' ? undefined : value
        })).toEqual('{"name":"peter"}');
      });

      it('should convert object to strings using spacer', () => {
        const o = {
          name: 'peter',
          age: 38
        }

        expect(JSON.stringify(o, null, 0)).toEqual('{"name":"peter","age":38}');
      });
    });

    describe('JSON.parse()', () => {
      it('should behave...', () => {
        const json = JSON.parse('{"name":"peter","age":38}');

        expect(json.name).toEqual('peter');
        expect(json.age).toEqual(38);
      });

      it('should handle custom types from string', () => {
        const json = JSON.parse('{"name":"peter","born":0}', function (key, value) {
          return key === 'born' ? new Date(value) : value;
        });

        expect(json.name).toEqual('peter');
        expect(json.born).toEqual(new Date(0));
      });
    });
  });
});
