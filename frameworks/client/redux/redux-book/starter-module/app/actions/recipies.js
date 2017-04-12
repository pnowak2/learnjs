import { ADD_RECIPE } from '../constants/action-types';

export const addRecipe = (name) => ({
  type: ADD_RECIPE, name
});