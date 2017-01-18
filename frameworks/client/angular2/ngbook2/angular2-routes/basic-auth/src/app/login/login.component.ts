import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(private authService: AuthService) { 
    this.message = '';
  }

  ngOnInit() {
  }

  login(username: string, password: string): boolean {
    console.log(username)
    this.message = '';

    if(!this.authService.login(username, password)) {
      this.message = 'Incorrect credentials.';
      setTimeout(() => {
        this.message = ''
      }, 2500);
    }
    return false;
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }

}
