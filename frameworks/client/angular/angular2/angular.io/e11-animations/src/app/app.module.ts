import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeroListBasicComponent } from './hero-list-basic/hero-list-basic.component';
import { HeroListInlineComponent } from './hero-list-inline/hero-list-inline.component';
import { HeroListWildcardComponent } from './hero-list-wildcard/hero-list-wildcard.component';
import { HeroListVoidComponent } from './hero-list-void/hero-list-void.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroListBasicComponent,
    HeroListInlineComponent,
    HeroListWildcardComponent,
    HeroListVoidComponent
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
