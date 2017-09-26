import { Store, Action, Reducer, reducer, incrementAction } from './03-minimal-store';

describe('Minimal Store', () => {
  it('should use minimal store', () => {
    const store = new Store<number>(reducer, 0);

    expect(store.getState()).toBe(0);

    store.dispatch(incrementAction);
    expect(store.getState()).toBe(1);

    store.dispatch({ type: 'PLUS', payload: 12 });
    expect(store.getState()).toBe(13);
  });

  it('should use store callbacks', (done) => {
    const store = new Store<number>(reducer, 0);

    const subscription = store.subscribe(() => {
      expect(store.getState()).toBe(1);
      done();
    });

    store.dispatch(incrementAction);
    subscription();
  });
});
