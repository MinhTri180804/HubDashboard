import { TestBed } from '@angular/core/testing';

import { TagsTodoService } from './tags-todo-service';

describe('TagsTodoService', () => {
  let service: TagsTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
