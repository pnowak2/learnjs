import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: '1',
      title: 'Schnitzel',
      imageUrl: 'https://www.thespruceeats.com/thmb/cckc3_4QUQ79kSFhcLPM8xg9F3g=/3797x2848/smart/filters:no_upscale()/wiener-schnitzel-recipe-1447089-Hero-5b587d6c46e0fb0071b0059d.jpg',
      ingredients: ['French fries', 'Pork meat', 'salad']
    },
    {
      id: '2',
      title: 'Spaghetti',
      imageUrl: 'https://supervalu.ie/thumbnail/720x400/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg?fill=1',
      ingredients: ['Pasta', 'Tomatoes', 'Basilic']
    }
  ];

  getAllRecipes(): Recipe[] {
    return [...this.recipes];
  }

  getRecipe(recipeId: string): Recipe {
    return { ...this.recipes.find(recipe => recipe.id === recipeId) };
  }
}
