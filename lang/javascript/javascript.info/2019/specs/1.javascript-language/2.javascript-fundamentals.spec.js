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
        expect(1/0).toEqual(Infinity);
      });   
      
      it('should support NaN (not a number)', () => {
        expect(1/'a').toEqual(NaN);
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
        expect(typeof('test')).toBe('string');
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
        expect(typeof('3' / '6')).toEqual('number');
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
      it('should ..', () => {
        
      });
    });
  });
});
