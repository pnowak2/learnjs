import {
  Action,
  ActionCreator
} from 'redux';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const increment: ActionCreator<Action> = () => ({
  type: INCREMENT
});

export const decrement: ActionCreator<Action> = () => ({
  type: DECREMENT
});
