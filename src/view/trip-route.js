import AbstractView from './abstract.js';

/**
 * Функция создания блока разметки для всего маршрута
 * @returns - строка, содержащая блок разметки для всего маршрута
 */
const createTripRouteTemplate = () => {
  return `<ul class="trip-events__list">
  </ul>`;
};

export default class TripRoute extends AbstractView{
  getTemplate() {
    return createTripRouteTemplate();
  }
}
