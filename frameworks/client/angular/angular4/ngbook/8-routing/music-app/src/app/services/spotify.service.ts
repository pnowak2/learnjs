import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
  constructor(
    private http: Http,
    @Inject('API_KEY') private apiKey: string,
    @Inject('API_URL') private apiUrl: string,
  ) { }

  query(URL: string, params?: Array<string>): Observable<any> {
    let queryUrl = `${this.apiUrl}${URL}`;
    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;
    }

    const headers = new Headers({
      'Authorization': `Bearer ${this.apiKey}`
    });

    const options = new RequestOptions({ headers });

    return this.http
      .request(queryUrl, options)
      .map((res: any) => res.json());
  }

  search(query: string, type: string): Observable<any> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`
    ]);
  }

  searchTrack(query: string): Observable<any> {
    return this.search(query, 'track');
  }

  getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }
}
