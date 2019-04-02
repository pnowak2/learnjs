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
            {id: 1, name: "John"},
            {id: 2, name: "Pete"},
            {id: 3, name: "Jon"}
          ];
          const result = arr.filter(item => {
            return item.name.includes('n');
          });

          expect(result).toEqual([
            {id: 1, name: "John"},
            {id: 3, name: "Jon"}
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
      it('should behave...', () => {
        
      });
    });
  });
});