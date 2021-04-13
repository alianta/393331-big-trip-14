import {createElement} from '../utils.js';

/**
 * Функция создания блока разметки для всего маршрута
 * @returns - строка, содержащая блок разметки для всего маршрута
 */
const createTripRouteTemplate = () => {
  return `<ul class="trip-events__list">
  </ul>`;
};

export default class TripRoute {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripRouteTemplate();
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
