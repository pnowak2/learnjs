import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormSkuComponent } from './form-sku/form-sku.component';
import { FormBuilderSkuComponent } from './form-builder-sku/form-builder-sku.component';
import { FormValidationsComponent } from './form-validations/form-validations.component';

@NgModule({
  declarations: [
    AppComponent,
    FormSkuComponent,
    FormBuilderSkuComponent,
    FormValidationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
