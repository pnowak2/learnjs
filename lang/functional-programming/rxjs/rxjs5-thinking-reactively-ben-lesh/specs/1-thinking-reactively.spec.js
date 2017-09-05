import { expect } from 'chai';
import { Observable } from '../src/observable.class';

describe('1 Thinking Reactively', () => {
  it('should define my operator', () => {
    const finish = Observable
      // .fromArray([1, 2, 2, 3, 4, 5])
      .fromEvent(window, 'click')
      .count()
      // .map(val => val * val + '!')
      // .map(val => val + '!')
      .flatMap(val => Observable.ajax('https://api.github.com/users/pnowak2', 'orgs'))
      // .take(3)
      // .buffer(2)
      .map(data => data.login)
      .distinct()
      .subscribe({
        next(val) { console.log(val); },
        complete() { console.log('completed') }
      });
  });
});