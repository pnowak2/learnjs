import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[highlight]' })
export class HighlightDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'beige';
       console.log(`* Hero highlight called for ${el.nativeElement.tagName}`);
    }
}