import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/Router';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'hero/:id',
    component: HeroDetailComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule {

}