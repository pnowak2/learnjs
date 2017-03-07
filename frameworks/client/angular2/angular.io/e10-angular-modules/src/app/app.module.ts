import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HighlightDirective } from './highlight.directive';
import { TitleComponent } from './title.component';
import { UserService } from './user.service';
import { ContactComponent } from './contact/contact.component';
import { ContactService } from './contact/contact.service';
import { AwesomePipe } from './contact/awesome.pipe';
import { HighlightDirective as ContactHighlightDirective } from './contact/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    TitleComponent,
    ContactComponent,
    ContactHighlightDirective,
    AwesomePipe,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserService, ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
