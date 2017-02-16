import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EncapsulationNoneComponent } from './encapsulation-none/encapsulation-none.component';
import { EncapsulationEmulatedComponent } from './encapsulation-emulated/encapsulation-emulated.component';
import { EncapsulationNativeComponent } from './encapsulation-native/encapsulation-native.component';

@NgModule({
  declarations: [
    AppComponent,
    EncapsulationNoneComponent,
    EncapsulationEmulatedComponent,
    EncapsulationNativeComponent
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
