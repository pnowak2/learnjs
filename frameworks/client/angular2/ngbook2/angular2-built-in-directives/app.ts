import {
  Component,
  EventEmitter
} from '@angular/core';

import { NgModule, Input, Output } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

@Component({
  selector: 'directives',
  template: `
  <ng-if> </ng-if>
  `
})
class Directives {
 
}

@Component({
  selector: 'ng-if',
  template: `
    test
  `
})
class NgIf {

}

@NgModule({
  declarations: [
    Directives,
    NgIf
  ],
  imports: [BrowserModule],
  bootstrap: [Directives]
})
class NGBuiltInDirectives { }

platformBrowserDynamic().bootstrapModule(NGBuiltInDirectives);

