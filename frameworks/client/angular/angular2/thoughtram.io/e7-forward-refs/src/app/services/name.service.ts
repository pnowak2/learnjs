import { Injectable } from '@angular/core';

@Injectable()
export class NameService {

  constructor() { }

  getName() {
    return 'Angular';
  }

}
