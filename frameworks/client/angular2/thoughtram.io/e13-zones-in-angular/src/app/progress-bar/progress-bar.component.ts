import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  progress: number = 0;

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  processOutsideOfAngularZone() {
    this.progress = 0;
    this.zone.runOutsideAngular(() => {
      this.increaseProgress(() => {
        this.zone.run(() => {
          console.log('Outside Done!');
        });
      });
    });
  }

  processWithinAngularZone() {
    this.progress = 0;
    this.increaseProgress(() => console.log('Done !'));
  }

  increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}`);

    if (this.progress < 100) {
      window.setTimeout(() => {
        this.increaseProgress(doneCallback);
      }, 10);
    }
  }
}
