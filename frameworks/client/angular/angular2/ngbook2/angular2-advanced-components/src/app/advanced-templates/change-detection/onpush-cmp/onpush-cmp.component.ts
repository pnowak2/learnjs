import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Profile } from '../profile.model';

@Component({
  selector: 'onpush-cmp',
  templateUrl: './onpush-cmp.component.html',
  styleUrls: ['./onpush-cmp.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnpushCmpComponent implements OnInit {
  @Input() profile: Profile;

  constructor() { }

  ngOnInit() {
  }

}
