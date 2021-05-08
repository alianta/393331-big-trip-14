import dayjs from 'dayjs';
import {DESTINATIONS, MIN_COUNT_PHOTOS, MAX_COUNT_PHOTOS, MIN_OFFER_COUNT, MAX_OFFER_COUNT} from '../const.js';
import {createTripRouteTypesTemplate} from './trip-route-types.js';
import {createTripRouteOfferTemplate} from './trip-route-offer.js';
import SmartView from './smart.js';
import {getRandomDestinationDescription, generatePhoto} from '../utils/trip.js';
import {getRandomInteger} from '../utils/common.js';
import {generateOffer} from '../mock/offer.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

/**
 * Функция создания блока разметки для блока редактирования точки маршрута
 * @param {object} point - объект с данными о точке маршрута
 * @returns - строка, содержащая разметку для блока редактирования точки маршрута
 */
const createTripRouteEditPointTemplate = (point) => {
  const {type, destination, dateTimeStart, dateTimeEnd, price, offers, destinationDetails} = point;

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


export default class TripRouteEditPoint extends SmartView{
  constructor(point) {
    super();
    this._data = point;
    this._element = null;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmit = this._formSubmit.bind(this);

    this._changePointTypeHandler = this._changePointTypeHandler.bind(this);
    this._changeDestenationHandler = this._changeDestenationHandler.bind(this);

    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-list')
      .addEventListener('click',this._changePointTypeHandler);
    this.getElement()
      .querySelector('#event-destination-1')
      .addEventListener('change',this._changeDestenationHandler);
  }

  _changePointTypeHandler (evt) {
    if(evt.target.tagName === 'INPUT'){
      this.updateData({
        type: evt.target.value,
        offers:new Array(getRandomInteger(MIN_OFFER_COUNT, MAX_OFFER_COUNT)).fill().map(generateOffer),
      });
    }
  }

  _changeDestenationHandler (evt) {
    this.updateData({
      destination: evt.target.value,
      destinationDetails: {
        description: getRandomDestinationDescription(),
        photos: new Array(getRandomInteger(MIN_COUNT_PHOTOS, MAX_COUNT_PHOTOS)).fill().map(generatePhoto),
      },
    });
  }

  getTemplate() {
    return createTripRouteEditPointTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setEditClickHandler(this._callback.editClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }
  _formSubmit(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }
  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }
  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmit);
  }
}
