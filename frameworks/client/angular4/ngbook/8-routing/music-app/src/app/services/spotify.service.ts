import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  constructor(
    private http: Http,
    @Inject('API_KEY') private apiKey: string,
    @Inject('API_URL') private apiUrl: string,
  ) { }

  searchTrack(query: string): Observable<any> {
    const params = [
      `q=${query}`,
      `token=${this.apiKey}`,
      `type=track`
    ].join('&');

    const queryURL = `${this.apiUrl}?${params}`;

    return this.http.request(queryURL).map(res => res.json());
  }
}
