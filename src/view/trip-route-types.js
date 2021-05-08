
import {TYPES} from '../const.js';
/**
 * Функция создания разметки для выпадающего меню типов маршрутов
 * @param {string} currentType - текущий тип маршрута
 * @returns - строка, содержащая разметку для выпадающего меню типов маршрутов
 */
export const createTripRouteTypesTemplate = (currentType) => {
  let typeName = '';
  return TYPES.map((type) => {
    const isChecked = (type.name === currentType)? 'checked':'';
    typeName = type.name.toLowerCase();
    return `<div class="event__type-item">
      <input id="event-type-${typeName}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.name}" ${isChecked}>
      <label class="event__type-label  event__type-label--${typeName}" for="event-type-${typeName}-1">${type.name}</label>
    </div>`;
  }).join('');
};
