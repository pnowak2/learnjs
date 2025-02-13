import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getItems() {
    return this.http.get('https://api.github.com/repos/vmg/redcarpet/issues?state=closed')
      .map(data => data.json())
  }

}
