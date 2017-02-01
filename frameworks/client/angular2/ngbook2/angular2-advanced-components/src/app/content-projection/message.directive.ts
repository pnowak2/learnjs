import { Component, Input } from '@angular/core';

@Component({
  selector: '[message]',
  host: {
    'class': 'ui message'
  },
  template: `
    <div class="header">
      <h3>{{ header }}</h3>
    </div>
    <p>
      <ng-content></ng-content>
    </p>
  `
})
export class MessageDirective {
  @Input() header: String;

  constructor() { }

}
