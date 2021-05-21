import Abstract from './abstract';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {TYPES} from '../const.js';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const createPointDuration = (dateTimeStart, dateTimeEnd) => { //вынести в утилиты отсюда и из trip-route-point.js
  const duration = dayjs.duration(dayjs(dateTimeEnd).diff(dayjs(dateTimeStart)));
  const durationDaysTemplate = (duration.days()==0) ? '' : duration.days() + 'D ';
  const durationHoursTemplate = (duration.hours()==0) ? '' : duration.hours() + 'H ';
  const durationMinutesTemplate = (duration.minutes()==0) ? '' : duration.minutes() + 'M';
  return durationDaysTemplate + durationHoursTemplate + durationMinutesTemplate;
};
const valToFormat = (val) => {
  const durationDaysTemplate = (dayjs.duration(val).days()==0) ? '' : dayjs.duration(val).days() + 'D ';
  const durationHoursTemplate = (dayjs.duration(val).hours()==0) ? '' : dayjs.duration(val).hours() + 'H ';
  const durationMinutesTemplate = (dayjs.duration(val).minutes()==0) ? '' : dayjs.duration(val).minutes() + 'M';
  return durationDaysTemplate + durationHoursTemplate + durationMinutesTemplate;
};

const countTimeSpendByType = (points, type) => {
  const pointsByType = points.filter((point) => point.type === type);
  return pointsByType.reduce((prev, curr) => {return prev + dayjs.duration(dayjs(curr.dateTimeEnd).diff(dayjs(curr.dateTimeStart)));}, 0);
};
export const countTimeSpendByTypes = (points) => {
  const prices =[];
  TYPES.forEach((element) => prices.push(countTimeSpendByType(points,element.name)));
  return prices;
};

const countPointsMoneyByType = (points, type) => {
  const pointsByType = points.filter((point) => point.type === type);
  return pointsByType.reduce((prev, curr) => {return prev + curr.price;}, 0);
};
const countTransportByType = (points, type) => {
  const transportByType = points.filter((point) => point.type === type);
  return transportByType.length;
};

export const countPointsMoneyByTypes = (points) => {
  const prices =[];
  TYPES.forEach((element) => prices.push(countPointsMoneyByType(points,element.name)));
  return prices;
};
export const countTransportByTypes = (points) => {
  const transport =[];
  TYPES.forEach((element) => transport.push(countTransportByType(points,element.name)));
  return transport;
};

export const getPointTypesInUpperCase = () => {
  const pointTypes = [];
  TYPES.forEach((element) => pointTypes.push(element.name.toUpperCase()));
  return pointTypes;
};

const renderMoneyChart = (moneyCtx, points) => {
  const BAR_HEIGHT = 55;
  moneyCtx.height = BAR_HEIGHT * 5;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: getPointTypesInUpperCase(),
      datasets: [{
        data: countPointsMoneyByTypes(points),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTransportCtxChart = (typeCtx, points) => {
  const BAR_HEIGHT = 55;
  typeCtx.height = BAR_HEIGHT * 5;
  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: getPointTypesInUpperCase(),
      datasets: [{
        data: countTransportByTypes(points),//заменить данными
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimesChart = (timeCtx, points) => {
  const BAR_HEIGHT = 55;
  timeCtx.height = BAR_HEIGHT * 5;
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: getPointTypesInUpperCase(),
      datasets: [{
        data: countTimeSpendByTypes(points).forEach((val)=>{dayjs.duration(val).minutes();}),//заменить данными
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${valToFormat(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME-SPEND',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


const createStatisticsTemplate = () => {
  return `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`;
};

export default class Statistics extends Abstract {
  constructor(points) {
    super();

    this._data = points;

    this._moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    this._transportCtx = this.getElement().querySelector('.statistics__chart--transport');
    this._timeCtx = this.getElement().querySelector('.statistics__chart--time');

    this._moneyCart = renderMoneyChart(this._moneyCtx, this._data);
    this._transportCart = renderTransportCtxChart(this._transportCtx, this._data);
    this._timeCart = renderTimesChart(this._timeCtx, this._data);
  }

  removeElement() {
    super.removeElement();
    if (this._moneyCtx !== null) {
      this._moneyCtx = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }
}
