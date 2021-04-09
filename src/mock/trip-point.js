import {TYPES, MIN_PRICE, MAX_PRICE, DESTINATION_DESCRIPTIONS, MIN_OFFER_COUNT, MAX_OFFER_COUNT, MIN_COUNT_PHOTOS, MAX_COUNT_PHOTOS, MAX_NUMBER_PHOTO} from '../const.js';
import {getRandomInteger, getRandomDayAndTime, getRandomDestination} from '../utils.js';
import {generateOffer} from './offer.js';

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
const getRandomDestinationDescription = () => {
  const randomIndex = getRandomInteger(0, DESTINATION_DESCRIPTIONS.length - 1);
  return DESTINATION_DESCRIPTIONS[randomIndex];
};


/**
 * Функция генерация адреса случайной фотографии
 * @returns - строка с адресом случайного фото
 */
const generatePhoto = () => {
  const randomIndex = getRandomInteger(0, MAX_NUMBER_PHOTO);
  return `http://picsum.photos/248/152?r=${randomIndex}`;
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
    offers:new Array(getRandomInteger(MIN_OFFER_COUNT, MAX_OFFER_COUNT)).fill().map(generateOffer),
    destinationDetails: {
      description: getRandomDestinationDescription(),
      photos: new Array(getRandomInteger(MIN_COUNT_PHOTOS, MAX_COUNT_PHOTOS)).fill().map(generatePhoto),
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
