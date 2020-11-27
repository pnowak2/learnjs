import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave {
  recipes: Recipe[];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getAllRecipes();
    console.log('ion view will enter');
  }

  ionViewDidEnter() {
    console.log('ion view did enter');
  }

  ionViewWillLeave() {
    console.log('ion view will leave');
  }

  ionViewDidLeave() {
    console.log('ion view did leave');
  }

  ngOnDestroy() {
    console.log('on destroy');
  }

}
