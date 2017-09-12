import { UserService } from './../services/user.service';
import { Component, OnInit, ReflectiveInjector } from '@angular/core';

@Component({
  selector: 'app-injector-example',
  templateUrl: './injector-example.component.html',
  styleUrls: ['./injector-example.component.css']
})
export class InjectorExampleComponent implements OnInit {
  userName: string;
  service: UserService;

  constructor() { }

  ngOnInit() {
    const injector = ReflectiveInjector.resolveAndCreate([UserService]);
    this.service = injector.get(UserService);
  }

  onSignInClick(evt) {
    this.service.setUser({
      name: 'Piotr Nowak'
    });

    this.userName = this.service.getUser().name;
  }

  onSignOutClick(evt) {
    this.service.setUser(null);
    this.userName = null;
  }
}
