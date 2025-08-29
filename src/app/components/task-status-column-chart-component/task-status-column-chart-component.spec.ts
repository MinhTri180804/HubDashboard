import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusColumnChartComponent } from './task-status-column-chart-component';

describe('TaskStatusColumnChartComponent', () => {
  let component: TaskStatusColumnChartComponent;
  let fixture: ComponentFixture<TaskStatusColumnChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskStatusColumnChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskStatusColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
