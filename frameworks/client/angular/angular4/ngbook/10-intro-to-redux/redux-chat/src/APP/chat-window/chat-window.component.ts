import { Store } from 'redux';
import { AppState } from './../reducers/app.reducer';
import { AppStore } from './../app.store';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  constructor( ) {
  }

  ngOnInit() {
  }

}
