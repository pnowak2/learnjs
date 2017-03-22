import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ContactsService, Contact } from '../contacts.service';

@Injectable()
export class ContactResolve implements Resolve<Contact> {

  constructor(private contactsService: ContactsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Contact> {
    return this.contactsService.getContact(route.params['id']);
  }
}