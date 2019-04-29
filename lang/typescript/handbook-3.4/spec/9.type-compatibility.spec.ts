describe('9 Type Compatibility', () => {
  describe('Introduction', () => {
    it('should check shape, not type', () => {
      interface Named {
        name: string;
      }

      class Person {
        name: string;
      }

      let p: Named = new Person();
    });
  });

  describe('Compatibility', () => {
    it('should be compatibile if subject has at least same members', () => {
      interface Named {
        name: string;
      }

      let obj = { name: 'peter', age: 38 };
      let x: Named = obj;
    });

    it('should functions be compatibile, excess params case', () => {
      let x = (a: number) => 0;
      let y = (b: number, s: string) => 0;

      // x = y; // not enough params
      y = x;
    });
  });

  describe('Function Parameter Bivariance', () => {
    it('should behave read the section', () => { });
  });

  describe('Classes', () => {
    it('should check instance variables only, private/protected matters, statics are ignored', () => {
      class Animal {
        static origin: string;
        feet: number;
        constructor(name: string, numFeet: number) { }
      }
  
      class Size {
        feet: number;
        constructor(numFeet: number) { }
      }
  
      let a: Animal = new Animal('ant', 1);
      let s: Size = new Size(5);
  
      a = s;
      s = a;
    });
  });
});