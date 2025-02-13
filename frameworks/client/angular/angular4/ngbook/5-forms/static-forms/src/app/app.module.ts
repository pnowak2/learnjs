import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormcontrolsFormgroupsComponent } from './formcontrols-formgroups/formcontrols-formgroups.component';
import { FirstFormComponent } from './first-form/first-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormcontrolsFormgroupsComponent,
    FirstFormComponent
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
