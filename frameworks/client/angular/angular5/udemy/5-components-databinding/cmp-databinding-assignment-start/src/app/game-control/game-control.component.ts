import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit, OnDestroy {
  @Output() tick = new EventEmitter<number>();

  private timerHandler: any;
  private counter = 0;

  constructor() { }

  ngOnInit() {
  }

  onStartClick(evt) {
    this.timerHandler = setInterval(() => {
      this.tick.next(this.counter++);
    }, 1000);
  }

  onStopClick(evt) {
    clearInterval(this.timerHandler);
    this.counter = 0;
  }

  ngOnDestroy() {
    this.timerHandler = null;
  }
}
