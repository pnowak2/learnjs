import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customcounter',
  templateUrl: './customcounter.component.html',
  styleUrls: ['./customcounter.component.css']
})
export class CustomcounterComponent {
  @Output() counterChange = new EventEmitter();
  counterValue = 0;

  @Input()
  get counter() {
    return this.counterValue;
  }

  set counter(value) {
    this.counterValue = value;
    this.counterChange.emit(this.counterValue);
  }

  decrement() {
    this.counter--;
  }

  increment() {
    this.counter++;
  }
}
