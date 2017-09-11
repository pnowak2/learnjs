import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formcontrols-formgroups',
  templateUrl: './formcontrols-formgroups.component.html',
  styleUrls: ['./formcontrols-formgroups.component.css']
})
export class FormcontrolsFormgroupsComponent implements OnInit {
  name: FormControl;
  isValid = false;

  constructor() {
    this.name = new FormControl('Hello');
    this.isValid = this.name.valid;
  }

  ngOnInit() {
  }

}
