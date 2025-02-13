import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-encapsulation-emulated',
  templateUrl: './encapsulation-emulated.component.html',
  styleUrls: ['./encapsulation-emulated.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EncapsulationEmulatedComponent implements OnInit {
  @Input() title: string = 'Assmalng';

  constructor() { }

  ngOnInit() {
  }
}
