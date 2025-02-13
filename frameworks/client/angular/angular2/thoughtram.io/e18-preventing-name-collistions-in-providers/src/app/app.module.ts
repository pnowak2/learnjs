import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { Token, CONFIG } from './app.config';

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
    { provide: DataService, useClass: DataService },
    { provide: Token, useValue: CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
