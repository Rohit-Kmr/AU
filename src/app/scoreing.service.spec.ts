import { TestBed } from '@angular/core/testing';

import { ScoreingService } from './scoreing.service';

describe('ScoreingService', () => {
  let service: ScoreingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
