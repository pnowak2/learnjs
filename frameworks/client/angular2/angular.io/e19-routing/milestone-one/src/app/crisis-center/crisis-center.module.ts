import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CrisisCenterComponent } from './crisis-center.component';

import { CrisisCenterRoutingModule } from './crisis-center-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CrisisCenterRoutingModule
  ],
  declarations: [
    CrisisCenterComponent
  ],
  providers: []
})
export class CrisisCenterModule {

}