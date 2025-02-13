import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

function skuValidator(control: FormControl): { [s: string]: boolean } {
  if(!control.value.match(/^123/)) {
    return {
      invalidSku: true
    }
  }
}

@Component({
  selector: 'app-form-validations',
  templateUrl: './form-validations.component.html',
  styleUrls: ['./form-validations.component.css']
})
export class FormValidationsComponent implements OnInit {
  myForm: FormGroup;
  sku: AbstractControl;
  productName: AbstractControl;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'sku': ['ABC1234', Validators.compose([Validators.required, skuValidator])],
      'productName': [' ', Validators.compose([Validators.required])]
    });

    this.sku = this.myForm.controls['sku'];
    this.productName = this.myForm.controls['productName'];

    this.sku.valueChanges.subscribe((value: string) => {
      console.log('sku changed to', value);
    });

    this.myForm.valueChanges.subscribe((form: any) => {
      console.log('form changed to', form);
    });
  }

  ngOnInit() {
  }

  onSubmit(value: string): void {
    console.log(value);
  }

}
