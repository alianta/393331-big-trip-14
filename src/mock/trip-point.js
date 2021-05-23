import {MIN_PRICE, MAX_PRICE, MIN_OFFER_COUNT, MAX_OFFER_COUNT, MIN_COUNT_PHOTOS, MAX_COUNT_PHOTOS} from '../const.js';
import {getRandomPointType, getRandomDestination, getRandomDestinationDescription, generatePhoto} from '../utils/trip.js';
import {getRandomDayAndTime, getRandomInteger} from '../utils/common.js';
import {generateOffer} from './offer.js';
import {nanoid} from 'nanoid';

/**
 * Функция геренации данных точки маррута
 * @returns - объект с данными о точки маршрута
 */
export const generateTripPoint = () => {
  const dateTimeStart = getRandomDayAndTime();
  const dateTimeEnd = getRandomDayAndTime(dateTimeStart);
  return {
    id: nanoid(),
    type: getRandomPointType(),
    destination: getRandomDestination(),
    dateTimeStart: dateTimeStart,
    dateTimeEnd: dateTimeEnd,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    offers:new Array(getRandomInteger(MIN_OFFER_COUNT, MAX_OFFER_COUNT)).fill().map(generateOffer),
    destinationDetails: {
      description: getRandomDestinationDescription(),
      photos: new Array(getRandomInteger(MIN_COUNT_PHOTOS, MAX_COUNT_PHOTOS)).fill().map(generatePhoto),
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
