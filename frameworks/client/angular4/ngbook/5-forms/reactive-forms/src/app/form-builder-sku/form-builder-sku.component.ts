import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

function skuValidator(control: AbstractControl): { [key: string]: boolean } {
  if (!control.value.match(/123/)) {
    return { invalidSku: true };
  }
}

@Component({
  selector: 'app-form-builder-sku',
  templateUrl: './form-builder-sku.component.html',
  styleUrls: ['./form-builder-sku.component.css']
})
export class FormBuilderSkuComponent implements OnInit {
  myFormGroup: FormGroup;
  sku: AbstractControl;

  constructor(private fb: FormBuilder) {
    this.myFormGroup = fb.group({
      sku: ['123456', Validators.compose([Validators.required, skuValidator])]
    });

    this.sku = this.myFormGroup.controls['sku'];

    this.myFormGroup.valueChanges.subscribe(val => console.log('form changed: ' + val));
    this.sku.valueChanges.subscribe(val => console.log('sku changed: ' + val));
  }

  ngOnInit() {
  }

  onSubmit(fg) {
    console.log(fg);
  }
}
