import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ThreadsService } from '../services/threads.service';
import { Thread } from '../models/thread';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatThreadsComponent implements OnInit {
  threads$: Observable<any>;

  constructor(private threadService: ThreadsService) {
    this.threads$ = threadService.orderedThreads;
   }

  ngOnInit() {
  }

}
