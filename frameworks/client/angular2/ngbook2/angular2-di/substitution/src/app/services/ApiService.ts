import { Inject } from '@angular/core';

export const API_URL: string = 'API_URL';

export class ApiService {
  constructor(@Inject(API_URL) private apiUrl: string) {}

  get(): string {
    return `Calling ${this.apiUrl}/endpoint...`;
  }
}