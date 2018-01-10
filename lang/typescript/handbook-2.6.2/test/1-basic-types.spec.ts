import { expect } from 'chai';

describe('Basic Types', () => {
  describe('Boolean', () => {
    it('should declare it', () => {
      let isDone: boolean = false;

      expect(isDone).to.be.false;
    });

    describe('Number', () => {
      it('should be decimal', () => {
        let decimal: number = 6;
        expect(decimal).to.eql(6);
      });

      it('should be hex', () => {
        let hex: number = 0xff;
        expect(hex).to.eql(255);
      });

      it('should be oct', () => {
        let oct: number = 0o10;
        expect(oct).to.eql(8);
      });

      it('should be binary', () => {
        let binary: number = 0b111;
        expect(binary).to.eql(7);
      });
    });

    describe('String', () => {
      it('should use quotes', () => {
        let str = 'test';
        expect(str).to.eql('test');
      });

      it('should use backticks', () => {
        let str = `test`;
        expect(str).to.eql(`test`);
      });

      it('should use string interpolation', () => {
        const name = 'peter';
        let str = `hello, ${name}`;
        expect(str).to.eql('hello, peter');
      });
    });

    describe('Array', () => {
      it('should declare with brackets', () => {
        let list: number[] = [1, 2, 3]
      });

      it('should declare with Array<>', () => {
        let list: Array<number> = [1, 2, 3]
      });
    });

    describe('Tuple', () => {
      it('should declare tuple', () => {
        let tuple: [string, number];
        tuple = ['hello', 10];

        expect(tuple[0]).to.eql('hello');
        expect(tuple[1]).to.eql(10);
        expect(tuple[2]).to.be.undefined;
      });
    });

    describe('Enum', () => {
      it('should declare enum', () => {
        enum Colors {
          RED, GREEN, BLUE
        }

        let tp: Colors = Colors.RED;

        expect(tp).to.eql(0);
      });
    });

    describe('Any', () => {
      it('should declare any', () => {
        let notSure: any = 4;
        notSure = 'test';
        // notSure.doesNotExist(); // valid code

        expect(notSure).to.eql('test');
      });
    });

    describe('Void', () => {
      it('should declare void', () => {
        let fn = (): void => { };

        expect(fn()).to.be.undefined;
      });
    });

    describe('Null & Undefined', () => {
      it('should declare Null', () => {
        let n: null = null;
        let u: undefined = undefined;
      });
    });

    describe('Never', () => {
      it('should declare Never, function never can return value', () => {
        function forever(): never {
          throw new Error('boo!');
        }

        expect(function() {
          forever();
        }).to.throw;
      });
    });

    describe('Type Assertions / Casting', () => {
      it('should assert that im know what im doing', () => {
        let value: string = 'hello world';

        let length = (<string>value).length;
        length = (value as string).length;

        expect(length).to.eql(11);
      });
    });
  });
});
