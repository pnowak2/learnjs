import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  firstname: string = 'piotr';
  lastname: string = 'nowak';

  logForm(form: any) {
    console.log(form);
  }
}
