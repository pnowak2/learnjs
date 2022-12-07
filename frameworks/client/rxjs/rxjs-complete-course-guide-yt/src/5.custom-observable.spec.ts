import { from, lastValueFrom, fromEvent, Observable, Observer } from 'rxjs';
import { toArray } from 'rxjs/operators';

describe('Create Custom Observable', () => {
  it('should behave as built-in types', (done) => {
    const stream$ = new Observable((observer: Observer<number>) => {
      [1, 2, 3].forEach(n => {
        setTimeout(() => {
          observer.next(n);
        }, 100 * n);
      });

      setTimeout(() => {
        observer.complete();
      }, 400);
    });

    const nextFn = jest.fn();

    stream$.subscribe({
      next: (n) => {
        nextFn(n);
      },
      complete: () => {
        expect(nextFn).toHaveBeenCalledTimes(3);
        expect(nextFn).toHaveBeenCalledWith(1);
        expect(nextFn).toHaveBeenCalledWith(2);
        expect(nextFn).toHaveBeenCalledWith(3);
        done();
      }
    });

  });
});