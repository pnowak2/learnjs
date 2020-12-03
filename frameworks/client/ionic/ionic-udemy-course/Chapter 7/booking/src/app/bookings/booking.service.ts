import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {

    constructor(private authService: AuthService) { }

    private _bookings: Subject<Booking[]> = new BehaviorSubject<Booking[]>([]);

    get bookings() {
        return this._bookings.asObservable();
    }

    addBooking(placeId: string,
               placeTitle: string,
               placeImage: string,
               firstName: string,
               lastName: string,
               guestNumber: number,
               dateFrom: Date,
               dateTo: Date): Observable<Booking[]> {
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

        return this._bookings.pipe(
            take(1),
            delay(1500),
            tap(bookings => {
            this._bookings.next([...bookings, newBooking]);
        }));
    }

    cancelBooking(bookingId: string) {
        return this._bookings.pipe(
            take(1),
            delay(1500),
            tap(bookings => {
                this._bookings.next(bookings.filter(booking => booking.id !== bookingId));
        }));
    }
}
