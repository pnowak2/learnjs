import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-options',
  templateUrl: './request-options.component.html',
  styleUrls: ['./request-options.component.css']
})
export class RequestOptionsComponent implements OnInit {

  data: Object;
  loading: boolean;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onMakeRequestClick(evt) {
    this.makeRequest();
  }

  makeRequest(): void {
    this.loading = true;

    const headers = new Headers({
      // 'X-API-TOKEN': 'ng-book'
    });
    headers.append('X-API-TOKEN', 'ng-book');

    const opts = new RequestOptions();
    opts.headers = headers;

    this.http
      .request('http://jsonplaceholder.typicode.com/posts/1', opts)
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      });
  }

}
