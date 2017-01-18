import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { AuthService } from './services/AuthService';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';

import { LoggedInGuard } from './guards/LoggedInGuard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [LoggedInGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProtectedComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: AuthService, useClass: AuthService },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
