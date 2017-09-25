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
