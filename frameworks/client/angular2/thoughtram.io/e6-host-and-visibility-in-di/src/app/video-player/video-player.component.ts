import { PlayerService } from './../services/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
    providers: [{
    provide: PlayerService, useClass: PlayerService
  }],
})
export class VideoPlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
