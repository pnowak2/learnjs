import { ContactsService } from './../services/contacts.service';
import { Contact } from './../model/contact.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService) {
  }

  ngOnInit() {
    // this.contact = this.contactsService.getContact(this.route.snapshot.params['id']);
    // or
    this.route.params.subscribe((params) => {
      this.contact = this.contactsService.getContact(params['id']);
    })
  }

}
