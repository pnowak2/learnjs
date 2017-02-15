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
import { OnInitComponent } from './lifecycle/on-init/on-init.component';
import { TabappComponent } from './tabs/tabapp/tabapp.component';
import { OninitAppComponent } from './lifecycle/on-init/oninit-app.component';
import { OnchangesAppComponent } from './lifecycle/on-changes/onchanges-app.component';
import { OnChangesComponent } from './lifecycle/on-changes/on-changes.component';
import { DoCheckItemComponent } from './lifecycle/docheck/do-check-item/do-check-item.component';
import { DoCheckAppComponent } from './lifecycle/docheck/do-check-app/do-check-app.component';
import { DoCheckComponent } from './lifecycle/docheck/do-check/do-check.component';
import { AllCallbacksComponent } from './lifecycle/all-callbacks/all-callbacks.component';
import { NgBookIfDirective } from './advanced-templates/ng-book-if.directive';
import { AppTesterComponent } from './advanced-templates/app-tester/app-tester.component';
import { NgBookRepeatDirective } from './advanced-templates/ng-book-repeat.directive';
import { DefaultCmpComponent } from './advanced-templates/change-detection/default-cmp/default-cmp.component';
import { OnpushCmpComponent } from './advanced-templates/change-detection/onpush-cmp/onpush-cmp.component';
import { ObservableCmpComponent } from './advanced-templates/change-detection/observable-cmp/observable-cmp.component';
import { ObservableApp } from './advanced-templates/change-detection/observable-cmp/observable-app';

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
    TabsetComponent,
    OnInitComponent,
    TabappComponent,
    OninitAppComponent,
    OnchangesAppComponent,
    OnChangesComponent,
    DoCheckItemComponent,
    DoCheckAppComponent,
    DoCheckComponent,
    AllCallbacksComponent,
    NgBookIfDirective,
    NgBookRepeatDirective,
    AppTesterComponent,
    DefaultCmpComponent,
    OnpushCmpComponent,
    ObservableCmpComponent,
    ObservableApp
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
