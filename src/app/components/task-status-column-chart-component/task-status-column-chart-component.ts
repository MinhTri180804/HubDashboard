import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { TaskAnalyticsService } from '../../services/task-analytics-service';
import { ChartOptions } from '../../types/chartOptions';
import { ButtonComponent } from '../button-component/button-component';
import { CardComponent } from '../card-component/card-component';
import { chartOptionsDefault } from './task-status-column-chart-options';

type SeriesData = {
  name: string;
  data: number[];
};

@Component({
  selector: 'app-task-status-column-chart-component',
  imports: [ChartComponent, ButtonComponent, CardComponent],
  templateUrl: './task-status-column-chart-component.html',
  styleUrl: './task-status-column-chart-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskStatusColumnChartComponent implements OnInit {
  private _taskAnalyticsService = inject(TaskAnalyticsService);

  data = this._taskAnalyticsService.report.value;
  isLoading = this._taskAnalyticsService.report.isLoading;
  chartOptions = computed<Partial<ChartOptions>>(() => {
    if (!this.isLoading()) {
      const seriesData = this.data()?.seriesData;
      const xaxisCategories = this.data()?.xaxisCategories;
      return {
        ...chartOptionsDefault,
        series: [
          {
            name: 'Created',
            data: seriesData?.created || [],
          },
          {
            name: 'In Progress',
            data: seriesData?.inProgress || [],
          },
          {
            name: 'Done',
            data: seriesData?.completed || [],
          },
        ],
        xaxis: {
          ...chartOptionsDefault.xaxis,
          categories: xaxisCategories,
        },
      };
    }

    return chartOptionsDefault;
  });

  constructor() {}

  ngOnInit(): void {}

  onNextPage() {
    this._taskAnalyticsService.pageReport.update((prev) => prev + 1);
  }

  onPreviousPage() {
    this._taskAnalyticsService.pageReport.update((prev) => prev - 1);
  }
}
