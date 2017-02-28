import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { VcardAppComponent } from './vcard-app/vcard-app.component';
import { VcardComponent } from './vcard/vcard.component';
import { CartbadgeComponent } from './cartbadge/cartbadge.component';

@NgModule({
  declarations: [
    AppComponent,
    VcardAppComponent,
    VcardComponent,
    CartbadgeComponent,
    CartbadgeComponent
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
