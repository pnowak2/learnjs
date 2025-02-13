import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from './../services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query = '';
  results: Object;

  constructor(
    private service: SpotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
    });
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    if (!this.query) {
      return;
    }

    this.service
      .searchTrack(this.query)
      .subscribe(res => {
        this.renderResults(res);
      });
  }

  renderResults(res: any) {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }

  submit(query: string) {
    this.router
    .navigate(['search'], { queryParams: { query: query } })
    .then(_ => {
      this.search();
    });
  }
}
