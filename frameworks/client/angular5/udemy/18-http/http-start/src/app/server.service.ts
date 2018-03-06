import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ServerService {

  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    // return this.http.post(
    //   'https://udemy-ng-http-90eb7.firebaseio.com/data.json',
    //   servers,
    //   {
    //     headers
    //   }
    // );
    return this.http.put(
      'https://udemy-ng-http-90eb7.firebaseio.com/data.json',
      servers,
      {
        headers
      }
    );
  }
  getServers() {
    return this.http
      .get('https://udemy-ng-http-90eb7.firebaseio.com/data.json')
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw('Something went wrong');
      });
  }
  getAppName() {
    return this.http
      .get('https://udemy-ng-http-90eb7.firebaseio.com/appName.json')
      .map(response => response.json())
  }
}
