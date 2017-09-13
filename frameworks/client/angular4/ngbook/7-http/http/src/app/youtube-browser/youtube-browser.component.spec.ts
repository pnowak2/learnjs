import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeBrowserComponent } from './youtube-browser.component';

describe('YoutubeBrowserComponent', () => {
  let component: YoutubeBrowserComponent;
  let fixture: ComponentFixture<YoutubeBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
