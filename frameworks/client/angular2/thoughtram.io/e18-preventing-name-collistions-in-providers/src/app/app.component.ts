import { Component, Inject } from '@angular/core';
import { DataService } from './services/data.service';
import { Token } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    private dataService: DataService,
    @Inject(Token) private config: string) {

  }
}
