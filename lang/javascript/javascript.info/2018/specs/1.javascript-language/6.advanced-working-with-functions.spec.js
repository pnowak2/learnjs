var expect = require('chai').expect;
var sinon = require('sinon');

describe('6. Advanced Working With Functions', () => {
  describe('6.1 Recursion and Stack', function () {
    it('should read the section', () => { });

    it('should write simple recursive function', () => {
      function power(val, pow) {
        if (pow === 1) {
          return val;
        } else {
          return val * power(val, pow - 1);
        }
      }

      expect(power(3, 3)).to.eql(27);
    });

    describe('The execution stack', () => {
      it('should read the section', () => { });
    });
  });

  describe('6.2 Rest Parameters and Spread Operator', () => {
    describe('Rest parameters ...', () => {
      it('should gather excessive param with rest ... operator', () => {
        function fn(p1, p2, ...rest) {
          return [p1, p2, ...rest].join(', ');
        }

        expect(fn('a', 'b', 'c', 'd')).to.eql('a, b, c, d');
      });
    });

    describe('The arguments variable', () => {
      it('should have special array-like argument in functions', () => {
        function fn() {
          let args = Array.from(arguments);
          return args.join(', ');
        }

        expect(fn(1, 2, 3, 4)).to.eql('1, 2, 3, 4');
      });
    });

    describe('Spread operator', () => {
      it('should spread array to stand-alone arguments', () => {
        expect(Math.max([1, 2, 3])).not.to.eql(3);
        expect(Math.max(...[1, 2, 3])).to.eql(3);
        expect([0, ...[1, 2, 3]]).to.eql([0, 1, 2, 3]);
      });
    });
  });
  describe('6.3 Closure', () => {
    describe('A couple of questions', () => {
      it('should use external variable', () => {
        let name = 'john';

        function fn() {
          return `hello, ${name}`;
        }

        name = 'peter';

        expect(fn()).to.eql('hello, peter');
      });

      it('should use nested context with variables', () => {
        function outer() {
          let name = 'peter';

          return function() { 
            return name;
          }
        }

        let name = 'john';
        let work = outer();

        expect(work()).to.eql('peter');
      });

      it('should do counter excercise', () => {
        function makeCounter() {
          let counter = 0;

          return function() {
            return counter++;
          }
        }

        let c = makeCounter();

        expect(c()).to.eql(0);
        expect(c()).to.eql(1);
        expect(c()).to.eql(2);

        let d = makeCounter();

        expect(d()).to.eql(0);
        expect(d()).to.eql(1);
        expect(d()).to.eql(2);
      });

      it('should behave...', () => {
        
      });
    });
  });
});
