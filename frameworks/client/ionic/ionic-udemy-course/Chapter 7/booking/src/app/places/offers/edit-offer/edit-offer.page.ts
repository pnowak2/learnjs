import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  form: FormGroup;
  place: Place;
  placeId: string;
  isLoading = false;
  private subscription: Subscription;

  constructor(
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.get('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }

      this.placeId = paramMap.get('placeId');
      this.isLoading = true;

      this.subscription = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;

        this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          })
        });

        this.isLoading = false;
      });

    });
  }

  onUpdateOffer() {
    if (this.form.invalid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Updating place..'
    }).then(loadingEl => {
      loadingEl.present();

      this.placesService.updatePlace(
        this.place.id,
        this.form.value.title,
        this.form.value.description
      ).subscribe(() => {
        this.loadingCtrl.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/places/tabs/offers');
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
