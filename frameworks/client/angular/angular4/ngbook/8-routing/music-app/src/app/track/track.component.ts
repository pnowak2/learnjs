import { SpotifyService } from './../services/spotify.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  @Input() id: string;

  constructor(private service: SpotifyService) { }

  ngOnInit() {
    this.service.getTrack(this.id)
      .subscribe((res: any) => {
        this.renderTrack(res);
      });
  }

  renderTrack(res: any): void {

  }

}
