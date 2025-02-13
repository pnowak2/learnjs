/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OldLoggerService } from './old-logger.service';

describe('OldLoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OldLoggerService]
    });
  });

  it('should ...', inject([OldLoggerService], (service: OldLoggerService) => {
    expect(service).toBeTruthy();
  }));
});
