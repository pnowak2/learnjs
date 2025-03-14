import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {

}
