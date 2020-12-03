import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingService } from 'src/app/bookings/booking.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.get('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }

      this.subscription = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
        this.isBookable = place.userId !== this.authService.userId;
      });
    });
  }

  onBookPlace() {
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Data',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Data',
          handler: () => {
            this.openBookingModal('random');
          }
        }, {
          text: 'Cancel',
          role: 'destructive'
        }
      ]
    }).then(asc => {
      asc.present();
    });

  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);

    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place, selectedMode: mode }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(resultData => {
      const data = resultData.data.bookingData;

      if (resultData.role === 'confirm') {
        this.loadingCtrl.create({
          message: 'Booking blace..'
        }).then(loadingEl => {
          loadingEl.present();

          this.bookingService.addBooking(this.place.id,
            this.place.title,
            this.place.imageUrl,
            data.firstName,
            data.lastName,
            data.guestNumber,
            data.startDate,
            data.endDate).subscribe(bookings => {
              loadingEl.dismiss();
            });
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
