import {
  Action,
  Reducer,
  Store,
  createStore
} from 'redux';
import { INCREMENT, DECREMENT } from './counter.actions';

import { AppState } from './app.state';

const initialState: AppState = {
  counter: 0
};

export const reducer: Reducer<AppState> = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, { counter: state.counter + 1 });
    case DECREMENT:
      return Object.assign({}, state, { counter: state.counter - 1 });
  }
};
