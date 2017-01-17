/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormValidationsComponent } from './form-validations.component';

describe('FormValidationsComponent', () => {
  let component: FormValidationsComponent;
  let fixture: ComponentFixture<FormValidationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormValidationsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('FormControl with validation', () => {
    it('should create control which does validate', () => {
      let control = new FormControl('sku', Validators.required);
      control.setValue('test');

      expect(control.valid).toEqual(true);
    });

    it('should create control which does NOT validate', () => {
      let control = new FormControl('sku', Validators.required);
      control.setValue('');

      expect(control.valid).toEqual(false);
    });

  });
});
