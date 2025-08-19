import { Component } from '@angular/core';
import { AnalyticsTaskSummaryComponent } from '../../components/analytics-task-summary-component/analytics-task-summary-component';
import { BreadcrumbComponent } from '../../components/breadcrumb-component/breadcrumb-component';
import { CardComponent } from '../../components/card-component/card-component';
import { TaskStatusColumnChartComponent } from '../../components/task-status-column-chart-component/task-status-column-chart-component';
import { TaskStatusGaugeComponent } from '../../components/task-status-gauge-component/task-status-gauge-component';
import { TaskAnalyticsService } from '../../services/task-analytics-service';

@Component({
  selector: 'app-analytics-page',
  imports: [
    BreadcrumbComponent,
    CardComponent,
    TaskStatusColumnChartComponent,
    TaskStatusGaugeComponent,
    AnalyticsTaskSummaryComponent,
  ],
  templateUrl: './analytics-page.html',
  styleUrl: './analytics-page.scss',
  providers: [TaskAnalyticsService],
})
export class AnalyticsPage {
  constructor() {}
}
