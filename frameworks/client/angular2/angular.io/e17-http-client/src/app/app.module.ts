import { HeroData } from './services/hero-data';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { requestOptionsProvider } from './services/default-request-options';
import { HeroService } from './services/hero.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';

import { AppComponent } from './app.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { WikiComponent } from './wiki/wiki.component';
import { WikiSmartComponent } from './wiki-smart/wiki-smart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroListComponent,
    WikiComponent,
    WikiSmartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    InMemoryWebApiModule.forRoot(HeroData)
  ],
  providers: [HeroService, requestOptionsProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
