import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.css']
})
export class SubComponent implements OnInit {
  @Output()
  buttonClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClicked() {
    this.buttonClicked.emit('pressed');
  }

}
