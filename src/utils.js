import dayjs from 'dayjs';
import {RANDOM_MIN_DAY, RANDOM_MAX_DAY, RANDOM_MIN_TIME, RANDOM_MAX_TIME, DESTINATIONS, TYPES, DESTINATION_DESCRIPTIONS, MAX_NUMBER_PHOTO, RenderPosition} from './const.js';
/**
 * Функция из интернета по генерации случайного числа из диапазона
 * Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
 * @param {Integer} a - начало диапазона
 * @param {Integer} b -конец диапазона
 * @returns - случайное чило из диапазона от a до b
 */
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

/**
 * Функция генерация случайной даты со временем
 * @returns - случайная дата и время
 */
export const getRandomDayAndTime = () => {
  const randomDate = getRandomInteger(RANDOM_MIN_DAY, RANDOM_MAX_DAY);
  const randomTime = getRandomInteger(RANDOM_MIN_TIME, RANDOM_MAX_TIME);
  return dayjs().add(randomDate, 'day').add(randomTime, 'minute').toDate();
};

/**
 * Функция генерации случайного напрвления для точки маршрута
 * @returns - строка с названием направления
 */
export const getRandomDestination = () => {
  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndex];
};

/**
 * Функция генерации случайного типа точки маршрута
 * @returns - строка с названием типа маршрута
 */
export const getRandomPointType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

/**
 * Функция генерации случайного описания о месте назначения точки маршрута
 * @returns  - строка с описанием места назначения
 */
export const getRandomDestinationDescription = () => {
  const randomIndex = getRandomInteger(0, DESTINATION_DESCRIPTIONS.length - 1);
  return DESTINATION_DESCRIPTIONS[randomIndex];
};


/**
 * Функция генерация адреса случайной фотографии
 * @returns - строка с адресом случайного фото
 */
export const generatePhoto = () => {
  const randomIndex = getRandomInteger(0, MAX_NUMBER_PHOTO);
  return `http://picsum.photos/248/152?r=${randomIndex}`;
};

/**
 * Функция для отрисовки (вставки в DOM) компонентов
 * @param {*} container - компонетен, в который необходимо вставть
 * @param {*} template -элемент, который необходимо вставить
 * @param {*} place - позицмя вставки (beforeBegin, afterBegin, beforeEnd, afterEnd)
 */
export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

/**
 * Функция вставки элемента в указанное место разметки
 * @param {HTMLElement} container - элемент-родитель в которой необходимо вставить элемент
 * @param {HTMLElement} element  - элемент, который необходимо вставить
 * @param {string} place  - место всвки
 */
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

/**
 * Функция создания элемента html по заданной строке разметки
 * @param {string} template  - строка разметки
 * @returns  - элемент html
 */
export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};
