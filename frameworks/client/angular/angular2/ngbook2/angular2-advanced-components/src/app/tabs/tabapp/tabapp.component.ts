import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tabapp',
  templateUrl: './tabapp.component.html',
  styleUrls: ['./tabapp.component.css']
})
export class TabappComponent implements OnInit {

  tabs: any;

  ngOnInit() {
    
  }

  constructor() {
    this.tabs = [
      { title: 'About', content: 'This is the About tab' },
      { title: 'Blog', content: 'This is our blog' },
      { title: 'Contact us', content: 'Contact us here' }
    ]
  } 

}
