import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMovementCreatedComponent } from './task-movement-created-component';

describe('TaskMovementCreatedComponent', () => {
  let component: TaskMovementCreatedComponent;
  let fixture: ComponentFixture<TaskMovementCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskMovementCreatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskMovementCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
