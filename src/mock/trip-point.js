import {MIN_PRICE, MAX_PRICE, MIN_OFFER_COUNT, MAX_OFFER_COUNT, MIN_COUNT_PHOTOS, MAX_COUNT_PHOTOS} from '../const.js';
import {getRandomInteger, getRandomDayAndTime, getRandomDestination, getRandomPointType, getRandomDestinationDescription, generatePhoto} from '../utils.js';
import {generateOffer} from './offer.js';


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
