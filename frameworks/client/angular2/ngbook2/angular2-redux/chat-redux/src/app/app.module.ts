import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Store, StoreEnhancer, createStore } from 'redux';
import { counterReducer } from './redux/counter/counter-reducer';
import { AppComponent } from './app.component';
import { AppState } from './redux/counter/counter-app-state';
import { CounterComponentComponent } from './counter-component/counter-component.component';
import { AppStore } from './app-store';

let devTools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
    window['devToolsExtension']() : f => f;

export function appStore() {
  return createStore<AppState>(
    counterReducer,
    devTools
  )
}

@NgModule({
  declarations: [
    AppComponent,
    CounterComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: AppStore, useFactory: appStore }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
