import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InlineStyleComponent } from './styles/inline-style/inline-style.component';
import { StyleUrlsComponent } from './styles/style-urls/style-urls.component';
import { ShadowDomComponent } from './styles/shadow-dom/shadow-dom.component';
import { NoEncapsulationComponent } from './styles/no-encapsulation/no-encapsulation.component';

@NgModule({
  declarations: [
    AppComponent,
    InlineStyleComponent,
    StyleUrlsComponent,
    ShadowDomComponent,
    NoEncapsulationComponent
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
