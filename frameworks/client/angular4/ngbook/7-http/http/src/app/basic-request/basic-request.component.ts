import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-request',
  templateUrl: './basic-request.component.html',
  styleUrls: ['./basic-request.component.css']
})
export class BasicRequestComponent implements OnInit {
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

    this.http
      .request('http://jsonplaceholder.typicode.com/posts/1')
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      });

  }
}
