import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place('p1', 'Manhattan Mansion', 'In the heart of NYC', 'https://picsum.photos/300/200', 149.99, new Date('2019-01-01'), new Date('2019-12-31')),
    new Place('p2', 'Lamour Toujours', 'Romantic place in Paris', 'https://picsum.photos/301/200', 189.99, new Date('2019-01-01'), new Date('2019-12-31')),
    new Place('p3', 'The Foggy Palace', 'Not your average city trip', 'https://picsum.photos/302/200', 99.99, new Date('2019-01-01'), new Date('2019-12-31')),
  ];

  get places() {
    return [...this._places]
  }

  getPlace(id: string) {
    return { ...this.places.find(p => p.id === id) };
  }
  constructor() { }
}
