import { ContactsService } from './contacts.service';
import { ContactResolve } from './resolvers/contact.resolver';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';

export const AppRoutes: Routes = [
  { path: '', component: ContactsListComponent },
  {
    path: 'contact/:id',
    component: ContactsDetailComponent,
    resolve: {
      contact: ContactResolve
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactsListComponent,
    ContactsDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    ContactsService,
    ContactResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
