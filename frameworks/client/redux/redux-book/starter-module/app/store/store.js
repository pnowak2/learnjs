import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/root';
import logMiddleware from './middleware/log';
import apiMiddleware from './middleware/api';

const initialState = {
  recipies: [
    // {
    //   name: 'Omelette'
    // }
  ],
  ingredients: [
    // {
    //   recipe: 'Omelette',
    //   name: 'Egg',
    //   quantity: 2
    // }
  ]
};

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(logMiddleware, apiMiddleware)
);