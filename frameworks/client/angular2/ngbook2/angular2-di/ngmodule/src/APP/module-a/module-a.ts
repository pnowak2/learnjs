import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ComponentA } from './component-a';

@NgModule({
  declarations: [
    ComponentA
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [ComponentA],
  providers: [ ]
})
export class ModuleA { }
