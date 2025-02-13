import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inputoutput',
  templateUrl: './inputoutput.component.html',
  styleUrls: ['./inputoutput.component.css']
})
export class InputoutputComponent implements OnInit {
  @Input() name;
  @Input('myAge') age;
  @Output() onMakeOlder = new EventEmitter<number>();
  @Output('aliasedMakeOlder') onMakeOlderAlternative = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  ageClicked() {
    this.onMakeOlder.next(this.age);
    this.onMakeOlderAlternative.next(this.age);
  }

}
