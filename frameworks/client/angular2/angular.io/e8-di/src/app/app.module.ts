import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroListComponent } from './hero-list/hero-list.component';

import { APP_CONFIG, HERO_DI_CONFIG, AppConfig } from './app.config';
import { Logger } from './services/logger.service';
import { BetterLoggerService } from './services/better-logger.service';
import { OldLoggerService } from './services/old-logger.service';

let silentLogger = {
  log: function(msg) {
    console.log('silent logger: ' + msg);
  }
}

let loggerFactory = (config: AppConfig) => {
  return {
    log: function(msg) {
      console.log('factory logger ' + config.apiEndpoint + ' : ' + msg);
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: HERO_DI_CONFIG },
    { provide: OldLoggerService, useClass: OldLoggerService },
    // { provide: Logger, useClass: BetterLoggerService },
    { provide: Logger, useExisting: OldLoggerService },
    { provide: Logger, useValue: silentLogger },
    { provide: Logger, useFactory: loggerFactory, deps: [APP_CONFIG]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
