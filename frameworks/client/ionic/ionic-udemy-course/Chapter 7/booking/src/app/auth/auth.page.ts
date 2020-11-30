import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Logging in..'
    }).then(loadingEl => {
      loadingEl.present();

      setTimeout(() => {
        this.authService.login();
        loadingEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');
      }, 1500);
    });

  }

}
