import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../profile.model';

@Component({
  selector: 'default-cmp',
  templateUrl: './default-cmp.component.html',
  styleUrls: ['./default-cmp.component.css']
})
export class DefaultCmpComponent implements OnInit {
  @Input() profile: Profile;

  constructor() { }

  ngOnInit() {
  }

}
