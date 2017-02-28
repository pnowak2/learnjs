/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VcardAppComponent } from './vcard-app.component';

describe('VcardAppComponent', () => {
  let component: VcardAppComponent;
  let fixture: ComponentFixture<VcardAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcardAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcardAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
