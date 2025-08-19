import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';
import { ChartOptions } from '../../types/chartOptions';

@Component({
  selector: 'app-task-status-column-chart-component',
  imports: [ChartComponent],
  templateUrl: './task-status-column-chart-component.html',
  styleUrl: './task-status-column-chart-component.scss',
})
export class TaskStatusColumnChartComponent {
  chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      legend: {
        labels: {
          colors: 'white',
        },
        itemMargin: {
          horizontal: 16,
          vertical: 24,
        },
      },
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      chart: {
        type: 'bar',
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
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
        ],

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
          formatter: function (val) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    };
  }
}
