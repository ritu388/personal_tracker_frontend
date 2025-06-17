import { TestBed } from '@angular/core/testing';

import { DailyExpansesService } from './daily-expanses.service';

describe('DailyExpansesService', () => {
  let service: DailyExpansesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyExpansesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
