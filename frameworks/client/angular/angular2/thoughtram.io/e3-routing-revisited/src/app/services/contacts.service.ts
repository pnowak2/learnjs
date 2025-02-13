import { Contact } from './../model/contact.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ContactsService {
  getContact(id: string): Contact {
    return {
      id: id,
      name: 'name' + id,
      country: 'country' + id
    }
  }
}