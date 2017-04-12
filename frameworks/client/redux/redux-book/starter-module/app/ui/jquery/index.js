import $ from 'jquery';
import { store } from '../../store/store';

function updateUI() {
  const { recipies } = store.getState();
  const renderRecipe = (recipe) => `<li>${recipe.name}</li>`;

  $('.recipies > ul').html(recipies.map(renderRecipe));
}

export default function loadUI() {
  $('#app').append(`
    <div class="recipies">
      <h2>Recipies:</h2>
      <ul></ul>
    </div>
  `);

  store.subscribe(updateUI);

  updateUI();
}