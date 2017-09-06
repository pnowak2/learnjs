import { expect } from 'chai';
import { Observable } from '../src/observable.class';

describe('1 Thinking Reactively', () => {
  it('should define my operator', () => {

    const down$ = Observable.fromEvent(window, 'mousedown');
    const move$ = Observable.fromEvent(window, 'mousemove');
    const up$ = Observable.fromEvent(window, 'mouseup');

    const finish = down$
      .flatMap(val => move$.takeUntil(up$))
      // .fromArray([1, 2, 2, 3, 4, 5])
      // .fromEvent(window, 'click')
      // .takeUntil(Observable.fromEvent(window, 'keydown'))
      // .count()
      // .map(val => val * val + '!')
      // .map(val => val + '!')
      // .flatMap(val => Observable.ajax('https://api.github.com/users/pnowak2', 'orgs'))
      // .take(3)
      // .buffer(2)
      // .map(data => data.login)
      // .distinct()
      .count()
      .subscribe({
        next(val) { console.log(val); },
        complete() { console.log('completed') }
      });
  });
});