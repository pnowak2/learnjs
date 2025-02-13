export interface Action {
  type: string;
  payload?: any;
}

export interface Reducer<T> {
  (state: T, action: Action): T;
}

export let reducer: Reducer<number> = (state: number, action: Action) => {
  if (action === null) { return state; }

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'PLUS':
      return state + action.payload;
    default:
      return state;
  }
};

export let incrementAction = {
  type: 'INCREMENT'
};

export let decrementAction = {
  type: 'DECREMENT'
};

export interface ListenerCallback {
  (): void;
}

export interface UnsubscribeCallback {
  (): void;
}

export class Store<T> {
  private _state: T;
  private listeners: Array<ListenerCallback> = [];

  constructor(
    private reducer: Reducer<T>,
    initialState: T
  ) {
    this._state = initialState;
  }

  getState(): T {
    return this._state;
  }

  dispatch(action: Action): void {
    this._state = this.reducer(this._state, action);
    this.listeners.forEach((listener: ListenerCallback) => listener());
  }

  subscribe(listener: ListenerCallback): UnsubscribeCallback {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}
