import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgnonbindableComponent } from './ngnonbindable.component';

describe('NgnonbindableComponent', () => {
  let component: NgnonbindableComponent;
  let fixture: ComponentFixture<NgnonbindableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgnonbindableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgnonbindableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
