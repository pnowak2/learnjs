import { Injectable } from '@angular/core';

@Injectable()
export class OtherService {
  getValue(): string {
    return 'a other value';
  }
}