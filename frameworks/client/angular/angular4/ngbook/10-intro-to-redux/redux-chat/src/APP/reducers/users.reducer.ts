import { Action } from 'redux';
import { UsersState } from './users.reducer';
import { User } from './../models/user.model';
import * as UserActions from '../actions/user.actions';

export interface UsersState {
  currentUser: User;
}

const initialState: UsersState = {
  currentUser: null
};

export const UsersReducer = function (state: UsersState = initialState, action: Action): UsersState {
  switch (action.type) {
    case UserActions.SET_CURRENT_USER:
      const user = (action as UserActions.SetCurrentUserAction).user;
      return {
        currentUser: user
      };
    default:
      return state;
  }
};
