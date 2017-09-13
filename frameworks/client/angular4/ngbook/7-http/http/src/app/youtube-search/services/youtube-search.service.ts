import { SearchResult } from './../model/search-result';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

export const YOUTUBE_API_KEY = 'AIzaSyAcvP2Ed9ToLuQIh_7_8rZ7H2hj17Wj6cQ';
export const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

@Injectable()
export class YouTubeSearchService {
  constructor(
    private http: Http,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string
  ) { }

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`,
    ].join('&');

    const queryUrl = `${this.apiUrl}?${params}`;

    return this.http.get(queryUrl)
      .map((response: any) => {
        return (<any>response.json()).items.map(item => {
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          });
        });
      });
  }
}
