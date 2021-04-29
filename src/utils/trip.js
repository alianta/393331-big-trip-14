import {getRandomInteger} from './common.js';
import {DESTINATIONS, TYPES, DESTINATION_DESCRIPTIONS, MAX_NUMBER_PHOTO} from '../const.js';
import dayjs from 'dayjs';
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

export const sortTime = (pointA, pointB) => {
  return dayjs(pointA.dateTimeEnd - pointA.dateTimeStart).diff(dayjs(pointB.dateTimeEnd - pointB.dateTimeStart));
};

export const sortPrice = (pointA, pointB) => {
  return pointA.price < pointB.price;
};
