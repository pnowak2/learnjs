import { Reducer, combineReducers } from 'redux';

import { ThreadsState, ThreadsReducer } from './threads.reducer';
import { UsersState, UsersReducer } from './users.reducer';

export interface AppState {
  users: UsersState;
  threads: ThreadsState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  users: UsersReducer,
  threads: ThreadsReducer
});

export default rootReducer;
