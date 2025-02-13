import { Component, Inject } from '@angular/core';
import { ApiService } from './services/ApiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(ApiService) private apiService: ApiService) {

  }

  invokeApi(): void {
    console.log(this.apiService.get());
  }
}
