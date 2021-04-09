import dayjs from 'dayjs';

/**
 * Функция генерации общей информации о точках маршрута
 * @param {*} trip - точки, через которые проходит маршрут
 * @returns - строка с обхей информацией о точках маршрута
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
 * Функция создания разметки для блока с общей информацией о маршруте
 * @param {object} tripInfo - объект содержащий данные с общей информацией и маршруте
 * @returns - строка, содержащая разметку для блока с общей информацией и маршруте
 */
export const createTripInfoTemplate = (tripInfo) => {
  const {trip, dateTimeStart, dateTimeEnd, totalPrice} = tripInfo;
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${createTripInfoPoints(trip)}</h1>

    <p class="trip-info__dates">${dayjs(dateTimeStart).format('MMM DD')}&nbsp;&mdash;&nbsp;${(dayjs(dateTimeStart).month() === dayjs(dateTimeEnd).month())?dayjs(dateTimeEnd).format('DD'):dayjs(dateTimeEnd).format('MMM DD')}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>
</section>`;
};
