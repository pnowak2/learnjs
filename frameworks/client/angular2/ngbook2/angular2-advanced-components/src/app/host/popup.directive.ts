import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[popup]',
  host: {
    '(click)': 'displayMessage()'
  },
  exportAs: 'popupDirective'
})
export class PopupDirective {
  @Input() message: String;

  constructor(private _elementRef: ElementRef) {
    console.log('Popup Directive Bound', _elementRef, this.message);
  }

  displayMessage() {
    alert(this.message);
  }

}
