import { Injectable } from '@angular/core';

@Injectable()
export class OldLoggerService {
  logs: string[] = [];

  log(message: string) {
    this.logs.push(message);
    console.log('old logger: ' + message);
  }
}
