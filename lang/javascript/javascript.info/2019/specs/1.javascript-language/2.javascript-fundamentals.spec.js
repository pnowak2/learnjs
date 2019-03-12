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
});
