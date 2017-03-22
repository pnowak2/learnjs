import { ContactsService } from './../contacts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  contact: any;

  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.contact = this.activatedRoute.snapshot.data['contact'];
  }
}
