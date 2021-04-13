import dayjs from 'dayjs';
import {DESTINATIONS} from '../const.js';
import {createTripRouteTypesTemplate} from './trip-route-types.js';
import {createTripRouteOfferTemplate} from './trip-route-offer.js';
import {createElement} from '../utils.js';

/**
 * Функция создания блока разметки для блока создания точки маршрута
 * @param {object} point - объект с данными о точке маршрута
 * @returns - строка, содержащая разметку для блока редактирования точки маршрута
 */
const createTripRouteAddPointTemplate = (point) => {
  const {type, destination, dateTimeStart, dateTimeEnd, offers, destinationDetails} = point;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createTripRouteTypesTemplate(type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${DESTINATIONS.map((dest) => `<option value="${dest}"></option>`).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateTimeStart).format('DD/MM/YY hh:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTimeEnd).format('DD/MM/YY hh:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createTripRouteOfferTemplate(offers)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationDetails.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${destinationDetails.photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join('')}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`;
};

export default class TripRouteAddPoint {
  constructor() {
    this._element = null;
  }

  getTemplate(point) {
    return createTripRouteAddPointTemplate(point);
  }

  getElement(point) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(point));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
