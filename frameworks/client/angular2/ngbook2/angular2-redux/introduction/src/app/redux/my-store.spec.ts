import { Store } from './my-store';
import { Reducer } from './my-redux';

describe('My Store', () => {
  describe('Creation', () => {
    it('should be defined', () => {
      expect(Store).toEqual(jasmine.any(Function));
    });

    it('should accept reducer and initial state', () => {
      const reducer: Reducer<number> = (state: number) => state;
      const initialState: number = 0;

      let store: Store<number> = new Store<number>(reducer, initialState);

      expect(store).toEqual(jasmine.any(Store));
    });
  });

  describe('API', () => {
    describe('.getState()', () => {
      it('should be defined', () => {
        expect(Store.prototype.getState).toEqual(jasmine.any(Function));
      });

      it('should return the state', () => {
        let reducer: Reducer<number> = (state: number) => state;
        let store: Store<number> = new Store(reducer, 82);

        expect(store.getState()).toBe(82);
      });
    });

    describe('.dispatch()', () => {
      it('should be defined', () => {
        expect(Store.prototype.dispatch).toEqual(jasmine.any(Function));
      });

      it('should call reducer with action', () => {
        let reducerSpy: Reducer<number> = jasmine.createSpy('reducer');
        let store: Store<number> = new Store(reducerSpy, 0);

        store.dispatch({ type: 'MYACTION' });

        expect(reducerSpy).toHaveBeenCalledWith(0, { type: 'MYACTION' })
      });

      it('should update store state', () => {
        let reducerSpy: Reducer<number> = jasmine.createSpy('reducer').and.returnValue('new state');
        let store: Store<number> = new Store(reducerSpy, 0);

        store.dispatch({ type: 'MYACTION' })

        expect(store.getState()).toEqual('new state');
      });

      it('should not return anything', () => {
        let reducerSpy: Reducer<number> = jasmine.createSpy('reducer').and.returnValue('new state');
        let store: Store<number> = new Store(reducerSpy, 0);

        expect(store.dispatch({ type: 'MYACTION' })).toBeUndefined();
      });

      it('should notify subscriber', () => {
        let reducerSpy: Reducer<number> = jasmine.createSpy('reducer');
        let store: Store<number> = new Store(reducerSpy, 0);
        let spyListener = jasmine.createSpy('listener');

        store.subscribe(spyListener);

        expect(spyListener).not.toHaveBeenCalled();
        
        store.dispatch({ type: '' });
        store.dispatch({ type: '' });

        expect(spyListener.calls.count()).toBe(2);
      });
    });

    describe('.subscribe()', () => {
      let reducerSpy: Reducer<number>;
      let store: Store<number>;

      beforeEach(() => {
        reducerSpy = jasmine.createSpy('reducer');
        store = new Store(reducerSpy, 0);
      });

      it('should be defined', () => {
        expect(Store.prototype.subscribe).toEqual(jasmine.any(Function));
      });

      it('should add listener to listeners property', () => {
        let listener = () => { };
        store.subscribe(listener);

        expect(store._listeners.indexOf(listener)).not.toEqual(-1);
      });

      it('should return unsubscribe callback', () => {
        let listener = () => { };
        let unsubscribe = store.subscribe(listener);

        unsubscribe();

        expect(store._listeners.indexOf(listener)).toEqual(-1);
      });
    });
  });
});