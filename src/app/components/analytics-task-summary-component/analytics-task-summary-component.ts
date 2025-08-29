import { Component, computed, inject } from '@angular/core';
import { TaskAnalyticsService } from '../../services/task-analytics-service';
import { CardComponent } from '../card-component/card-component';

@Component({
  selector: 'app-analytics-task-summary-component',
  imports: [CardComponent],
  templateUrl: './analytics-task-summary-component.html',
  styleUrl: './analytics-task-summary-component.scss',
})
export class AnalyticsTaskSummaryComponent {
  private _taskAnalyticsService = inject(TaskAnalyticsService);

  data = this._taskAnalyticsService.summary.value;

  completedCount = computed(() => this.data().statistics.completed);
  createdCount = computed(() => this.data().statistics.created);
  inProgressCount = computed(() => this.data().statistics.inProgress);
  notCompletedCount = computed(() => this.data().statistics.notCompleted);

  constructor() {}
}
