import { Reducer, Action, Store } from './mini-redux';

describe('My Redux', () => {
  describe('Identity reducer', () => {
    let reducer: Reducer<number> = (state: number, action: Action) => state;

    it('should by default return original state', () => {
      const result = reducer(0, null);
      expect(result).toBe(0);
    });
  });

  describe('Adjusting the Counter With actions', () => {
    const incrementAction: Action = {
      type: 'INCREMENT'
    }

    const decrementAction: Action = {
      type: 'DECREMENT'
    }

    const plusSeven: Action = {
      type: 'PLUS',
      payload: 7
    }

    const unknownAction: Action = {
      type: 'UNKNOWN'
    }

    let reducer: Reducer<number> = (state: number, action: Action) => {
      switch(action.type) {
        case 'INCREMENT': 
          return state + 1;
        case 'DECREMENT': 
          return state - 1;
        case 'PLUS': 
          return state + action.payload;
        default:
          return state;
      }
    }

    it('should increment', () => {
      expect(reducer(0, incrementAction)).toBe(1);
      expect(reducer(5, incrementAction)).toBe(6);
    });

    it('should decrement', () => {
      expect(reducer(0, decrementAction)).toBe(-1);
      expect(reducer(6, decrementAction)).toBe(5);
    });

    it('should ignore if action is unknown', () => {
      expect(reducer(0, unknownAction)).toBe(0);
      expect(reducer(6, unknownAction)).toBe(6);
    });

    it('should respect plus action', () => {
      expect(reducer(0, plusSeven)).toBe(7);
      expect(reducer(6, plusSeven)).toBe(13);
      expect(reducer(6, { type: 'PLUS', payload: -2 })).toBe(4);
    });
  });

  describe('Using the Store', () => {
    let reducer: Reducer<number> = (state: number, action: Action) => {
      switch(action.type) {
        case 'INCREMENT': 
          return state + 1;
        case 'DECREMENT': 
          return state - 1;
        case 'PLUS': 
          return state + action.payload;
        default:
          return state;
      }
    }

    it('should dispatch actions', () => {
      let store: Store<number> = new Store(reducer, 0);

      store.dispatch({ type: 'INCREMENT' });
      expect(store.getState()).toBe(1);

      store.dispatch({ type: 'PLUS', payload: 24 });
      expect(store.getState()).toBe(25);
    });
  });
});

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