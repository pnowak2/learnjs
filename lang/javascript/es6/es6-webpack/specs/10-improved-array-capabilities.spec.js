var expect = require('chai').expect;

describe('Improved Array Capabilities', function () {
  describe('api', () => {
    describe('.of()', () => {
      it('creates array of passed arguments', () => {
        let arr = Array.of(1, 2, 3);

        expect(arr[2]).to.eql(3);
      });
    });

    describe('.from()', () => {
      it('creates array from array-like objects', () => {
        function f() {
          let arr = Array.from(arguments);
          expect(arr[2]).to.eql(3);
        }

        f(1, 2, 3);
      });

      it('should work with iterables', () => {
        let obj = {
          *[Symbol.iterator]() {
            yield 1;
            yield 2;
            yield 3;
          }
        };

        let arr = Array.from(obj);

        expect(arr[2]).to.eql(3);
      });

      it('creates array from array-like objects and maps each value', () => {
        function f() {
          let arr = Array.from(arguments, value => value * value);
          expect(arr[2]).to.eql(9);
        }

        f(1, 2, 3);
      });
    });

    describe('.find()', () => {
      it('should find the first value matching criteria', () => {
        var found = [1, 2, 3, 4, 5, 6].find(value => value > 4);

        expect(found).to.eql(5);
      });
    });

    describe('.findIndex()', () => {
      it('should find the index of first value matching criteria', () => {
        var found = ['foo', 'bar', 'baz'].findIndex(value => value === 'bar');

        expect(found).to.eql(1);
      });
    });

    describe('.fill()', () => {
      it('should fill array with values', () => {
        var arr = [1, 2, 3, 4];

        expect(arr.fill(6)).to.eql([6, 6, 6, 6]);
      });
    });

    describe('.copyWithin()', () => {
      it('should copies elements from the same array to given location defined by start and stop index', () => {
        var arr = [1, 2, 3, 4, 5, 6, 7];

        expect(arr.copyWithin(2, 5, 6)).to.eql([1, 2, 6, 4, 5, 6, 7]);
      });
    });
  });


  describe('Array Buffers', () => {
    it('should create array buffer with size of 10 bytes', () => {
      let buf = new ArrayBuffer(10);

      expect(buf).to.be.instanceOf(ArrayBuffer);
    });

    describe('api', () => {
      describe('.byteLength', () => {
        it('should return byte length of array buffer', () => {
          let buf = new ArrayBuffer(10);

          expect(buf.byteLength).to.eql(10);
        });
      });

      describe('.slice()', () => {
        it('should return new buffer with sliced part', () => {
          let buf = new ArrayBuffer(10);
          let sliced = buf.slice(4, 6);

          expect(sliced.byteLength).to.eql(2);
          expect(sliced).to.be.instanceOf(ArrayBuffer);
        });
      });

      describe('More for buffers maybe later..', () => {
        it('to be continued (or not :))', () => {
          
        });
      });
    });
  });
});