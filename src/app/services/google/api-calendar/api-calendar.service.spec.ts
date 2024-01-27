import { TestBed } from '@angular/core/testing';

import { ApiCalendarService } from './api-calendar.service';

describe('ApiCalendarService', () => {
  let service: ApiCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
