import { Pagination } from '../../commons/commons';

export type AnalyticsTaskPeriod = {
  created: number;
  inProgress: number;
  completed: number;
  date: number;
};

export type AnalyticsTaskReportResponse = {
  pagination: Pagination;
  period: string;
  startDate: number;
  endDate: number;
  data: AnalyticsTaskPeriod[];
};

export type AnalyticsTaskSummaryResponse = {
  period: {
    startDate: number;
    endDate: number;
  };
  statistics: {
    total: number;
    created: number;
    inProgress: number;
    completed: number;
    notCompleted: number;
  };
};

type TaskCompletedPerformance = {
  name: string;
  data: {
    count: number;
    percentage: string;
  };
};

export type AnalyticsTaskPerformanceResponse = {
  period: {
    startDate: number;
    endDate: number;
  };
  totalCompleted: number;
  statistics: {
    onTime: TaskCompletedPerformance;
    early: TaskCompletedPerformance;
    late: TaskCompletedPerformance;
  };
};
