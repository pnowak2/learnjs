import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroComponent } from './hero.component';
import { HeroListComponent } from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroRoutingModule } from './hero-routing.module';

import { HighlightDirective } from './highlight.directive';
import { HeroService } from './hero.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeroRoutingModule
  ],
  declarations: [
    HeroComponent,
    HeroListComponent,
    HeroDetailComponent,
    HighlightDirective
  ],
  providers: [HeroService],
  exports: [HeroComponent]
})
export class HeroModule { }
