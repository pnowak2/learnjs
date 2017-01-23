import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MessagesService } from './services/messages.service';
import { ThreadsService } from './services/threads.service';
import { UserService } from './services/user.service';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    NavBarComponent,
    ChatThreadComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MessagesService, ThreadsService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
