/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { FormSkuComponent } from './form-sku.component';

describe('FormSkuComponent', () => {
  let component: FormSkuComponent;
  let fixture: ComponentFixture<FormSkuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSkuComponent],
      imports: [
        FormsModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("FormControl", () => {
    let nameControl: FormControl;

    beforeEach(() => {
      nameControl = new FormControl('Piotr');
    });

    it('should have no errors defined', () => {
      expect(nameControl.errors).toEqual(null);
    });
    it('should not be dirty', () => {
      expect(nameControl.dirty).toEqual(false);
    });
    it('should be valid', () => {
      expect(nameControl.valid).toEqual(true);
    });
  });

  describe("FormGroup", () => {
    let personInfo: FormGroup;

    beforeEach(() => {
      personInfo = new FormGroup({
        firstName: new FormControl('Piotr'),
        lastName: new FormControl('Nowak'),
        zip: new FormControl('43170'),
      })
    });

    it('should have value with form controls defined', () => {
      expect(personInfo.value).toEqual({
        firstName: 'Piotr',
        lastName: 'Nowak',
        zip: '43170'
      });
    });

    it('should have no errors defined', () => {
      expect(personInfo.errors).toEqual(null);
    });

    it('should not be dirty', () => {
      expect(personInfo.dirty).toEqual(false);
    });

    it('should be valid', () => {
      expect(personInfo.valid).toEqual(true);
    });
  });
});
