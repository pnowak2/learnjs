import { expect } from 'chai';
import { myObservable } from '../src/my.observable';
import { mapOperator } from '../src/map.operator';

describe('1 Thinking Reactively', () => {

  xit('should define my simple observable', () => {

    const teardown = myObservable({
      next(val) { console.log(val); },
      complete() { console.log('completed'); },
      error(err) { console.error(err) }
    });

    setTimeout(function () {
      teardown();
    }, 1000);
  });

  it('should define my operator', () => {
    const source = mapOperator(myObservable, (val) => val * val);

    const teardown = source({
      next(val) { console.log(val); },
      complete() { console.log('completed'); },
      error(err) { console.error(err) }
    });

    setTimeout(teardown, 1000);
  });
});