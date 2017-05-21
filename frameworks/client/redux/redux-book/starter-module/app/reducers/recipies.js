import { ADD_RECIPE, SET_RECIPIES } from '../constants/action-types';

export const recipiesReducer = (recipies = [], action) => {
  switch(action.type) {
    case ADD_RECIPE:
        return recipies.concat({ name: action.name })
    case SET_RECIPIES:
        return action.data.recipes;
  }

  return recipies;
};