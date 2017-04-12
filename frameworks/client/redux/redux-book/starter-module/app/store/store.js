import { createStore } from 'redux';
import { rootReducer } from '../reducers/root';

const initialState = {
  recipies: [
    {
      name: 'Omelette'
    }
  ],
  ingredients: [
    {
      recipe: 'Omelette',
      name: 'Egg',
      quantity: 2
    }
  ]
};

export const store = createStore(rootReducer, initialState);