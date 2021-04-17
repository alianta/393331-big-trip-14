import {getRandomInteger, getRandomDayAndTime} from '../utils/common.js';
import {getRandomDestination} from '../utils/trip.js';
import {MIN_PRICE, MAX_PRICE, MIN_ROUTE_POINT_COUNT, MAX_ROUTE_POINT_COUNT} from '../const.js';
/**
 * Функция геренации данных c информацией и общей маршруте
 * @returns - объект с данными c информацией и общей маршруте
 */
export const generateTripInfo = () => {
  return {
    trip: new Array(getRandomInteger(MIN_ROUTE_POINT_COUNT, MAX_ROUTE_POINT_COUNT)).fill().map(getRandomDestination),
    dateTimeStart: getRandomDayAndTime(),
    dateTimeEnd: getRandomDayAndTime(),
    totalPrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
  };
};
