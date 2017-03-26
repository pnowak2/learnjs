import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {HexadecimalValueValidator} from './validators';

import { FormTextComponent } from './components/input';
import { FormSelectComponent } from './components/select';
import { ValidationComponent } from './components/validation';

@NgModule({
  declarations: [
    AppComponent,
    FormTextComponent,
    FormSelectComponent,
    ValidationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
