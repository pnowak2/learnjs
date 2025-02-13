import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ModuleA } from './module-a/module-a';
import { ModuleB } from './module-b/module-b';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModuleA,
    ModuleB
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
