import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'observable-cmp',
  templateUrl: './observable-cmp.component.html',
  styleUrls: ['./observable-cmp.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObservableCmpComponent implements OnInit {
  @Input() items: Observable<number>;
  counter: number = 0;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.items.subscribe((v) => {
      console.log('got value', v);
      this.counter++;

      if(this.counter % 5 === 0) {
        this.changeDetector.markForCheck();
      }
    },
    null,
    () => {
      this.changeDetector.markForCheck();
    })
  }
}
