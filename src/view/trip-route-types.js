
import {TYPES} from '../const.js';
/**
 * Функция создания разметки для выпадающего меню типов маршрутов
 * @param {string} currentType - текущий тип маршрута
 * @returns - строка, содержащая разметку для выпадающего меню типов маршрутов
 */
export const createTripRouteTypesTemplate = (currentType) => {
  return TYPES.map((type) => {
    const isChecked = (type.name === currentType)? 'checked':'';
    type.name = type.name.toLowerCase();
    return `<div class="event__type-item">
      <input id="event-type-${type.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.name}" ${isChecked}>
      <label class="event__type-label  event__type-label--${type.name}" for="event-type-${type.name}-1">${type.name}</label>
    </div>`;
  }).join('');
};
