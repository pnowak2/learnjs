/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayerinternalService } from './playerinternal.service';

describe('PlayerinternalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerinternalService]
    });
  });

  it('should ...', inject([PlayerinternalService], (service: PlayerinternalService) => {
    expect(service).toBeTruthy();
  }));
});
