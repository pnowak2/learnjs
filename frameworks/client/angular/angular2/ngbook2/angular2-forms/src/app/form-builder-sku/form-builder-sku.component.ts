import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-builder-sku',
  templateUrl: './form-builder-sku.component.html',
  styleUrls: ['./form-builder-sku.component.css']
})
export class FormBuilderSkuComponent implements OnInit {
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'sku2': ['ABC1234']
    });
  }

  ngOnInit() {
  }

  onSubmit(value: string): void {
    console.log(value);
  }
}
