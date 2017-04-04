import { CrisisCenterComponent } from './crisis-center.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/Router';

const routes: Routes = [
  {
    path: 'crisis-center',
    component: CrisisCenterComponent
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
export class CrisisCenterRoutingModule {

}