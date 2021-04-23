import dayjs from 'dayjs';
import AbstractView from './abstract.js';

/**
 * Функция создания блока разметки для точки маршрута
 * @param {class} point - объект, содержащий информацию о точке маршрута
 * @returns - строка, содержащая блок разметки для точки маршрута
 */
const createTripRoutePointElement = (point) => {
  const {type, destination, dateTimeStart, dateTimeEnd, price, offers, isFavorite} = point;
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dayjs(dateTimeStart).format('YYYY-MM-DD')}">${dayjs(dateTimeStart).format('MMM D')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dayjs(dateTimeStart).format('YYYY-MM-DDThh:mm')}">${dayjs(dateTimeStart).format('hh:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="${dayjs(dateTimeEnd).format('YYYY-MM-DDThh:mm')}">${dayjs(dateTimeEnd).format('hh:mm')}</time>
      </p>
      <p class="event__duration">30M</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offers.map((offer) => `<li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join('')}
    </ul>
    <button class="event__favorite-btn ${favoriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class TripRoutePoint extends AbstractView{
  constructor(point) {
    super();
    this._point = point;
    this._element = null;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteHandler = this._favoriteHandler.bind(this);
  }

  getTemplate() {
    return createTripRoutePointElement(this._point);
  }
  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }
  _favoriteHandler(evt) {
    evt.preventDefault();
    this._callback.faviroteClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setFavoriteHandler(callback) {
    this._callback.faviroteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteHandler);
  }
}
