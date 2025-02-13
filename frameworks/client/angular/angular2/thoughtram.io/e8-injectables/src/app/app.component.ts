import { DataService } from './services/data.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  items: Observable<any>;

  constructor(private dataService: DataService) {  
    this.items = dataService.getItems();
  }
}
