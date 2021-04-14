import {createElement} from '../utils.js';

/**
 * Функция создания блока разметки для сообщения при пустом маршруте
 * @returns - строка, содержащая блок разметки для сообщения при пустом маршруте
 */
const createTripEmptyTemplate = () => {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};

export default class TripEmpty {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEmptyTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
