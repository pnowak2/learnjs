import { Contact } from './../model/contact.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Array<Contact>;

  constructor() {
    this.contacts = [{
      id: '1',
      name: 'Piotr',
      country: 'PL'
    }, {
      id: '2',
      name: 'Andrzej',
      country: 'BE'
    }]
  }

  ngOnInit() {
  }

}
