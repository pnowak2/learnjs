describe('Basic Types', () => {
  describe('Boolean', () => {
    it('should declare it', () => {
      let isDone: boolean = true;
      expect(isDone).toBeTruthy();
    });
  })

  describe('Number', () => {
    it('should declare it', () => {
      let decimal: number = 6;
      let hex: number = 0x6;
      let binary: number = 0b1101;
      let octal: number = 0o7;

      expect(decimal).toEqual(jasmine.any(Number));
      expect(hex).toEqual(jasmine.any(Number));
      expect(binary).toEqual(jasmine.any(Number));
      expect(octal).toEqual(jasmine.any(Number));
    });
  });

  describe('String', () => {
    it('should declare it', () => {
      let color: string = "blue";
      let anotherColor = 'red';
      let msg = `color is ${color}`;

      expect(msg).toEqual('color is blue');
    });
  });

  describe('Array', () => {
    it('should declare with []', () => {
      const list: number[] = [1, 2, 3];
    });

    it('should declare with generics notation', () => {
      const list: Array<number> = [1, 2, 3];
    });
  });

  describe('Tuple', () => {
    it('should declare tuple which is array with known number of elements', () => {
      let tpl: [number, string] = [5, 'ack'];

      expect(tpl[0]).toEqual(5);
      expect(tpl[1]).toEqual('ack');
    });
  });

  describe('Enum', () => {
    enum Colors {
      RED = 5, GREEN, BLUE
    };

    it('should declare like friendly set of numeric values', () => {
      const c: Colors = Colors.BLUE;

      expect(c).toEqual(Colors.BLUE);
      expect(c).toEqual(7);
    });

    it('should give enum name based on value', () => {
      expect(Colors[5]).toEqual('RED');
    });
  });

  describe('Any', () => {
    it('should declare any unknown type', () => {
      let notSure: any = 4;
      notSure = 'maybe..';
      
      expect(function() {
        notSure();
      }).toThrow();

      expect(notSure).toEqual('maybe..');
    });
  });

  describe('Void', () => {
    it('should be like opposite of any', () => {
      function fn(): void {
        return; // cannot return anything here
      }

      let x: void = undefined;
      // x = 5; // illegal, void type
    });
  });

  describe('Null', () => {
    it('should allow only null to be assigned', () => {
      let x: null = null;
    });
  });

  describe('Undefined', () => {
    it('should allow only null to be assigned', () => {
      let x: undefined = undefined;
    });
  });

  describe('Never', () => {
    it('should be useful to state function never returns, must have unreachable end point', () => {
      function fn(): never {
        throw new Error('boo!');
      }

      expect(function() {
        fn();
      }).toThrowError('boo!')
    });
  });

  describe('Object', () => {
    it('should allow only non primitive types', () => {
      let x: object = {};
      let y: object = [];
      // let z: object = 5; // primitive, gives error
    });
  });
});