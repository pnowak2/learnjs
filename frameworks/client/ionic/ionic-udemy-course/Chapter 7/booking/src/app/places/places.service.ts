import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { PlaceLocation } from './location.model';
import { Place } from './place.model';

// new Place('p1', 'Manhattan Mansion', 'In the heart of NYC', 'https://picsum.photos/300/200', 149.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
// new Place('p2', 'Lamour Toujours', 'Romantic place in Paris', 'https://picsum.photos/301/200', 189.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
// new Place('p3', 'The Foggy Palace', 'Not your average city trip', 'https://picsum.photos/302/200', 99.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: string;
  title: string;
  userId: string;
  location: PlaceLocation;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  places$: Subject<Place[]> = new BehaviorSubject([]);

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  get places(): Observable<Place[]> {
    return this.places$.asObservable();
  }

  fetchPlaces() {
    return this.http.get<{ [key: string]: PlaceData }>('https://ionic-angular-course-6c9cd-default-rtdb.europe-west1.firebasedatabase.app/offered-places.json')
      .pipe(
        map(res => {
          return Object.keys(res).map(key => {
            const place = res[key];
            return new Place(
              key,
              place.title,
              place.description,
              place.imageUrl,
              +place.price,
              new Date(place.availableFrom),
              new Date(place.availableFrom),
              place.userId,
              place.location);
          });
        }),
        tap(places => {
          this.places$.next(places);
        })
      );
  }

  getPlace(id: string): Observable<Place> {
    return this.http.get<PlaceData>(
      `https://ionic-angular-course-6c9cd-default-rtdb.europe-west1.firebasedatabase.app/offered-places/${id}.json`
    ).pipe(
      map(placeData => {
        return new Place(
          id,
          placeData.title,
          placeData.description,
          placeData.imageUrl,
          +placeData.price,
          new Date(placeData.availableFrom),
          new Date(placeData.availableTo),
          placeData.userId,
          placeData.location
        );
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    availableFrom: Date,
    availableTo: Date,
    location: PlaceLocation
  ) {
    let generatedId: string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://picsum.photos/seed/picsum/302/200',
      price,
      availableFrom,
      availableTo,
      this.authService.userId,
      location
    );

    return this.http.post<{ name: string }>(
      'https://ionic-angular-course-6c9cd-default-rtdb.europe-west1.firebasedatabase.app/offered-places.json',
      { ...newPlace, id: null })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.places$;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this.places$.next([...places, newPlace]);
        })
      );

    // return this.places.pipe(take(1), delay(1500), tap((places => {
    //   this.places$.next([...places, newPlace]);
    // })));
  }

  updatePlace(
    placeId: string,
    title: string,
    description: string,
  ) {
    let updatedPlaces: Place[];

    return this.places.pipe(
      take(1),
      switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(p => p.id === placeId);
        updatedPlaces = [...places];
        const old = updatedPlaces[updatedPlaceIndex];

        updatedPlaces[updatedPlaceIndex] = new Place(
          old.id,
          title,
          description,
          old.imageUrl,
          old.price,
          old.availableFrom,
          old.availableTo,
          old.userId,
          old.location
        );

        return this.http.put(
          `https://ionic-angular-course-6c9cd-default-rtdb.europe-west1.firebasedatabase.app/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this.places$.next(updatedPlaces);
      })
    );
  }
}
