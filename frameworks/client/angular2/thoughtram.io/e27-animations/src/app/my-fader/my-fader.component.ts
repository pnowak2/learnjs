import { Component, Input, trigger, state, transition, style, animate } from '@angular/core';
import { animations } from './my-animations';

@Component({
  selector: 'my-fader',
  templateUrl: './my-fader.component.html',
  styleUrls: ['./my-fader.component.css'],
  animations: [ animations ]
})
export class MyFaderComponent {
  @Input() isVisible: boolean = true;
  visibility = 'shown';

  ngOnChanges() {
    this.visibility = this.isVisible ? 'shown' : 'hidden';
  }

}
