import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Store, StoreEnhancer, createStore, compose } from 'redux';
import { AppState, rootReducer } from './reducers/index';
import { AppStore } from './reducers/app-store';
import { AppComponent } from './app.component';

let devTools: StoreEnhancer<AppState> = window['devToolsExtension'] ? window['devToolsExtension']() : f => f;

export function appStore() {
  return createStore<AppState>(
    rootReducer, 
    compose(devTools)
  )
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{
    provide: AppStore, useFactory: appStore
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
