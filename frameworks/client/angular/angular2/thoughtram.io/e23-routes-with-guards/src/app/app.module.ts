import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth-guard';
import { ConfirmDeactivateGuard } from './guards/confirm-deactivate-guard';

const routes: Route[] = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component: ListComponent },
  {
    path: 'contacts/:id',
    component: DetailComponent,
    canActivate: ['CanAlwaysActivateGuard', AuthGuard],
    canDeactivate: [ConfirmDeactivateGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    { provide: 'CanAlwaysActivateGuard', useValue: () => { return true } },
    AuthGuard,
    ConfirmDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
