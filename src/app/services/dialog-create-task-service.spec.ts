import { TestBed } from '@angular/core/testing';

import { DialogCreateTaskService } from './dialog-create-task-service';

describe('DialogCreateTodoService', () => {
  let service: DialogCreateTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogCreateTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
