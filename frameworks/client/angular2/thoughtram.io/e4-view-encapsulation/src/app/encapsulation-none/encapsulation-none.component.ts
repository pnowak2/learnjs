import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-encapsulation-none',
  templateUrl: './encapsulation-none.component.html',
  styleUrls: ['./encapsulation-none.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EncapsulationNoneComponent implements OnInit {
  @Input() title: string = 'Assmalng';

  constructor() { }

  ngOnInit() {
  }
}
