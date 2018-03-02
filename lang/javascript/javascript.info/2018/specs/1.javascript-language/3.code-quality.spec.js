var expect = require('chai').expect;

describe('3. Code Quality', () => {
  describe('3.1 Debugging in Chrome', function () {
    it('should read the section', function () { });
    it('should use console', () => { });
    it('should use breakpoints', () => { });
    it('should use conditional breakpoints', () => { });
    it('should pause at breakpoint', () => { });
    it('should trace the execution', () => { });
  });

  describe('3.2 Coding Style', () => {
    it('should read the section', () => { });
  });

  describe('3.3 Comments', () => {
    it('should read the section', () => { });
  });

  describe('3.4 Ninja Code', () => {
    it('should read the section', () => { });
  });

  describe('3.5 Automated Testing With Mocha', () => {
    it('should read the section', () => { });

    describe('The Spec In Action', () => {
      function pow(number, power) {
        let result;

        if (power === 0) {
          return 1;
        } else if (power < 0) {
          return 1 / (number * pow(number, -power - 1));
        } else if (power !== 1) {
          return number * pow(number, power - 1);
        } else {
          return number;
        }
      }

      it('should pow be defined', () => {
        expect(typeof pow).to.eql('function');
      });

      it('should 2 raised to 3 power be 8', () => {
        expect(pow(2, 3)).to.eql(8);
      });

      it('should 3 raised to 3 power be 27', () => {
        expect(pow(3, 3)).to.eql(27);
      });

      it('should 4 raised to 4 power be 256', () => {
        expect(pow(4, 4)).to.eql(256);
      });

      it('should 12 raised to 1 power be 12', () => {
        expect(pow(12, 1)).to.eql(12);
      });

      it('should 4 raised to 0 power be 1', () => {
        expect(pow(4, 0)).to.eql(1);
      });

      it('should 2 raised to -2 power be 0.25', () => {
        expect(pow(2, -2)).to.eql(0.25);
      });

      it('should 2 raised to -3 power be 0.125', () => {
        expect(pow(2, -3)).to.eql(0.125);
      });
    });
  });

  describe('3.6 Polyfills', () => {
    it('should read the section', () => { });
  });
});

