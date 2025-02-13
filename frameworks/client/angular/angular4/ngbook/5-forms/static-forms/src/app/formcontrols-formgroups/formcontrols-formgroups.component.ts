import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formcontrols-formgroups',
  templateUrl: './formcontrols-formgroups.component.html',
  styleUrls: ['./formcontrols-formgroups.component.css']
})
export class FormcontrolsFormgroupsComponent implements OnInit {
  formGroup: FormGroup;
  nameControl: FormControl;

  constructor() {
    this.nameControl = new FormControl('', [Validators.required]);
    this.formGroup = new FormGroup({
      name: this.nameControl
    });
  }

  ngOnInit() {
  }

}
