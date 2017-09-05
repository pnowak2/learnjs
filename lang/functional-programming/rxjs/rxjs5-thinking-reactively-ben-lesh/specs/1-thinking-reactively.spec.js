import { expect } from 'chai';
import { Observable } from '../src/observable.class';

describe('1 Thinking Reactively', () => {
  it('should define my operator', () => {
    const finish = Observable
      // .fromArray([5, 6])
      .fromEvent(window, 'click')
      .count()
      .map(val => val * val + '!')
      .map(val => val + '!')
      .flatMap(val => Observable.fromArray([val, 2, 3, 4, 5]))
      // .take(3)
      .subscribe({
        next(val) { console.log(val) },
        complete() { console.log('completed') }
      });
  });
});