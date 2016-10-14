import { expect } from 'chai';

describe('Basic Types', () => {
  describe('Boolean', () => {
    it('should declare with proper type', () => {
      let isDone: boolean = false;

      expect(isDone).to.eql(false);
    });
  });

  describe('Number', () => {
    it('should declare with proper type', () => {
      let decimal: number = 6;
      let hex: number = 0x6;
      let binary: number = 0b1;
      let octal: number = 0o12;

      expect(decimal).to.eql(6);
      expect(hex).to.eql(0x6);
      expect(binary).to.eql(0b1);
      expect(octal).to.eql(0o12);
    });
  });

  describe('String', () => {
    it('should declare with proper type', () => {
      let name: string = 'piotr';
      let middle: string = `andrzej`;
      let last: string = "nowak";
      let full: string = `${name} ${middle} ${last}`;

      expect(name).to.eql('piotr');
      expect(middle).to.eql('andrzej');
      expect(last).to.eql('nowak');
      expect(full).to.eql('piotr andrzej nowak');
    });
  });

  describe('Array', () => {
    it('should declare with proper type', () => {
      let list: number[] = [1, 2, 3];

      expect(list).to.eql([1, 2, 3]);
    });

    it('should declare with proper type and generics', () => {
      let list: Array<number> = [1, 2, 3];

      expect(list).to.eql([1, 2, 3]);
    });
  });

  describe('Tupple', () => {
    it('should declare with proper type (array with fixed number of elements with known type)', () => {
      let x: [string, number] = ['foo', 24];

      expect(x).to.eql(['foo', 24]);

      expect(x[0]).to.eql('foo');
      expect(x[2]).to.eql(undefined);
    });
  });

  describe('Enum', () => {
    it('should declare enum type', () => {
      enum Color { Red = 1, Green, Blue };

      let c = Color.Blue;

      expect(c).to.eql(Color.Blue);
      expect(c).to.eql(3);
    });
  });

  describe('Any', () => {
    it('should use if type is not known in advance', () => {
      let notSure: any = 22;
      notSure = 'changing to string';
      notSure = false;

      expect(notSure).to.eql(false);
    });

    it('should use to declare arrays of mixed types', () => {
      let list: any[] = [1, 'a', Object];

      expect(list[2]).to.eql(Object);
    });
  });

  describe('Void', () => {
    it('should use as opposite of any (nothing)', () => {
      function fn(): void { };
      expect(fn()).to.eql(undefined);
    });

    it('should assign only undefined or null to void type', () => {
      let unusable: void = undefined;
      let useless: void = null;

      expect(unusable).to.be.undefined;
      expect(useless).to.be.null;
    });
  });

  // describe('Null and undefined', () => {
  //   it('should use Null', () => {
  //     let u: undefined = undefined;
  //     let n: null = null;

  //     expect(u).to.be.undefined;
  //     expect(n).to.be.null; 
  //   });
  // });

  // describe('Never', () => {
  //   function fn() : never {
  //     throw new Error();
  //   }
  // });

  describe('Type Assertions', () => {
    it('should use like casting types with angle brackets', () => {
      let something: any = "test";

      expect((<string>something).length).to.eql(4);
    });

    it('should use like casting types with "as" keyword', () => {
      let something: any = "test";

      expect((something as string).length).to.eql(4);
    });
  });
});
