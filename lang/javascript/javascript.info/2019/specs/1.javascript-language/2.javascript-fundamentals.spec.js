describe('2. JavaScript Fundamentals', () => {
  describe('2.1 Hello world!', () => {
    it('should read the section', () => { });
  });

  describe('2.2 Code structure', () => {
    it('should read the section', () => { });
  });

  describe('2.3 Modern mode, "use strict"', () => {
    it('should read the section', () => { });
  });

  describe('2.4 Variables', () => {
    it('should declare variable', () => {
      let message = 'msg';
      expect(message).toEqual('msg');
    });

    it('should declare variables in same line', () => {
      let m1 = 1, m2 = 2;

      expect(m1).toEqual(1);
      expect(m2).toEqual(2);
    });

    it('should use constants', () => {
      const my = 'test';

      expect(() => {
        my = 'boo';
      }).toThrowError('Assignment to constant variable.');
    });
  });

  describe('2.5 Data types', () => {
    describe('Changing types in the fly', () => {
      it('should switch types', () => {
        let vr = 5;
        expect(typeof vr).toEqual('number');

        vr = 'test';
        expect(typeof vr).toEqual('string');
      });
    });

    describe('number', () => {
      it('should support Infinity', () => {
        expect(1 / 0).toEqual(Infinity);
      });

      it('should support NaN (not a number)', () => {
        expect(1 / 'a').toEqual(NaN);
      });
    });

    describe('string', () => {
      it('should support quotes', () => {
        expect('test').toEqual(jasmine.any(String));
        expect("test").toEqual(jasmine.any(String));
        expect(`test`).toEqual(jasmine.any(String));
      });

      it('should support string interpolation', () => {
        const name = 'world';
        expect(`hello ${name}`).toEqual('hello world');
      });
    });

    describe('boolean', () => {
      it('should support logical values', () => {
        let hasDone = true;
        expect(hasDone).toBe(true);

        hasDone = false;
        expect(hasDone).toBe(false);
      });
    });

    describe('The null value', () => {
      it('should represent nothing', () => {
        let sth = null;

        expect(sth).toBeNull();
      });
    });

    describe('The undefined value', () => {
      it('should represent declared variable, not assigned', () => {
        let sth;
        expect(sth).toBeUndefined();
      });

      it('should use alternative syntax', () => {
        expect(undefined).toBe(void 0);
      });
    });

    describe('Objects and Symbols', () => {
      it('should be non primitive, complex type', () => {
        expect({}).toEqual(jasmine.any(Object));
      });
    });

    describe('The typeof operator', () => {
      it('should return type of the argument', () => {
        expect(typeof ('test')).toBe('string');
        expect(typeof 5).toBe('number');
        expect(typeof true).toBe('boolean');
        expect(typeof Symbol('id')).toBe('symbol');
        expect(typeof Math).toBe('object');
        expect(typeof null).toBe('object');
      });
    });
  });

  describe('2.6 Type conversions', () => {
    describe('ToString', () => {
      it('should convert ToString', () => {
        let value = true;
        expect(typeof value).toEqual('boolean');
        expect(String(value)).toEqual('true');
        expect(String(null)).toEqual('null');
        expect(String(undefined)).toEqual('undefined');
      });
    });

    describe('ToNumber', () => {
      it('should convert ToNumber using Number()', () => {
        let str = '123';
        expect(typeof str).toEqual('string');

        let num = Number(str);
        expect(typeof num).toEqual('number');
      });

      it('should convert ToNumber using math operations', () => {
        expect(typeof ('3' / '6')).toEqual('number');
      });

      it('should convert to number using "+"', () => {
        expect(+'5').toBe(5);
        expect(1 + +'5').toBe(6);
      });

      it('should use conversion rules', () => {
        expect(Number(undefined)).toEqual(NaN);
        expect(Number(null)).toEqual(0);
        expect(Number(true)).toEqual(1);
        expect(Number(false)).toEqual(0);
        expect(Number('')).toEqual(0);
        expect(Number('     ')).toEqual(0); // whitespaces are removed, looking for empty string
        expect(Number('-')).toEqual(NaN);
        expect(Number('2')).toEqual(2);
      });

      it('should "+" concatenate strings', () => {
        expect(1 + '6').toBe('16');
      });
    });

    describe('ToBoolean', () => {
      it('should use conversion rules', () => {
        expect(Boolean(1)).toBe(true);
        expect(Boolean(0)).toBe(false);
        expect(Boolean('0')).toBe(true);
        expect(Boolean('test')).toBe(true);
        expect(Boolean(undefined)).toBe(false);
        expect(Boolean(null)).toBe(false);
      });
    });
  });

  describe('2.7 Operators', () => {
    describe('Terms unary, binary, operand', () => {
      it('should understand meaning', () => {
        // operands
        let x = 1;
        let y = 2;

        expect(-x).toBe(-1); // unary
        expect(y - x).toBe(1); // binary
      });
    });

    describe('String concatenation, binary +', () => {
      it('should concatenate strings', () => {
        expect('hello' + 'world').toBe('helloworld');
      });

      it('should convert argument to string', () => {
        expect('hello' + 5).toBe('hello5');
      });

      it('should evaluate from left to right & convert', () => {
        expect(1 + 2 + 'hello').toBe('3hello');
      });
    });

    describe('Other operators behaviour', () => {
      it('should convert all operands to numbers first', () => {
        expect(1 - '3').toBe(-2);
      });
    });

    describe('Unary + conversion', () => {
      it('should convert not number to a number', () => {
        expect('5').not.toEqual(jasmine.any(Number));
        expect(+'5').toEqual(jasmine.any(Number));
      });

      it('should convert boolean to a number', () => {
        expect(+true).toEqual(1);
        expect(+false).toEqual(0);
      });

      it('should be equivalent of Number()', () => {
        expect(Number(true)).toEqual(1);
      });

      it('should sum two no numbers as number', () => {
        const apples = '2';
        const oranges = '3';
        expect(+apples + +oranges).toEqual(5);
      });
    });

    describe('Operator precedence', () => {
      it('should read the section', () => { });
    });

    describe('Remainder %', () => {
      it('should should give remainder of integer division', () => {
        expect(5 % 3).toBe(2);
        expect(18 % 3).toBe(0);
        expect(7 % 2).toBe(1);
      });
    });

    describe('Exponentiation **', () => {
      it('should should give remainder of integer division', () => {
        expect(5 ** 2).toBe(25);
        expect(2 ** 4).toBe(16);
      });
    });

    describe('Bitwise operators', () => {
      it('should read the section', () => { });
    });

    describe('Comma operator', () => {
      it('should return only last item evaluation', () => {
        let a = (1 + 2, 3 + 4);
        expect(a).toBe(7);
      });
    });
  });

  describe('2.8 Comparisons', () => {
    it('should return boolean type result', () => {
      expect(2 > 3).toBe(false);
    });

    it('should do string comparison (char by char)', () => {
      expect('z' > 'a').toBe(true);
    });

    it('should do string comparison (char by char) for longer strings', () => {
      expect('abc' > 'abd').toBe(false);
    });

    it('should compare with different types, js will convert to numbers', () => {
      expect('2' > 1).toBe(true);
      expect('02' == 2).toBe(true);
    });

    it('should strict equal with ===', () => {
      expect(0 === false).toBe(false);
      // but..
      expect(0 == false).toBe(true);
    });
  });

  describe('2.9 Interaction: alert, prompt, confirm', () => {
    it('should read alert section', () => { });
    it('should read prompt section', () => { });
    it('should read confirm section', () => { });
  });

  describe('2.10 Conditionals, if, teriary ?', () => {
    describe('The "if" statement', () => {
      it('should evaluate expression and run body if truthy', () => {
        const year = 2015;

        if (year === 2015) {
          expect(year).toBe(2015);
        } else {
          throw Error();
        }
      });

      it('should evaluate following expressions to boolean false', () => {
        if (0 || null || undefined || NaN || false || '') {
          throw Error();
        }
      });

      it('should use several else-if clauses', () => {
        const year = 2019;

        if (year < 2015) {

        } else if (year > 2015) {

        } else if (year === 2015) {

        }
      });
    });

    describe('Ternary operator "?"', () => {
      it('should be shorter form of if-else', () => {
        const result = (2015 > 0) ? true : false;

        expect(result).toBe(true);
      });
    });
  });

  describe('2.11 Logical Operators', () => {
    describe('|| (OR)', () => {
      it('should work with booleans', () => {
        expect(true || true).toBe(true);
        expect(false || true).toBe(true);
        expect(true || false).toBe(true);
        expect(false || false).toBe(false);
      });

      it('should work other types, converted implicitly to booleans', () => {
        expect((1 || 0)).toBe(1);
      });

      it('should find first truthy value', () => {
        const v1 = 0;
        const v2 = null;
        const v3 = 'hey';

        expect((v1 || v2 || v3)).toBe('hey');
      });

      it('should be used for short-circuit evaluations', () => {
        expect(1 || null.test()).toBe(1);
      });
    });

    describe('&& (AND)', () => {
      it('should work with booleans', () => {
        expect(true && true).toBe(true);
        expect(false && true).toBe(false);
        expect(true && false).toBe(false);
        expect(false && false).toBe(false);
      });

      it('should find first falsy value', () => {
        expect(0 && null.test()).toBe(0);
      });
    });

    describe('! (NOT)', () => {
      it('should negate boolean value', () => {
        expect(!false).toBe(true);
        expect(!0).toBe(true);
      });

      it('should convert to boolean with double ! (!!)', () => {
        expect(!!'a').toEqual(jasmine.any(Boolean));
        expect(!!'a').toBe(true);
        expect(!!null).toBe(false);
      });
    });
  });

  describe('2.12 Loops: while and for', () => {
    describe('The while loop', () => {
      it('should loop unless condition is not met', () => {
        let i = 0, result = '';

        while (i < 3) {
          result += '-';
          i++;
        }

        expect(result).toEqual('---');
      });
    });

    describe('The do...while loop', () => {
      it('should loop unless condition is not met, first evaluate body before checking condition', () => {
        let i = 0, result = '';

        do {
          result += '-';
          i++;
        } while (i < 3)

        expect(result).toEqual('---');
      });
    });

    describe('For loop', () => {
      it('should loop unless condition is not met', () => {
        result = '';

        for (let i = 0; i < 3; i++) {
          result += '-';
        }

        expect(result).toEqual('---');
      });

      it('should skip part', () => {
        let i = 0, result = '';

        for (; i < 3;) {
          result += '-';
          i++;
        }

        expect(result).toEqual('---');
      });

      it('should break the loop', () => {
        result = '';

        for (let i = 0; i < 3; i++) {
          if (i === 1) break;
          result += '-';
        }

        expect(result).toEqual('-');
      });

      it('should continue to next iteration', () => {
        result = '';

        for (let i = 0; i < 3; i++) {
          if (i === 1) continue;
          result += '-';
        }

        expect(result).toEqual('--');
      });
    });
  });

  describe('2.13 The "switch" statement', () => {
    it('should strict compare and call appropriate case section', () => {
      let a = 2 + 2;
      let result;

      switch (a) {
        case 3:
          result = 'wrong';
          break;
        case 4:
          result = 'ok';
          break;
        default:
          result = 'wrong';
      }

      expect(result).toEqual('ok');
    });

    it('should group case statements', () => {
      let a = 2 + 2;
      let result;

      switch (a) {
        case 3:
        case 4:
          result = 'ok';
          break;
        default:
          result = 'wrong';
      }

      expect(result).toEqual('ok');
    });
  });

  describe('2.14 Functions', () => {
    describe('Declaration', () => {
      it('should use function syntax', () => {
        function getName() {
          return 'ptr';
        }

        expect(getName()).toEqual('ptr');
      });
    });

    describe('Local variables', () => {
      it('should be visible only inside function', () => {
        function foo() {
          let msg = 'hello';
          return msg;
        }

        expect(function () {
          msg; // not declared
        }).toThrow();
      });
    });

    describe('Outer variables', () => {
      it('should be visible inside function', () => {
        let msg = 'hello';

        function foo() {
          return msg;
        }

        expect(foo()).toEqual('hello');
      });

      it('should obscure outer with inner with same name', () => {
        let msg = 'hello';

        function foo() {
          let msg = 'other';
          return msg;
        }

        expect(foo()).toEqual('other');
        expect(msg).toEqual('hello');
      });
    });

    describe('Parameters', () => {
      it('should pass in function declaration', () => {
        function message(from, to) {
          return `${from}: ${to}`;
        }

        expect(message('today', 'tommorow')).toEqual('today: tommorow');
      });

      it('should support default values', () => {
        function message(from, to = 'one day') {
          return `${from}: ${to}`;
        }

        expect(message('today')).toEqual('today: one day');
      });
    });

    describe('Returning a value', () => {
      it('should return one single value', () => {
        function getName() {
          return 'ptr';
        }

        expect(getName()).toEqual('ptr');
      });

      it('should return without anything giving undefined', () => {
        function getName() {
          return;
        }

        expect(getName()).toBeUndefined();
      });
    });
  });

  describe('2.15 Function expressions and arrows', () => {
    it('should declare function expression', () => {
      let fn = function () {
        return 'hey';
      }

      const otherFn = fn;

      expect(fn()).toEqual('hey');
      expect(fn).toEqual(jasmine.any(Function));
      expect(otherFn()).toEqual('hey');
    });

    it('should not be called before declaration', () => {
      expect(function () {
        fn();
      }).toThrow();

      expect(function () {
        fn2();
      }).not.toThrow();

      let fn = function () {
        return 'hey';
      }

      function fn2() {
        return 'hey';
      }
    });

    it('should use arrow function notation', () => {
      let fn = (a, b, ...c) => a + b + c;

      expect(fn('what', 'to', 'do')).toEqual('whattodo');
    });
  });

  describe('2.16 Javascript specials', () => {
    it('should read the section', () => { });
  });
});
