import { PlayerinternalService } from './../services/playerinternal.service';
import { PlayerService } from './../services/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.css'],
  providers: [{
    provide: PlayerService, useClass: PlayerService
  }],
  viewProviders: [{
    provide: PlayerService, useClass: PlayerinternalService
  }]
})
export class VideoControlsComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
  }

  doSomethingElse() {
    this.playerService.do();
  }
}
