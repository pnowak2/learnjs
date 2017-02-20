import { PlayerService } from './../services/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.css'],
  providers: [PlayerService]
})
export class VideoControlsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
