import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import { VideoScreenComponent } from './video-screen/video-screen.component';
import { VideoControlsComponent } from './video-controls/video-controls.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { PauseButtonComponent } from './pause-button/pause-button.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

@NgModule({
  declarations: [
    AppComponent,
    OneComponent,
    TwoComponent,
    ThreeComponent,
    VideoPlayerComponent,
    VideoScreenComponent,
    VideoControlsComponent,
    PlayButtonComponent,
    PauseButtonComponent
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
