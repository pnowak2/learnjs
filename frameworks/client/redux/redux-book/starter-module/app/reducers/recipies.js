import { ADD_RECIPE } from '../constants/action-types';

export const recipiesReducer = (recipies = [], action) => {
  switch(action.type) {
    case ADD_RECIPE:
        return recipies.concat({ name: action.name })
  }

  return recipies;
};