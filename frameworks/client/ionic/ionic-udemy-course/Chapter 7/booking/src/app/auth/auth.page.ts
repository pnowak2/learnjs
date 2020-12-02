import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin = true;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    const email = form.value.email;
    const password = form.value.password;

    console.log(email, password);

    if (this.isLogin) {
      // send a request to login servers
    } else {
      // send a request to signup servers
    }
  }

  onSwitchAuthModel() {
    this.isLogin = !this.isLogin;
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
