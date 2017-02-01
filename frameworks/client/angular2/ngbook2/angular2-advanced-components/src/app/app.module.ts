import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InlineStyleComponent } from './styles/inline-style/inline-style.component';
import { StyleUrlsComponent } from './styles/style-urls/style-urls.component';
import { ShadowDomComponent } from './styles/shadow-dom/shadow-dom.component';
import { NoEncapsulationComponent } from './styles/no-encapsulation/no-encapsulation.component';
import { PopupDirective } from './host/popup.directive';
import { SampleAppComponent } from './host/sample-app/sample-app.component';
import { ContentProjectionComponent } from './content-projection/content-projection.component';
import { MessageDirective } from './content-projection/message.directive';
import { TabComponent } from './tabs/tab/tab.component';
import { TabsetComponent } from './tabs/tabset/tabset.component';

@NgModule({
  declarations: [
    AppComponent,
    InlineStyleComponent,
    StyleUrlsComponent,
    ShadowDomComponent,
    NoEncapsulationComponent,
    PopupDirective,
    SampleAppComponent,
    ContentProjectionComponent,
    MessageDirective,
    TabComponent,
    TabsetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
