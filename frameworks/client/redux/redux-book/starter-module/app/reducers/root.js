import { combineReducers } from 'redux';
import { recipiesReducer } from './recipies';
import { ingredientsReducer } from './ingredients';

// export const rootReducer = (state, action) => {
//   return Object.assign({}, state, {
//     recipies: recipiesReducer(state.recipies, action),
//     ingredients: ingredientsReducer(state.ingredients, action),
//   });
// };

//same as

export const rootReducer = combineReducers({
  recipies: recipiesReducer,
  ingredients: ingredientsReducer
})