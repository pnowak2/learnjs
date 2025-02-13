import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'on-init',
  templateUrl: './on-init.component.html',
  styleUrls: ['./on-init.component.css']
})
export class OnInitComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    console.log('On init');
  }

  ngOnDestroy() {
    console.log('On destroy');
  }

}
