import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';

import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  id: string;
  track: Object;

  constructor(
    private spotify: SpotifyService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
  }

  ngOnInit() {
    this.spotify
      .getTrack(this.id)
      .subscribe((res: any) => {
        this.renderTrack(res);
      });
  }

  renderTrack(res: any): void {
    this.track = null;

    if (res && res.album) {
      this.track = res;
    }
  }

}
