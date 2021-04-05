import {DESTINATIONS, TYPES, MIN_PRICE, MAX_PRICE} from '../const.js';
import {getRandomInteger} from '../utils.js';

/**
 * Функция генерации случайного типа точки маршрута
 * @returns - строка с названием типа маршрута
 */
const getRandomPointType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);

  return TYPES[randomIndex];
};
/**
 * Функция генерации случайного напрвления для точки маршрута
 * @returns - строка с названием направления
 */
const getRandomDestination = () => {
  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);

  return DESTINATIONS[randomIndex];
};
/**
 * Функция геренации данных точки маррута
 * @returns - объект с данными о точки маршрута
 */
export const generateTripPoint = () => {
  return {
    type: getRandomPointType(),
    destination: getRandomDestination(),
    dateTimeStart: null,
    dateTimeEnd: null,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    offers: null,
    destinationDetails: null,
    photos: null,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
