import { Injectable } from '@angular/core';

@Injectable()
export class BetterLoggerService {
  logs: string[] = [];

  log(message: string) {
    this.logs.push(message);
    console.log('better logger: ' + message);
  }
}
