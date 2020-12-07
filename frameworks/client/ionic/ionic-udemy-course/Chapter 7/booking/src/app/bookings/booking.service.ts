import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';

interface BookingData {
    bookedFrom: string;
    bookedTo: string;
    guestNumber: number;
    firstName: string;
    lastName: string;
    placeId: string;
    placeImage: string;
    placeTitle: string;
    userId: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {

    constructor(private authService: AuthService, private http: HttpClient) { }

    private bookings$: Subject<Booking[]> = new BehaviorSubject<Booking[]>([]);

    get bookings() {
        return this.bookings$.asObservable();
    }

    fetchBookings(): Observable<Booking[]> {
        return this.http
            .get<{ [key: string]: BookingData }>(`https://ionic-angular-course-6c9cd-default-rtdb.europe-west1.firebasedatabase.app/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`)
            .pipe(
                map(bookingData => {
                    return Object.keys(bookingData).map(key => {
                        const booking = bookingData[key];
                        return new Booking(
                            key,
                            booking.placeImage,
                            booking.userId,
                            booking.placeTitle,
                            booking.placeImage,
                            booking.firstName,
                            booking.lastName,
                            +booking.guestNumber,
                            new Date(booking.bookedFrom),
                            new Date(booking.bookedTo)
                        );
                    });
                }),
                tap(bookings => {
                    this.bookings$.next(bookings);
                })
            );
    }

    addBooking(placeId: string,
        placeTitle: string,
        placeImage: string,
        firstName: string,
        lastName: string,
        guestNumber: number,
        dateFrom: Date,
        dateTo: Date): Observable<Booking[]> {

        let generatedId: string;
        const newBooking = new Booking(
            Math.random().toString(),
            placeId,
            this.authService.userId,
            placeTitle,
            placeImage,
            firstName,
            lastName,
            guestNumber,
            dateFrom,
            dateTo
        );

        return this.http.post<{ name: string }>(
            'https://ionic-angular-course-6c9cd-default-rtdb.europe-west1.firebasedatabase.app/bookings.json',
            { ...newBooking, id: null }
        ).pipe(
            switchMap((resData) => {
                generatedId = resData.name;
                return this.bookings;
            }),
            take(1),
            tap(bookings => {
                newBooking.id = generatedId;
                this.bookings$.next([...bookings, newBooking]);
            })
        );
    }

    cancelBooking(bookingId: string) {
        return this.http.delete(`https://ionic-angular-course-6c9cd-default-rtdb.europe-west1.firebasedatabase.app/bookings/${bookingId}.json`)
        .pipe(
            switchMap(() => {
                return this.bookings$;
            }),
            take(1),
            tap(bookings => {
                this.bookings$.next(bookings.filter(booking => booking.id !== bookingId));
            })
        );
    }
}
