/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WikiService } from './wiki.service';

describe('WikiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WikiService]
    });
  });

  it('should ...', inject([WikiService], (service: WikiService) => {
    expect(service).toBeTruthy();
  }));
});
