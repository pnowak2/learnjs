import { Directive, Input, TemplateRef, ElementRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective implements OnInit {
  @Input() appUnlessInfo: string;
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

  ngOnInit() {
    console.log(this.appUnlessInfo);
  }
}
