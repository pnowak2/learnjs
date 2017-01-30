import { Reducer, combineReducers } from 'redux';
import { UsersState, UsersReducer } from './users.reducer';
import { ThreadsState } from './threads.reducer';

export interface AppState {
  users: UsersState;
  threads: ThreadsState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  users: UsersReducer,
  threads: ThreadsReducer
});
