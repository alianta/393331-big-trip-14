import dayjs from 'dayjs';
import {RANDOM_MIN_DAY, RANDOM_MAX_DAY, RANDOM_MIN_TIME, RANDOM_MAX_TIME} from '../const.js';
/**
 * Функция из интернета по генерации случайного числа из диапазона
 * Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
 * @param {Integer} a - начало диапазона
 * @param {Integer} b -конец диапазона
 * @returns - случайное чило из диапазона от a до b
 */
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

/**
 * Функция генерация случайной даты со временем
 * @returns - случайная дата и время
 */
export const getRandomDayAndTime = () => {
  const randomDate = getRandomInteger(RANDOM_MIN_DAY, RANDOM_MAX_DAY);
  const randomTime = getRandomInteger(RANDOM_MIN_TIME, RANDOM_MAX_TIME);
  return dayjs().add(randomDate, 'day').add(randomTime, 'minute').toDate();
};

/*export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};*/
