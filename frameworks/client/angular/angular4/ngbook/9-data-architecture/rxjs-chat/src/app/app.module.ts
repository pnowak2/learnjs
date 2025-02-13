import { FormsModule } from '@angular/forms';
import { threadsServiceInjectables } from './services/threads.service';
import { messagesServiceInjectables } from './services/messages.service';
import { userServiceInjectables } from './services/users.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatNavBarComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    ChatThreadComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    userServiceInjectables,
    messagesServiceInjectables,
    threadsServiceInjectables
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
