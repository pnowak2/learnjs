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
  });
});