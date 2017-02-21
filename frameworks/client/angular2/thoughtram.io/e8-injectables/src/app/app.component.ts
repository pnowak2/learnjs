import { DataService } from './services/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  items: Array<any>;

  constructor(private dataService: DataService) {  
    this.items = dataService.getItems();
  }
}
