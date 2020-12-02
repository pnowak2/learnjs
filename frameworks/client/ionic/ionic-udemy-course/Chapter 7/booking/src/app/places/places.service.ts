import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { find, map, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  places$: Subject<Place[]> = new BehaviorSubject([
    new Place('p1', 'Manhattan Mansion', 'In the heart of NYC', 'https://picsum.photos/300/200', 149.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    new Place('p2', 'Lamour Toujours', 'Romantic place in Paris', 'https://picsum.photos/301/200', 189.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    new Place('p3', 'The Foggy Palace', 'Not your average city trip', 'https://picsum.photos/302/200', 99.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
  ]);

  constructor(private authService: AuthService) { }

  get places() {
    return this.places$.asObservable();
  }

  getPlace(id: string): Observable<Place> {
    return this.places.pipe(
      take(1),
      map(places => ({ ...places.find(p => p.id === id) }))
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    availableFrom: Date,
    availableTo: Date,
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://picsum.photos/302/200',
      price,
      availableFrom,
      availableTo,
      this.authService.userId
    );

    this.places.pipe(take(1)).subscribe(places => {
      this.places$.next([...places, newPlace]);
    });
  }
}
