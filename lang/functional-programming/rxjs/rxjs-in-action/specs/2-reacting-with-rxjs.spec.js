import { expect } from 'chai';
import * as sinon from 'sinon';
import EventEmitter from 'events'

describe('2 Reacting with RxJs', () => {
  describe('2.1 FP as pillar of Reactive Programming', () => {
    describe('2.1.1 Functional Programming', () => {
      it('should use high order functions to work with arrays', () => {
        const isEven = (n) => n % 2 === 0;
        const square = n => n * n;
        const add = (a, b) => a + b;

        const arr = [1, 2, 3, 4, 5];

        const result = arr
          .filter(isEven)
          .map(square)
          .reduce(add);

        expect(result).to.eql(20);
      });


      it('should build simple Stream', () => {
        class Stream {
          constructor(fn) {
            this.subscribe = fn;
          }

          map(mapfn) {
            return new Stream((observer) => {
              return this.subscribe({
                next(item) { observer.next(mapfn(item)) }
              })
            });
          }

          static fromArray(arr) {
            return new Stream((observer) => {
              arr.forEach(item => {
                observer.next(item);
              })
            });
          }
        }

        let result = '';

        Stream
          .fromArray([1, 2, 3])
          .map(val => val * val)
          .subscribe({
            next(item) {
              result += '' + item;
            }
          });

        expect(result).to.eql('149');
      });

    });
  });
});