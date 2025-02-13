import { Component, Injectable, Inject, forwardRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [NameService]
})
export class AppComponent {
  name = 'app works!';

  constructor(@Inject(forwardRef(() => NameService)) nameService) {
    this.name = nameService.getName();
  }
}

@Injectable()
export class NameService {
  getName() {
    return 'Angular';
  }
}
