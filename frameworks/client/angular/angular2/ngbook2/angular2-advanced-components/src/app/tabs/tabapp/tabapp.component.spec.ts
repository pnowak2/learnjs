/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabappComponent } from './tabapp.component';

describe('TabappComponent', () => {
  let component: TabappComponent;
  let fixture: ComponentFixture<TabappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
