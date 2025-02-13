import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultDirectivesComponent } from './default-directives.component';

describe('DefaultDirectivesComponent', () => {
  let component: DefaultDirectivesComponent;
  let fixture: ComponentFixture<DefaultDirectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultDirectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
