import { SearchResult } from './../youtube-search/model/search-result';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube-browser',
  templateUrl: './youtube-browser.component.html',
  styleUrls: ['./youtube-browser.component.css']
})
export class YoutubeBrowserComponent implements OnInit {
  results: SearchResult[];
  loading: boolean;

  constructor() { }

  ngOnInit() {
  }

  updateResults(results: SearchResult[]): void {
    this.results = results;
    console.log(results);
  }

}
