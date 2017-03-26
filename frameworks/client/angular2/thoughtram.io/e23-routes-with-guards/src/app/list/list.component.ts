import { Component, OnInit } from '@angular/core';
import { Contact } from './../model/contact.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
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

}
