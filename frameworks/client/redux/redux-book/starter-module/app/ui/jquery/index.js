import $ from 'jquery';
import { store } from '../../store/store';
import { addRecipe } from '../../actions/recipies';

function updateUI() {
  const { recipies } = store.getState();
  const renderRecipe = (recipe) => `<li>${recipe.name}</li>`;

  $('.recipies > ul').html(recipies.map(renderRecipe));
}

function handleAdd() {
  console.log('test')
  const $recipeName = $('.recipies > input');
  
  store.dispatch(addRecipe($recipeName.val()));

  $recipeName.val('');
}

export default function loadUI() {
  $('#app').append(`
    <div class="recipies">
      <h2>Recipies:</h2>
      <ul></ul>
      <input type="text"/>
      <button>Add</button>
    </div>
  `);

  $(document).on('click', '.recipies > button', handleAdd);

  store.subscribe(updateUI);

  updateUI();
}