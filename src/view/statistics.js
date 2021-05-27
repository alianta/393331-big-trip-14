import Abstract from './abstract';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {durationFormat} from '../utils/common.js';
import {countTimeSpendByTypes, countTransportByTypes, countPriceByTypes} from '../utils/trip.js';

const BAR_HEIGHT = 55;

const renderMoneyChart = (moneyCtx, points) => {
  const pointsByMoney = countPriceByTypes(points);
  const money = pointsByMoney.map((el) => el.price);
  const names = pointsByMoney.map((el) => el.name);

  moneyCtx.height = BAR_HEIGHT * (names.length-1);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: names,
      datasets: [{
        data: money,
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

const renderTypeChart = (typeCtx, points) => {
  const pointsByTransport = countTransportByTypes(points);
  const count = pointsByTransport.map((el) => el.count);
  const names = pointsByTransport.map((el) => el.name);

  typeCtx.height = BAR_HEIGHT * (names.length-1);
  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: names,
      datasets: [{
        data: count,
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
  const pointsByTime = countTimeSpendByTypes(points);
  const time = pointsByTime.map((el) => el.time);
  const names = pointsByTime.map((el) => el.name);

  timeCtx.height = BAR_HEIGHT * (names.length-1);
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: names,
      datasets: [{
        data: time,
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
          formatter: (val) => `${durationFormat(val)}`,
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
          minBarLength: 70,
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

    this._moneyElement = this.getElement().querySelector('.statistics__chart--money');
    this._transportElement = this.getElement().querySelector('.statistics__chart--transport');
    this._timeElement = this.getElement().querySelector('.statistics__chart--time');

    this._moneyCart = renderMoneyChart(this._moneyElement, this._data);
    this._transportCart = renderTypeChart(this._transportElement, this._data);
    this._timeCart = renderTimesChart(this._timeElement, this._data);
  }

  removeElement() {
    super.removeElement();
    if (this._moneyCart !== null) {
      this._moneyCart.destroy();
      this._moneyCart = null;
    }
    if (this._transportCart !== null) {
      this._transportCart.destroy();
      this._transportCart = null;
    }
    if (this._timeCart !== null) {
      this._timeCart.destroy();
      this._timeCart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }
}
