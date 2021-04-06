import dayjs from 'dayjs';
import {DESTINATIONS, TYPES, MIN_PRICE, MAX_PRICE, DESTINATION_DESCRIPTIONS, RANDOM_MIN_DAY, RANDOM_MAX_DAY, RANDOM_MIN_TIME, RANDOM_MAX_TIME} from '../const.js';
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
 * Функция генерации случайного описания о месте назначения точки маршрута
 * @returns  - строка с описанием места назначения
 */
const getRandomDestinationDescription = () => {
  const randomIndex = getRandomInteger(0, DESTINATION_DESCRIPTIONS.length - 1);
  return DESTINATION_DESCRIPTIONS[randomIndex];
};

/**
 * Функция генерация случайной даты со временем
 * @returns - случайная дата и время
 */
const getRandomDayAndTime = () => {
  const randomDate = getRandomInteger(RANDOM_MIN_DAY, RANDOM_MAX_DAY);
  const randomTime = getRandomInteger(RANDOM_MIN_TIME, RANDOM_MAX_TIME);
  return dayjs().add(randomDate, 'day').add(randomTime, 'minute').toDate();
};
/**
 * Функция геренации данных точки маррута
 * @returns - объект с данными о точки маршрута
 */
export const generateTripPoint = () => {
  return {
    type: getRandomPointType(),
    destination: getRandomDestination(),
    dateTimeStart: getRandomDayAndTime(),
    dateTimeEnd: getRandomDayAndTime(),
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    offers: null,
    destinationDetails: {
      description: getRandomDestinationDescription(),
      photos: null,
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
