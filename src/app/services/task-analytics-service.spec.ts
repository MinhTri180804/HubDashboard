import { TestBed } from '@angular/core/testing';

import { TaskAnalyticsService } from './task-analytics-service';

describe('TaskAnalyticsService', () => {
  let service: TaskAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
