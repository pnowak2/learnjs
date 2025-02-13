import { ContactDetailComponent } from './../contact-detail/contact-detail.component';
import { ContactsListComponent } from './../contacts-list/contacts-list.component';
import { Route } from '@angular/router';

export const ContactAppRoutes: Array<Route> = [
  { path: '', component: ContactsListComponent },
  { path: 'contacts/:id', component: ContactDetailComponent }
]