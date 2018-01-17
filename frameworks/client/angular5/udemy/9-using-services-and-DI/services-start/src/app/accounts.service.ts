import { Injectable, EventEmitter } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable()
export class AccountsService {
  statusUpdated = new EventEmitter<string>();

  accounts = [
    {
      name: 'Master Account 2',
      status: 'active'
    },
    {
      name: 'Testaccount 2',
      status: 'inactive'
    },
    {
      name: 'Hidden Account 2',
      status: 'unknown'
    }
  ];

  constructor(private loggingService: LoggingService) { }

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.loggingService.logStatusChange(status);

  }


  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
