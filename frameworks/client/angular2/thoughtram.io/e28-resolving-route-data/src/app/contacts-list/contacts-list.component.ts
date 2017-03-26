import { Observable } from 'rxjs/Observable';
import { ContactsService, Contact } from './../contacts.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Observable<Array<Contact>>;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }

}
