import { ChartOptions } from '../../types/chartOptions';

export const chartOptionsDefault: ChartOptions = {
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
