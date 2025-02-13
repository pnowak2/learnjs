import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicRequestComponent } from './basic-request.component';

describe('BasicRequestComponent', () => {
  let component: BasicRequestComponent;
  let fixture: ComponentFixture<BasicRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
