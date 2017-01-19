import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ComponentB } from './component-b';

@NgModule({
  declarations: [
    ComponentB
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [ComponentB],
  providers: [ ]
})
export class ModuleB { }
