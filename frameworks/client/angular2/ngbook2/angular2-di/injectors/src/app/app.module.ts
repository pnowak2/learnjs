import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ViewPortService } from './services/ViewPortService';
import { myFactory } from './factories/MyFactory';

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
    ViewPortService,
    {
      provide: 'SizeService',
      useFactory: myFactory,
      deps: [ViewPortService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
