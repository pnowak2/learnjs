import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Store, StoreEnhancer, createStore, compose } from 'redux';
import { AppState, rootReducer } from './reducers/index';
import { AppStore } from './reducers/app-store';
import { AppComponent } from './app.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ChatThreadsComponent } from './containers/chat-threads/chat-threads.component';
import { ChatNavbarComponent } from './containers/chat-navbar/chat-navbar.component';
import { ChatWindowComponent } from './containers/chat-window/chat-window.component';
import { ChatThreadComponent } from './components/chat-thread/chat-thread.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';

let devTools: StoreEnhancer<AppState> = window['devToolsExtension'] ? window['devToolsExtension']() : f => f;

export function appStore() {
  return createStore<AppState>(
    rootReducer,
    compose(devTools)
  )
}

@NgModule({
  declarations: [
    AppComponent,
    ChatPageComponent,
    ChatThreadsComponent,
    ChatNavbarComponent,
    ChatWindowComponent,
    ChatThreadComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: AppStore, useFactory: appStore }],
  bootstrap: [AppComponent]
})
export class AppModule { }
