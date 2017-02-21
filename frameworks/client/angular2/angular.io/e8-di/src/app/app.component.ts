import { Component, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( @Inject(APP_CONFIG) private appConfig: AppConfig) {
    this.title = 'app config: ' + appConfig.apiEndpoint;
  }

  title = 'app works!';
}
