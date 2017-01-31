import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[popup]'
})
export class PopupDirective {

  constructor(private _elementRef: ElementRef) {
    console.log('Popup Directive Bound', _elementRef);
  }

}
