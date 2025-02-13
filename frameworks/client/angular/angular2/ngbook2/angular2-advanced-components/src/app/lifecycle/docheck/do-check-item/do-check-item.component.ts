import { Component, OnInit, Input, Output, EventEmitter, DoCheck, KeyValueDiffers, KeyValueDiffer, KeyValueChangeRecord } from '@angular/core';

@Component({
  selector: 'do-check-item',
  templateUrl: './do-check-item.component.html',
  styleUrls: ['./do-check-item.component.css']
})
export class DoCheckItemComponent implements DoCheck {
  @Input() comment: any;
  @Output() onRemove: EventEmitter<any>;
  differ: KeyValueDiffer;

  constructor(differs: KeyValueDiffers) {
    this.differ = differs.find([]).create(null);
    this.onRemove = new EventEmitter();
  }

  ngDoCheck() {
    let changes = this.differ.diff(this.comment);

    if(changes) {
      changes.forEachAddedItem((r: KeyValueChangeRecord) => this.logChange('added', r));
      changes.forEachRemovedItem((r: KeyValueChangeRecord) => this.logChange('removed', r));
      changes.forEachChangedItem((r: KeyValueChangeRecord) => this.logChange('changed', r));
    }
  }

  logChange(action: string, r: KeyValueChangeRecord) {
    if(action === 'changed') {
      console.log(r.key, action, 'from', r.previousValue, 'to', r.currentValue);
    }
    if(action === 'added') {
      console.log(r.key, action, 'with', r.currentValue);
    }
    if(action === 'removed') {
      console.log(action, r.key, '(was' + r.previousValue + ')');
    }
  }

  remove(): void {
    this.onRemove.emit(this.comment);
  }

  clear() {
    delete this.comment.comment;
  }

  like(): void {
    this.comment.likes += 1;
  }

}
