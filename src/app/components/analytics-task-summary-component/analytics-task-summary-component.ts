import { Component, computed, OnInit, signal } from '@angular/core';
import { CardComponent } from '../card-component/card-component';
import { TaskAnalyticsService } from '../../services/task-analytics-service';
import { AnalyticsTaskSummaryResponse } from '../../types/response/analytics/task';

@Component({
  selector: 'app-analytics-task-summary-component',
  imports: [CardComponent],
  templateUrl: './analytics-task-summary-component.html',
  styleUrl: './analytics-task-summary-component.scss',
})
export class AnalyticsTaskSummaryComponent implements OnInit {
  private _summaryData = signal<AnalyticsTaskSummaryResponse['statistics']>({
    total: 0,
    completed: 0,
    created: 0,
    inProgress: 0,
    notCompleted: 0,
  });

  completedCount = computed(() => this._summaryData().completed);
  createdCount = computed(() => this._summaryData().created);
  inProgressCount = computed(() => this._summaryData().inProgress);
  notCompletedCount = computed(() => this._summaryData().notCompleted);

  constructor(private _taskAnalyticsService: TaskAnalyticsService) {}

  ngOnInit(): void {
    this._taskAnalyticsService.fetchSummary().subscribe({
      next: (response) => {
        this._summaryData.set(response.statistics);
      },

      error: (error) => {
        console.error('Error analytics task summary: ', error);
      },
    });
  }
}
