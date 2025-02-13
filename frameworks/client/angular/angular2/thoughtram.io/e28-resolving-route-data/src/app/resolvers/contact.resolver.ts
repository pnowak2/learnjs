import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ContactsService, Contact } from '../contacts.service';

@Injectable()
export class ContactResolve implements Resolve<any> {

  constructor(private contactsService: ContactsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params['id'];

    return this.contactsService.getContact(id);
  }
}