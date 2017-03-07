import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CrisisRoutingModule } from './crisis-routing.module';
import { CrisisComponent } from './crisis.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CrisisRoutingModule
  ],
  declarations: [
    CrisisComponent
  ],
  providers: [],
  exports: [CrisisComponent]
})
export class ContactModule { }
