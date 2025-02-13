import { Observable } from 'rxjs';
import { YouTubeSearchService } from './services/youtube-search.service';
import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';

import { SearchResult } from './model/search-result';

@Component({
  selector: 'app-youtube-search-box',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.css']
})
export class YoutubeSearchComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(
    private service: YouTubeSearchService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    Observable
      .fromEvent(this.el.nativeElement, 'keyup')
      .map((evt: any) => evt.target.value)
      .filter((text: string) => text.length > 1)
      .debounceTime(250)
      .do(() => this.loading.emit(true))
      .map((query: string) => this.service.search(query))
      .switch()
      .subscribe(results => {
        this.loading.emit(false);
        this.results.emit(results);
      },
      (err) => { this.loading.emit(false); },
      () => { this.loading.emit(false); }
      );
  }

}
