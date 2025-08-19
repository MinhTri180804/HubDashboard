import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DoCheck,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChartComponent, ChartType } from 'ng-apexcharts';
import {
  TaskAnalyticsReportsData,
  TaskAnalyticsService,
} from '../../services/task-analytics-service';
import { ChartOptions } from '../../types/chartOptions';
import { ButtonComponent } from '../button-component/button-component';

const chartOptionsDefault: ChartOptions = {
  series: [],
  legend: {
    labels: {
      colors: 'white',
    },
    itemMargin: {
      horizontal: 16,
      vertical: 8,
    },
  },

  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
  },

  plotOptions: {
    bar: {
      horizontal: false,
      // endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    labels: {
      style: {
        colors: 'white',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: 'white',
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return `${val} Task`;
      },
    },
  },
};

type SeriesData = {
  name: string;
  data: number[];
};

@Component({
  selector: 'app-task-status-column-chart-component',
  imports: [ChartComponent, ButtonComponent],
  templateUrl: './task-status-column-chart-component.html',
  styleUrl: './task-status-column-chart-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskStatusColumnChartComponent
  implements OnInit, DoCheck, OnDestroy
{
  private destroy$ = new Subject<void>();
  currentPage = signal<number>(1);
  totalPage = signal<number>(0);
  hasNextPage = signal<boolean>(false);
  hasPreviousPage = signal<boolean>(false);

  isLoading = signal<boolean>(true);
  chartOptions = signal<Partial<ChartOptions>>(chartOptionsDefault);

  constructor(private _taskAnalyticsService: TaskAnalyticsService) {}

  ngOnInit(): void {
    this._taskAnalyticsService
      .fetchReport(this.currentPage())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this._updatePagination(response);
        },
        error: (error) => {
          console.log('Error: ', error);
          this.isLoading.set(false);
        },
      });
  }

  ngDoCheck(): void {
    console.log('DO CHECK');
  }

  onNextPage() {
    this.currentPage.update((prev) => prev + 1);
    this._taskAnalyticsService
      .fetchReport(this.currentPage())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => this._updatePagination(response),
      });
  }

  onPreviousPage() {
    if (this.currentPage() >= 1) {
      this.currentPage.update((prev) => prev - 1);
      this._taskAnalyticsService
        .fetchReport(this.currentPage())
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => this._updatePagination(response),
        });
    }
  }

  private _updatePagination(response: TaskAnalyticsReportsData) {
    const { pagination, seriesData, xaxisCategories } = response;
    const { hasNextPage, hasPreviousPage, totalItem } = pagination;

    this._updateSeries(seriesData);
    this._updateXaxis(xaxisCategories);

    this.totalPage.set(totalItem);
    this.hasNextPage.set(hasNextPage);
    this.hasPreviousPage.set(hasPreviousPage);

    console.log('HasPreviousPage: ', this.hasPreviousPage());
    console.log('HasNextPage: ', this.hasNextPage());
  }

  private _updateSeries(data: TaskAnalyticsReportsData['seriesData']) {
    if (!data) return;

    this.chartOptions.update((previous) => ({
      ...previous,
      series: [
        {
          name: 'Created',
          data: data.created || [],
        },
        {
          name: 'In Progress',
          data: data.inProgress || [],
        },
        {
          name: 'Done',
          data: data.completed || [],
        },
      ],
    }));
  }

  private _updateXaxis(data: TaskAnalyticsReportsData['xaxisCategories']) {
    if (!data) return;
    this.chartOptions.update((previous) => ({
      ...previous,
      xaxis: {
        ...previous.xaxis,
        categories: data || [],
      },
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
