import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb-component/breadcrumb-component';
import { CardComponent } from '../../components/card-component/card-component';
import { TaskStatusColumnChartComponent } from '../../components/task-status-column-chart-component/task-status-column-chart-component';
import { TaskStatusGaugeComponent } from "../../components/task-status-gauge-component/task-status-gauge-component";

@Component({
  selector: 'app-analytics-page',
  imports: [BreadcrumbComponent, CardComponent, TaskStatusColumnChartComponent, TaskStatusGaugeComponent],
  templateUrl: './analytics-page.html',
  styleUrl: './analytics-page.scss',
})
export class AnalyticsPage {}
