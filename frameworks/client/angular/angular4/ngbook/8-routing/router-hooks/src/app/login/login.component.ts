import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(private auth: AuthService) {
    this.message = '';
  }

  ngOnInit() {
  }

  login(username: string, password: string): boolean {
    this.message = '';

    if (!this.auth.login(username, password)) {
      this.message = 'Incorrect credentials.';
      setTimeout(function () {
        this.message = '';
      }, 2500);
    }

    return false;
  }

  logout(): boolean {
    this.auth.logout();
    return false;
  }

}
