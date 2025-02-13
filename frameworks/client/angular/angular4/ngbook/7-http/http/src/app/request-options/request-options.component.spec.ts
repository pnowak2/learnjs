import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestOptionsComponent } from './request-options.component';

describe('RequestOptionsComponent', () => {
  let component: RequestOptionsComponent;
  let fixture: ComponentFixture<RequestOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
