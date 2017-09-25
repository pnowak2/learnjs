export interface Action {
  type: string;
  payload?: any;
}

export interface Reducer<T> {
  (state: T, action: Action): T;
}

export let identityReducer: Reducer<number> = (state: number, action: Action) => {
  return state;
};
