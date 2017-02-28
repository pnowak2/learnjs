/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VcardComponent } from './vcard.component';

describe('VcardComponent', () => {
  let component: VcardComponent;
  let fixture: ComponentFixture<VcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
