import { expect } from 'chai';

describe('Basic Types', () => {
  describe('Boolean', () => {
    it('should declare it', () => {
      let isDone: boolean = false;

      expect(isDone).to.be.false;
    });
  });

  describe('Number', () => {
    it('should declare it', () => {
      let decimal: number = 6;
      let hex: number = 0xf00d;
      let binary: number = 0b101;
      let octal: number = 0o6;

      expect(decimal).to.eql(6);
      expect(hex).to.eql(0xf00d);
      expect(binary).to.eql(0b101);
      expect(octal).to.eql(0o6);
    });
  });

  describe('String', () => {
    it('should declare it', () => {
      let color: string = 'test';

      expect(color).to.eql('test');
    });

    it('should use template string', () => {
      let name: string = 'Piotr';
      let greeting: string = `Hello, my name is ${name}`;

      expect(greeting).to.eql('Hello, my name is Piotr');
    });
  });

  describe('Array', () => {
    it('should declare it', () => {
      let list: [string] = ['hello', 'world'];
      let list2: Array<string> = ['hello', 'world'];

      expect(list).to.eql(['hello', 'world']);
      expect(list2).to.eql(['hello', 'world']);
    });
  });

  describe('Tuple', () => {
    it('should declare it', () => {
      let tuple: [string, number] = ['test', 5];
      // tuple = [5, 'test']; // ILLEGAR, ERROR

      expect(tuple).to.eql(['test', 5]);
    });
    
    it('should access tuple elements', () => {
      let tuple: [string, number] = ['test', 5];

      expect(tuple[0]).to.eql('test');
      expect(tuple[1]).to.eql(5);
    });     
  });
  
  describe('Enum', () => {
    it('should declare it', () => {
      enum Color { Red = 2, Blue, Green };

      let c:Color = Color.Green;

      expect(c).to.eql(Color.Green);
    });
  });

  describe('Any', () => {
    it('should declare it', () => {
      let notSure: any = 4;
      notSure = 'maybe string then';
      notSure = false;

      expect(notSure).to.eql(false);
    });
    
    it('should allow call any method on it', () => {
      let notSure: any = 'test';

      notSure.toUpperCase();
      // notSure.doesNotExist(); // possible, but here does not exist, will throw error
    });
    
    it('should be handy for array of different types', () => {
      let list: any[] = [1, true, 'false'];

      expect(list).to.eql([1, true, 'false']);
    });
  });

  describe('Void', () => {
    it('should declare it', () => {
      let c:void = undefined;
      let f = () => void {}

      expect(c).to.eql(void 0);
    });
  });

  describe('Null and Undefined', () => {
    it('should declare it', () => {
      let u:undefined = undefined;
      let n:null = null;

      expect(u).to.eql(void 0);
      expect(n).to.eql(null);
    });
  });

  describe('Never', () => {
    it('should declare it', () => {
      function error(message: string): never {
        throw new Error(); // without throwing will cause compilation error
      }

      function infinite(): never {
        while(true) {
          // or should be infinite, cannot ever return
        }
      }
    });
  });

  describe('Type assertions', () => {
    it('should declare it', () => {
      let notSure: any = 'test';

      let isaString = notSure as string;
      let isaString2 = <string>notSure;

      expect(isaString).to.eql('test');
      expect(isaString2).to.eql('test');
    });
  });
});
