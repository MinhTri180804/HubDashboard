import { TestBed } from '@angular/core/testing';

import { DialogCreateTodoService } from './dialog-create-todo-service';

describe('DialogCreateTodoService', () => {
  let service: DialogCreateTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogCreateTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
