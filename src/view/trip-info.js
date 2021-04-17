import dayjs from 'dayjs';
import AbstractView from './abstract.js';

/**
 * Функция генерации общей информации о точках маршрута
 * @param {*} trip - точки, через которые проходит маршрут
 * @returns - строка с общей информацией о точках маршрута
 */
const createTripInfoPoints = (trip) => {
  if(trip.length > 3){
    return `${trip[0]} &mdash;...&mdash; ${trip[trip.length-1]}`;
  } else if (trip.length === 3){
    return `${trip[0]} &mdash; ${trip[1]} &mdash; ${trip[2]}`;
  } else {
    return `${trip[0]} &mdash; ${trip[1]}`;
  }
};

/**
 * Функция генерации информации и дате начала и конца поездки
 * @param {*} dateTimeStart - дата начала поездки
 * @param {*} dateTimeEnd - дата конца поездки
 * @returns - строка с датами начала и конца поездки
 */
const createTripPeriod = (dateTimeStart, dateTimeEnd) => {
  if(dayjs(dateTimeStart).month() === dayjs(dateTimeEnd).month()){
    return `${dayjs(dateTimeStart).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(dateTimeEnd).format('DD')}`;
  } else {
    return `${dayjs(dateTimeStart).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(dateTimeEnd).format('MMM DD')}`;
  }
};
/**
 * Функция создания разметки для блока с общей информацией о маршруте
 * @param {object} tripInfo - объект содержащий данные с общей информацией и маршруте
 * @returns - строка, содержащая разметку для блока с общей информацией и маршруте
 */
const createTripInfoTemplate = (tripInfo) => {
  const {trip, dateTimeStart, dateTimeEnd, totalPrice} = tripInfo;
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${createTripInfoPoints(trip)}</h1>

    <p class="trip-info__dates">${createTripPeriod(dateTimeStart, dateTimeEnd)}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>
</section>`;
};

export default class TripInfo extends AbstractView{
  constructor(tripInfo) {
    super();
    this._tripInfo = tripInfo;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripInfo);
  }
}
