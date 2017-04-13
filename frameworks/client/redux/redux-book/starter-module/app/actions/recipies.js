import { ADD_RECIPE, SET_RECIPIES, FETCH_RECIPIES } from '../constants/action-types';

export const addRecipe = (name) => ({
  type: ADD_RECIPE, name
});

export const fetchRecipies = () => ({
  type: FETCH_RECIPIES
});

export const setRecipies = (data) => ({
  type: SET_RECIPIES, data
});