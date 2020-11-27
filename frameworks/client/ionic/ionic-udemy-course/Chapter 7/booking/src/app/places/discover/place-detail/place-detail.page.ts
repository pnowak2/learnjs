import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap.get('placeId'));
  }

  onBookPlace() {
    this.navCtrl.navigateBack('/places/tabs/discover');
    // this.router.navigateByUrl('/places/tabs/discover');
    // this.navCtrl.pop();
  }

}
