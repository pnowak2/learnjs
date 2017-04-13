import { store } from './store/store';
import { addRecipe, fetchRecipies } from './actions/recipies';
import { addIngredient } from './actions/ingredients';
import loadUI from './ui/jquery/index';

store.dispatch(fetchRecipies());

window.store = store;

loadUI();

