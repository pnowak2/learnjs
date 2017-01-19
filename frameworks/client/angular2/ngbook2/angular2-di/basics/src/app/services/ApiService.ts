import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  get(): string {
    return 'Resource..';
  }
}