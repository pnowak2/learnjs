import { PlayerService } from './../services/player.service';
import { Component, OnInit, Host } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css']
})
export class PlayButtonComponent implements OnInit {

  constructor(@Host() private playerService: PlayerService) { }

  ngOnInit() {
  }

}
