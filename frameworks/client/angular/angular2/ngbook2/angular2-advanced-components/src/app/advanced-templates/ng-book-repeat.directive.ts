import { Directive, Input, DoCheck, IterableDiffer, DefaultIterableDiffer, CollectionChangeRecord, ViewRef, ViewContainerRef, TemplateRef, ChangeDetectorRef, IterableDiffers } from '@angular/core';

@Directive({
  selector: '[ngBookRepeat]',
})
export class NgBookRepeatDirective implements DoCheck {
  private items: any;
  private differ: IterableDiffer;
  private views: Map<any, ViewRef> = new Map<any, ViewRef>();

  constructor(private viewContainer: ViewContainerRef,
    private template: TemplateRef<any>,
    private changeDetector: ChangeDetectorRef,
    private differs: IterableDiffers) { }

  @Input() set ngBookRepeatOf(items) {
    this.items = items;
    if(this.items && !this.differ) {
      this.differ = this.differs.find(items).create(this.changeDetector);
    }
  }

  ngDoCheck(): void {
    if(this.differ) {
      let changes: DefaultIterableDiffer = this.differ.diff(this.items);

      if(changes) {
        changes.forEachAddedItem((change: CollectionChangeRecord) => {
          let view = this.viewContainer.createEmbeddedView(this.template, { '$implicit': change.item })
          this.views.set(change.item, view);
        });

        changes.forEachRemovedItem((change: CollectionChangeRecord) => {
          let view = this.views.get(change.item);
          let idx = this.viewContainer.indexOf(view);
          this.viewContainer.remove(idx);
          this.views.delete(change.item);
        });
      }
    }
  }
}
