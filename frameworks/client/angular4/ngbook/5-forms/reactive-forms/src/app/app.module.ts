import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormBuilderSkuComponent } from './form-builder-sku/form-builder-sku.component';
import { NgmodelComponent } from './ngmodel/ngmodel.component';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderSkuComponent,
    NgmodelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
