import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngBookIf]'
})
export class NgBookIfDirective {
  @Input() set ngBookIf(condition) {
    if(condition) {
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(private viewContainer: ViewContainerRef,
    private template: TemplateRef<any>) { }

}
