import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'inline-style',
  templateUrl: './inline-style.component.html',
  styles: [`
    .highlight {
      border: 2px solid red;
      background-color: yellow;
      text-align: center;
      margin-bottom: 20px;
    }
  `]
})
export class InlineStyleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
