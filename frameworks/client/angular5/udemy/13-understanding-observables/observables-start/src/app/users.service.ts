import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class UsersService {
  userActivated = new Subject<number>();

  constructor() { }
}
