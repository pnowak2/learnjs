import { Directive, ElementRef, HostListener, HostBinding, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private elementRef: ElementRef) { }

  @HostListener('click')
  toggleOpen(evt) {
    this.isOpen = !this.isOpen;
  }
}
