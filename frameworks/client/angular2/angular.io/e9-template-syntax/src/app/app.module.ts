import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SubComponent } from './sub/sub.component';
import { SizerComponent } from './sizer/sizer.component';
import { InputoutputComponent } from './inputoutput/inputoutput.component';

@NgModule({
  declarations: [
    AppComponent,
    SubComponent,
    SizerComponent,
    InputoutputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
