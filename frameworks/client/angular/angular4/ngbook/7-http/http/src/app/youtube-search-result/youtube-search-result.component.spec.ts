import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeSearchResultComponent } from './youtube-search-result.component';

describe('YoutubeSearchResultComponent', () => {
  let component: YoutubeSearchResultComponent;
  let fixture: ComponentFixture<YoutubeSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
