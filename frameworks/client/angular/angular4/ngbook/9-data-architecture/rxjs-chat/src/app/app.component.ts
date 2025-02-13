import { ChatExampleData } from './data/chat-example-data';
import { UsersService } from './services/users.service';
import { ThreadsService } from './services/threads.service';
import { MessagesService } from './services/messages.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private messagesService: MessagesService,
    private threadsService: ThreadsService,
    private usersService: UsersService
  ) {
    ChatExampleData.init(messagesService, threadsService, usersService);
  }
}
