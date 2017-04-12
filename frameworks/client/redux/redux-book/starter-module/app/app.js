import { store } from './store/store';
import { addRecipe } from './actions/recipies';
import { addIngredient } from './actions/ingredients';
import loadUI from './ui/jquery/index';

store.dispatch(addRecipe('sandwitch'));
store.dispatch(addIngredient('sandwitch', 'egg', 1));

window.store = store;

loadUI();

