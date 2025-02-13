import { AnalyticsService } from './../services/analytics.service';
import { UserService } from './../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-ngmodule-injection',
  templateUrl: './ngmodule-injection.component.html',
  styleUrls: ['./ngmodule-injection.component.css']
})
export class NgmoduleInjectionComponent {
  userName: string;

  constructor(
    private service: UserService,
    private analyticsService: AnalyticsService,
    @Inject('API_URL') public url
  ) { }


  onSignInClick(evt) {
    this.service.setUser({
      name: 'Piotr Nowak'
    });

    this.userName = this.service.getUser().name;
    this.analyticsService.recordEvent({
      eventName: 'log in',
      scope: 'user'
    });
  }

  onSignOutClick(evt) {
    this.service.setUser(null);
    this.userName = null;
    this.analyticsService.recordEvent({
      eventName: 'log out',
      scope: 'user'
    });
  }
}
