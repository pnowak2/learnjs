import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-requests',
  templateUrl: './other-requests.component.html',
  styleUrls: ['./other-requests.component.css']
})
export class OtherRequestsComponent implements OnInit {

  data: Object;
  loading: boolean;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onMakePostRequestClick(evt) {
    this.makePostRequest();
  }

  onMakeDeleteRequestClick(evt) {
    this.makeDeleteRequest();
  }

  makePostRequest(): void {
    this.loading = true;

    this.http.post(
      'http://jsonplaceholder.typicode.com/posts',
      JSON.stringify({
        body: 'bar',
        title: 'foo',
        userId: 1
      })
    ).subscribe((res: Response) => {
      this.data = res.json();
      this.loading = false;
    });
  }

  makeDeleteRequest(): void {
    this.loading = true;

    this.http.delete(
      'http://jsonplaceholder.typicode.com/posts/1'
    ).subscribe((res: Response) => {
      this.data = res.json();
      this.loading = false;
    });
  }
}
