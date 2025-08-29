import { Component } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from '../../types/chartOptions';

const chartOptions: Partial<ChartOptions> = {
  series: [
    {
      name: 'XYZ MOTORS',
      data: [1, 2, 3],
    },
  ],
  chart: {
    type: 'area',
    stacked: false,
    height: 350,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: 'zoom',
    },
  },
  dataLabels: {
    enabled: false,
  },

  title: {
    text: 'Stock Price Movement',
    align: 'left',
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return (val / 1000000).toFixed(0);
      },
    },
    title: {
      text: 'Price',
    },
  },
  xaxis: {
    type: 'datetime',
  },
  tooltip: {
    shared: false,
    y: {
      formatter: function (val) {
        return (val / 1000000).toFixed(0);
      },
    },
  },
};

@Component({
  selector: 'app-task-movement-created-component',
  imports: [ChartComponent],
  templateUrl: './task-movement-created-component.html',
  styleUrl: './task-movement-created-component.scss',
})
export class TaskMovementCreatedComponent {
  chartOptions: Partial<ChartOptions> = chartOptions;
}
