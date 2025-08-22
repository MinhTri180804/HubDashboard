import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { ResponseSuccess } from '../types/commons/commons';
import {
  AnalyticsTaskPerformanceResponse,
  AnalyticsTaskPeriod,
  AnalyticsTaskReportResponse,
  AnalyticsTaskSummaryResponse,
} from '../types/response/analytics/task';
import { Observable, map, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

// Method params
type GetReportParams = {
  page: number;
};
type GetSummaryParams = {};
type GetPerformanceParams = {};

// Types data returns component after pipe transform
export type TaskAnalyticsReportsData = Omit<
  AnalyticsTaskReportResponse,
  'data'
> & {
  xaxisCategories: string[];
  seriesData: {
    [key in keyof Partial<AnalyticsTaskPeriod>]: number[];
  };
};

export type TaskAnalyticsPerformanceData = AnalyticsTaskPerformanceResponse & {
  percentRotation: number;
};

const SUMMARY_DEFAULT_VALUE = {
  period: {
    startDate: 0,
    endDate: 0,
  },
  statistics: {
    total: 0,
    created: 0,
    inProgress: 0,
    completed: 0,
    notCompleted: 0,
  },
};

const PERFORMANCE_DEFAULT_VALUE = null;

@Injectable()
export class TaskAnalyticsService {
  private _urlApi = 'localhost:5001/api/analytics/todos';

  pageReport = signal<number>(1);
  report = rxResource<TaskAnalyticsReportsData, GetReportParams>({
    params: () => ({
      page: this.pageReport(),
    }),
    stream: ({ params }) => this._getReport(params),
  });

  summary = rxResource<
    ResponseSuccess<AnalyticsTaskSummaryResponse>,
    GetSummaryParams
  >({
    params: () => ({}),
    stream: () => this._getSummary(),
    defaultValue: SUMMARY_DEFAULT_VALUE,
  });

  performance = rxResource<
    TaskAnalyticsPerformanceData | null,
    GetPerformanceParams
  >({
    params: () => ({}),
    stream: () => this._getPerformance(),
    defaultValue: PERFORMANCE_DEFAULT_VALUE,
  });

  constructor(private _httpClient: HttpClient) {}

  // @ Private methods related fetching data
  private _getReport(
    params: GetReportParams
  ): Observable<TaskAnalyticsReportsData> {
    const urlApi = `${this._urlApi}/reports?page=${params.page}`;
    return this._httpClient
      .get<ResponseSuccess<AnalyticsTaskReportResponse>>(urlApi)
      .pipe(
        map((responseData) => {
          const { xaxisCategories, seriesData } = this._parseReportData(
            responseData.data
          );

          return {
            ...responseData,
            xaxisCategories,
            seriesData,
          };
        })
      );
  }

  private _getSummary(): Observable<
    ResponseSuccess<AnalyticsTaskSummaryResponse>
  > {
    const urlApi = `${this._urlApi}/summary`;
    return this._httpClient.get<ResponseSuccess<AnalyticsTaskSummaryResponse>>(
      urlApi
    );
  }

  public _getPerformance(): Observable<TaskAnalyticsPerformanceData> {
    const urlApi = `${this._urlApi}/performance`;
    return this._httpClient
      .get<ResponseSuccess<TaskAnalyticsPerformanceData>>(urlApi)
      .pipe(
        map((response) => {
          return {
            ...response,
            percentRotation: this._calculatorRotationPerformance(response),
          };
        })
      );
  }

  private _parseReportData(data: AnalyticsTaskReportResponse['data']) {
    const XAXIS_CATEGORIES_DATA_KEYS: (keyof AnalyticsTaskPeriod)[] = ['date'];
    const SERIES_DATA_KEYS: (keyof AnalyticsTaskPeriod)[] = [
      'completed',
      'created',
      'inProgress',
    ];

    const seriesData: {
      [key in keyof Partial<AnalyticsTaskPeriod>]: number[];
    } = {};

    const xaxisCategories: string[] = [];

    for (let item of data) {
      const keys = Object.keys(item) as (keyof AnalyticsTaskPeriod)[];
      for (let key of keys) {
        if (XAXIS_CATEGORIES_DATA_KEYS.includes(key)) {
          xaxisCategories.push(this._handleParseXaxisCategories(item[key]));
          continue;
        }

        if (SERIES_DATA_KEYS.includes(key)) {
          const previousData = seriesData[key] ? seriesData[key] : [];
          seriesData[key] = [...previousData, item[key]];
        }
      }
    }

    return {
      seriesData,
      xaxisCategories,
    };
  }

  private _handleParseXaxisCategories(value: number) {
    const timeFormat = Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
    })
      .format(new Date(value))
      .replace('-', '/');

    return timeFormat;
  }

  private _calculatorRotationPerformance(
    data: AnalyticsTaskPerformanceResponse
  ): number {
    const statisticsData = Object.values(data.statistics);

    let maxIndex = 0;

    for (let i = 1; i < statisticsData.length; i++) {
      if (
        Number(statisticsData[maxIndex].data.percentage) <
        Number(statisticsData[i].data.percentage)
      ) {
        maxIndex = i;
      }
    }

    const keyOfStatisticMaxPercent = Object.keys(data.statistics)[
      maxIndex
    ] as keyof AnalyticsTaskPerformanceResponse['statistics'];

    const RANGE = 180 / statisticsData.length;

    const MAX_RANGE_lATE = 1 * RANGE;
    const MAX_RANGE_ON_TIME = 2 * RANGE;
    const MAX_RANGE_EARLY = 3 * RANGE;

    const PERCENT_OF_STATISTIC =
      (RANGE / 100) *
      Number(data.statistics[keyOfStatisticMaxPercent].data.percentage);

    let result;

    switch (keyOfStatisticMaxPercent) {
      case 'late':
        result = MAX_RANGE_lATE - PERCENT_OF_STATISTIC;
        break;

      case 'onTime':
        result = MAX_RANGE_ON_TIME - RANGE + PERCENT_OF_STATISTIC;
        break;

      case 'early':
        result = MAX_RANGE_EARLY - RANGE + PERCENT_OF_STATISTIC;
        break;

      default:
        result = 0;
    }

    return result;
  }
}
