import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place('p1', 'Manhattan Mansion', 'In the heart of NYC', 'https://picsum.photos/200/300', 149.99),
    new Place('p2', 'Lamour Toujours', 'Romantic place in Paris', 'https://picsum.photos/200/300', 189.99),
    new Place('p3', 'The Foggy Palace', 'Not your average city trip', 'https://picsum.photos/200/300', 99.99)
  ];

  get places() {
    return [...this._places]
  }

  constructor() { }
}
