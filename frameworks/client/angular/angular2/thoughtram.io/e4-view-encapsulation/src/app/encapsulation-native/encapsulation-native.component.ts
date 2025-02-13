import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-encapsulation-native',
  templateUrl: './encapsulation-native.component.html',
  styleUrls: ['./encapsulation-native.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class EncapsulationNativeComponent implements OnInit {
  @Input() title: string = 'Assmalng';

  constructor() { }

  ngOnInit() {
  }
}
