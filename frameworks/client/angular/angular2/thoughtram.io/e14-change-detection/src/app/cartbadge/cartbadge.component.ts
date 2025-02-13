import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cartbadge',
  templateUrl: './cartbadge.component.html',
  styleUrls: ['./cartbadge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartbadgeComponent implements OnInit {

  @Input() addItemStream:Observable<any>;
  counter = 0;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.addItemStream.subscribe(() => {
      this.counter++; // application state changed
      this.changeDetectorRef.markForCheck();
    })
  }

}
