import { TestBed } from '@angular/core/testing';

import { DialogCreateTaskState } from './dialog-create-task-state';

describe('DialogCreateTaskState', () => {
  let service: DialogCreateTaskState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogCreateTaskState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
