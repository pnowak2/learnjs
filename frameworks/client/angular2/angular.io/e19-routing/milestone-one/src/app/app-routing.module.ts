import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/Router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'heroes',
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}