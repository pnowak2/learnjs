import { Component, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  firstName = 'piotr';
  lastName = 'nowak';
  addItemStream: EventEmitter<string> = new EventEmitter<string>();

  changeName() {
    this.firstName = 'Brad';
    this.lastName = 'Green';
  }

  emitStreamEvent() {
    this.addItemStream.emit('button clicked');
  }
}
