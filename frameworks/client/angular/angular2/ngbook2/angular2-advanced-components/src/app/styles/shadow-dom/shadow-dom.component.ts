import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'shadow-dom',
  styles: [`
    .highlight {
      border: 2px solid black;
      border-radius: 3px;
      text-align: center;
      margin-bottom: 20px;
    }
  `],
  template: `
    <h4 class="ui horizontal divider header">
      Native encapsulation example
    </h4>

    <div class="highlight">
      This uses component <code>ViewEncapsulation.Native</code>
    </div>
  `,
  encapsulation: ViewEncapsulation.Native
})
export class ShadowDomComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
