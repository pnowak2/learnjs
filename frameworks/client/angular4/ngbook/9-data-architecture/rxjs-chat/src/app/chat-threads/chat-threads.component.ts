import { Observable } from 'rxjs';
import { ThreadsService } from './../services/threads.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {
  threads: Observable<any>;

  constructor(private threadsService: ThreadsService) {
    this.threads = threadsService.orderedThreads$;
  }

  ngOnInit() {
  }

}
