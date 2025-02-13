import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Vcard } from '../model/vcard';

@Component({
  selector: 'vcard',
  templateUrl: './vcard.component.html',
  styleUrls: ['./vcard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VcardComponent implements OnInit {
  @Input() vData: Vcard;

  constructor() { }

  ngOnInit() {
  }

}
