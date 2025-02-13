import { youTubeSearchInjectables } from './youtube-search/services/youtube-search-injectables';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BasicRequestComponent } from './basic-request/basic-request.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import { YoutubeSearchResultComponent } from './youtube-search-result/youtube-search-result.component';
import { YoutubeBrowserComponent } from './youtube-browser/youtube-browser.component';
import { OtherRequestsComponent } from './other-requests/other-requests.component';
import { RequestOptionsComponent } from './request-options/request-options.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicRequestComponent,
    YoutubeSearchComponent,
    YoutubeSearchResultComponent,
    YoutubeBrowserComponent,
    OtherRequestsComponent,
    RequestOptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ youTubeSearchInjectables ],
  bootstrap: [AppComponent]
})
export class AppModule { }
