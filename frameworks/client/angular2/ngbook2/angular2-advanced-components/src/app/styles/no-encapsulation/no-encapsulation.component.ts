import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'no-encapsulation',
  templateUrl: './no-encapsulation.component.html',
  styleUrls: ['./no-encapsulation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NoEncapsulationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
