import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WikiService {

  constructor(private jsonp: Jsonp) { }

  search(term: string): Promise<Array<string>> {
    var search = new URLSearchParams();
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');

    return this.jsonp
      .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
      .toPromise()
      .then((response) => response.json()[1]);
  }
}
