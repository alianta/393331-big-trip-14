import {getRandomInteger} from '../utils.js';
import {OFFER_NAMES, MIN_PRICE, MAX_PRICE} from '../const.js';
import {getRandomPointType} from './trip-point.js';

/**
 * Функция генерация случайного названия опции точки маршрута
 * @returns - случайная дата и время
 */
const getRandomOfferName = () => {
  const randomIndex = getRandomInteger(0, OFFER_NAMES.length - 1);
  return OFFER_NAMES[randomIndex];
};
/**
 * Функция гереации дополнительно опции точки маршрута
 * @returns - объект с данными о дополнительной опции
 */
export const generateOffer = () => {
  return {
    type: getRandomPointType(),
    name: getRandomOfferName(),
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
  };
};
