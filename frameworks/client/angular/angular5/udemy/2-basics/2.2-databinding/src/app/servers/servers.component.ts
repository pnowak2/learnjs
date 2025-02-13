import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '[app-servers]',
  // selector: '.app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created';
  serverName = 'Test Server';
  serverCreated = false;
  servers = ['Test server', 'Another server'];
  isDetailsVisible = false;
  logs = [];
  logNr = 1;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created Name is ' + this.serverName;
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }

  onUpdateServerName(evt: Event) {
    this.serverName = (<HTMLInputElement>evt.target).value;
  }

  onToggleDetails() {
    this.isDetailsVisible = !this.isDetailsVisible;
    this.logs.push(new Date());
  }

  shouldHighlight(log) {
    if (parseInt(log, 10) > 4) { return true; } else { return false; }
  }
}
