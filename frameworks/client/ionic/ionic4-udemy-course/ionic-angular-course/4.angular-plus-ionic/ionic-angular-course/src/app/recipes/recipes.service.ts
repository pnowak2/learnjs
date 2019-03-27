import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Array<Recipe> = [
    {
      id: 'r1',
      title: 'Schnitzel',
      imageUrl: 'https://natashaskitchen.com/wp-content/uploads/2016/02/Pork-Schnitzel-Recipe-7-600x900.jpg',
      ingredients: ['French Fries', 'Pork Meat', 'Salad']
    },
    {
      id: 'r2',
      title: 'Spaghetti',
      imageUrl: 'https://www.kwestiasmaku.com/sites/kwestiasmaku.com/files/styles/zdjecie_glowne/public/spaghetti_bolognese_0.jpg',
      ingredients: ['Pasta', 'Meat', 'Salad']
    }
  ];

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string) {
    return {...this.recipes.find(recipe => recipe.id === recipeId)};
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
  }

  constructor() { }
}
