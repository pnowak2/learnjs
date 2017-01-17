/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormBuilderSkuComponent } from './form-builder-sku.component';

describe('FormBuilderSkuComponent', () => {
  let component: FormBuilderSkuComponent;
  let fixture: ComponentFixture<FormBuilderSkuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuilderSkuComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
