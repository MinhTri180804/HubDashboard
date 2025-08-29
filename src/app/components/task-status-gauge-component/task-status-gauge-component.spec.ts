import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusGaugeComponent } from './task-status-gauge-component';

describe('TaskStatusGaugeComponent', () => {
  let component: TaskStatusGaugeComponent;
  let fixture: ComponentFixture<TaskStatusGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskStatusGaugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskStatusGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
