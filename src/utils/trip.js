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
  return TYPES[randomIndex].name;
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
  const durationPointA = dayjs.duration(dayjs(pointA.dateTimeEnd).diff(dayjs(pointA.dateTimeStart)));
  const durationPointB = dayjs.duration(dayjs(pointB.dateTimeEnd).diff(dayjs(pointB.dateTimeStart)));
  return durationPointB.asMinutes() - durationPointA.asMinutes();
};

export const sortDay = (pointA, pointB) => {
  const res = dayjs(pointB.dateTimeStart) - dayjs(pointA.dateTimeStart);
  return res;
};

export const sortPrice = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

const countTimeSpendByType = (points, type) => {
  const pointsByType = points.filter((point) => point.type === type);
  if(pointsByType.length !== 0){
    return pointsByType.reduce((prev, curr) => {return prev + dayjs.duration(dayjs(curr.dateTimeEnd).diff(dayjs(curr.dateTimeStart))).asMinutes();}, 0);
  }
  return dayjs.duration(0, 'minutes').asMinutes();
};

const countTransportByType = (points, type) => {
  const transportByType = points.filter((point) => point.type === type);
  return transportByType.length;
};

export const countTimeSpendByTypes = (points) => {
  const times = TYPES.map((element) => {
    return {
      time: countTimeSpendByType(points,element.name.toLowerCase()),
      name: element.name.toUpperCase(),
    };
  }).sort((elementA, elementB) => elementB.time - elementA.time);
  return times;
};

export const countPointsMoneyByTypes = (points) => {
  const prices = TYPES.map((element) => {
    return {
      price: Math.round(Math.abs(countTimeSpendByType(points,element.name.toLowerCase()))),
      name: element.name.toUpperCase(),
    };
  }).sort(sortPrice);
  return prices;
};

export const countTransportByTypes = (points) => {
  const transport = TYPES.map((element) => {
    return {
      count: countTransportByType(points,element.name.toLowerCase()),
      name: element.name.toUpperCase(),
    };
  }).sort((elementA, elementB) => elementB.count - elementA.count);
  return transport;
};
