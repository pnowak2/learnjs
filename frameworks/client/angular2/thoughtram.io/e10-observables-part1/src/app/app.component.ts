import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WikiService } from './services/wiki.service';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  term = new FormControl();
  items: Array<string>;

  constructor(private wikiService: WikiService) {
    this.term.valueChanges
      .debounceTime(400)
      .subscribe(term => {
        this.wikiService.search(term)
          .then(items => this.items = items);
      })
  }

  search(term) {
    this.wikiService.search(term)
      .then(items => this.items = items);
  }
}
