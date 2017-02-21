import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

  constructor(private http: Http) { 
    console.log(http);
  }

  getItems() {
    return [
      { name: 'Christoph Burgdorf' },
      { name: 'Pascal Precht' },
      { name: 'thoughtram' }
    ];
  }

}
