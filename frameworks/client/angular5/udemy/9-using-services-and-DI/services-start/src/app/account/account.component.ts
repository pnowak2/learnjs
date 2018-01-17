import { AccountsService } from './../accounts.service';
import { LoggingService } from './../logging.service';
import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [ LoggingService ]
})
export class AccountComponent {
  @Input() account: { name: string, status: string };
  @Input() id: number;

  constructor(
    private loggingService: LoggingService,
    private accountsService: AccountsService) { }

  onSetTo(status: string) {
    // this.loggingService.logStatusChange(status);
    this.accountsService.updateStatus(this.id, status);
    this.accountsService.statusUpdated.emit(status);
  }
}
