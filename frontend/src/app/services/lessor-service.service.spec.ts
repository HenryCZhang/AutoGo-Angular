import { TestBed } from '@angular/core/testing';

import { LessorServiceService } from './lessor-service.service';

describe('LessorServiceService', () => {
  let service: LessorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
