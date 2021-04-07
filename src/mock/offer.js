import {getRandomInteger} from '../utils.js';
import {OFFER_LIST} from '../const.js';

/**
 * Функция генерация случайного названия опции точки маршрута
 * @returns - случайная дата и время
 */
const getRandomOffer = () => {
  const randomIndex = getRandomInteger(0, OFFER_LIST.length - 1);
  return OFFER_LIST[randomIndex];
};
/**
 * Функция гереации дополнительно опции точки маршрута
 * @returns - объект с данными о дополнительной опции
 */
export const generateOffer = () => {
  const offer = getRandomOffer();
  return {
    type: offer.type,
    name: offer.name,
    price: offer.price,
  };
};
