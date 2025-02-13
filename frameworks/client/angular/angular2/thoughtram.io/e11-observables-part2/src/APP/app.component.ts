import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WikiService } from './services/wiki.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  term = new FormControl('go');
  items: Observable<Array<string>>;

  constructor(private wikiService: WikiService) {
    this.wikiService.search(this.term.valueChanges);
  }
}
