import { Component, OnInit } from '@angular/core';
import { Vcard } from '../model/vcard';

@Component({
  selector: 'vcard-app',
  templateUrl: './vcard-app.component.html',
  styleUrls: ['./vcard-app.component.css']
})
export class VcardAppComponent implements OnInit {
  vData: Vcard;

  constructor() {
    this.vData = {
      name: 'piotr',
      email: 'pnowak2@gmail.com'
    }
  }

  ngOnInit() {
  }

  changeData() {
    this.vData.name = 'Pascal';
    // below will cause vData reference to change and therefore force detection change to fire.
    // this.vData = {
    //   name: 'boo',
    //   email: 'whoa !'
    // }
  }

}
