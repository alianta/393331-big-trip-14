import AbstractView from './abstract.js';

/**
 * Функция создания блока разметки для сообщения при пустом маршруте
 * @returns - строка, содержащая блок разметки для сообщения при пустом маршруте
 */
const createTripEmptyTemplate = () => {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};

export default class TripEmpty extends AbstractView{
  getTemplate() {
    return createTripEmptyTemplate();
  }
}
