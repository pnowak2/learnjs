import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { API_URL, ApiService } from './services/ApiService';

const isProduction: boolean = false;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: ApiService, useClass: ApiService },
    { provide: API_URL, useValue: isProduction ? 'https://production.api.sample.com' : 'http://dev-api.sample.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
