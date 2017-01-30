import { Action } from 'redux';
import { User } from '../models/user';
import * as UserActions from '../actions/user.actions';

export interface UsersState {
  currentUser: User;
}

const initialState: UsersState = {
  currentUser: null
}

export const UsersReducer = (state: UsersState = initialState, action: Action): UsersState => {
  switch(action.type) {
    case UserActions.SET_CURRENT_USER: {
      const user: User = (action as UserActions.SetCurrentUserAction).user;
      return {
        currentUser: user
      }
    }
    default:
      return state;
  }
}