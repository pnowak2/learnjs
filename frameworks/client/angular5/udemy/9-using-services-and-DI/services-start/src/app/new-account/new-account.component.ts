import { AccountsService } from './../accounts.service';
import { LoggingService } from './../logging.service';
import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [ LoggingService ]
})
export class NewAccountComponent {

  constructor(
    private loggingService: LoggingService,
    private accountsService: AccountsService) {
      this.accountsService.statusUpdated.subscribe((status) => {
        console.log('new status here: ' + status);
      })
     }

  onCreateAccount(accountName: string, accountStatus: string) {
    // this.loggingService.logStatusChange(accountStatus);
    this.accountsService.addAccount(accountName, accountStatus);
  }
}
