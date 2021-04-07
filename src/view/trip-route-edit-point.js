import dayjs from 'dayjs';
import {TYPES, DESTINATIONS, OFFER_LIST} from '../const.js';

/**
 * Функция создания разметки дополнительный опций маршрута
 * @param {array} currentOffers - массив объектов, поедставляющий собой выбранные дополнительные опции маршрута
 * @returns - строка, содержащая разметку дополнительных опций маршрута
 */
const createTripRouteOffer = (currentOffers) => {
  return OFFER_LIST.map((offer) => {
    const isChecked = (currentOffers.find((currentOffer) => currentOffer.name === offer.name))? 'checked':'';
    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" ${isChecked}>
    <label class="event__offer-label" for="event-offer-${offer.type}-1">
      <span class="event__offer-title">${offer.name}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  }).join('');
};

/**
 * Функция создания разметки для выпадающего меню типов маршрутов
 * @param {string} currentType - текущий тип маршрута
 * @returns - строка, содержащая разметку для выпадающего меню типов маршрутов
 */
const createTripRouteEditTypesTemplate = (currentType) => {
  return TYPES.map((type) => {
    const isChecked = (type === currentType)? 'checked':'';
    type = type.toLowerCase();
    return `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`;
  }).join('');
};

/**
 * Функция создания блока разметки для блока редактирования точки маршрута
 * @param {object} point - объект с данными о точке маршрута
 * @returns - строка, содержащая разметку для блока редактирования точки маршрута
 */
export const createTripRouteEditPointTemplate = (point) => {
  const {type, destination, dateTimeStart, dateTimeEnd, price, offers, destinationDetails} = point;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createTripRouteEditTypesTemplate(type)}
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
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createTripRouteOffer(offers)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationDetails.description}</p>
      </section>
    </section>
  </form>
</li>`;
};
