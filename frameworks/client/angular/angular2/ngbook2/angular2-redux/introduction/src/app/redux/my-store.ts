import { Reducer, Action } from './my-redux';

export interface ListenerCallback {
  (): void;
}

export interface UnsubscribeCallback {
  (): void;
}

export class Store<T> {
  private _state: T;
  _listeners: Array<ListenerCallback> = [];

  constructor(
    private reducer: Reducer<T>, 
    initialState: T) {
      this._state = initialState;
  }

  getState() {
    return this._state;
  }

  dispatch(action: Action) {
    this._state = this.reducer(this._state, action);
    this._listeners.forEach(l => l());
  }

  subscribe(listener: ListenerCallback): UnsubscribeCallback {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter(c => c !== listener);
    }
  }
}