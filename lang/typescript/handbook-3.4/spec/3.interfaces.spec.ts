describe('3 Interfaces', () => {
  describe('First interface', () => {
    it('should use explicit syntax with function example', () => {
      function fn(labeledObj: { label: string }): string {
        return labeledObj.label;
      }

      const arg = { label: 'hejo', api: false };
      const result = fn(arg);

      expect(result).toEqual('hejo');
    });

    it('should use interface to describe argument', () => {
      interface LabeledValue {
        label: string
      }

      function fn(labeledObj: LabeledValue): string {
        return labeledObj.label;
      }

      const arg = { label: 'hejo', api: false };
      const result = fn(arg);

      expect(result).toEqual('hejo');
    });
  });

  describe('Property definition', () => {
    it('should care about shape, not implementation of arg', () => {
      interface LabeledValue {
        label: string;
      }

      function fn(labeled: LabeledValue) { return labeled.label }
      const arg = { label: 'test' }
      const result = fn(arg);
      
      expect(result).toEqual('test')
    });

    it('should not allow to put literal with excess props, unless cast to proper type', () => {
      interface LabeledValue {
        label: string;
      }

      function fn(labeled: LabeledValue) { return labeled.label }
      // fn({ label: 'test', age: 38 }); // error
      const result = fn({ label: 'test', age: 38 } as LabeledValue);

      expect(result).toEqual('test')
    });
  });

  describe('Optional Properties', () => {
    it('should make some/all props optional', () => {
      interface SquareConfig {
        color?: string;
        width?: number;
      }

      function makeSquare(config: SquareConfig): SquareConfig {
        const defaults = { color: 'white', width: 10 };

        return { ...defaults, ...config };
        // or 
        // return Object.assign({}, defaults, config);
      }

      expect(makeSquare({})).toEqual({ color: 'white', width: 10 });
      expect(makeSquare({ color: 'red' })).toEqual({ color: 'red', width: 10 });
      expect(makeSquare({ width: 5 })).toEqual({ color: 'white', width: 5 });
      expect(makeSquare({ color: 'red', width: 5 })).toEqual({ color: 'red', width: 5 });
    });
  });

  describe('Readonly Properties', () => {
    it('should make some/all properties as readonly', () => {
      
    });
  });
});