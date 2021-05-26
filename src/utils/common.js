import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
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
export const getRandomDayAndTime = (startDate = null) => {
  const randomDate = getRandomInteger(RANDOM_MIN_DAY, RANDOM_MAX_DAY);
  const randomTime = getRandomInteger(RANDOM_MIN_TIME, RANDOM_MAX_TIME);
  if(startDate === null) {
    return dayjs().add(randomDate, 'day').add(randomTime, 'minute').toDate();
  }
  return dayjs(startDate).add(randomDate, 'day').add(randomTime, 'minute').toDate();
};

export const isPointsEqual = (pointA, pointB) => {

  if(pointA.type !== pointB.type) {
    return false;
  }
  if(pointA.destination !== pointB.destination) {
    return false;
  }
  if(pointA.dateTimeStart !== pointB.dateTimeStart) {
    return false;
  }
  if(pointA.dateTimeEnd !== pointB.dateTimeEnd) {
    return false;
  }
  if(pointA.price !== pointB.price) {
    return false;
  }

  if(!arrayEqual(pointA.offers, pointB.offers)) {
    return false;
  }
  return true;
};

export const arrayEqual = (arrayA, arrayB) => {
  if(arrayA.length !== arrayB.length)
    return false;

  for(let i = 0; i < arrayA.length; i++)
    if(arrayA[i] !== arrayB[i])
      return false;

  return true;
};

export const durationFormat = (duration) => {
  const durationDaysTemplate = dayjs.duration(duration, 'minutes').days() === 0 ? '' : dayjs.duration(duration, 'minutes').days() + 'D ';
  const durationHoursTemplate = (dayjs.duration(duration, 'minutes').hours() === 0 && durationDaysTemplate === '') ? '' : dayjs.duration(duration, 'minutes').format('HH') + 'H ';
  const durationMinutesTemplate = dayjs.duration(duration, 'minutes').format('mm') + 'M';
  return durationDaysTemplate + durationHoursTemplate + durationMinutesTemplate;
};

export const getDuration = (dateTimeStart, dateTimeEnd) => {
  const duration = dayjs.duration(dayjs(dateTimeEnd).diff(dayjs(dateTimeStart)));
  const durationDaysTemplate = (duration.days()==0) ? '' : duration.format('DD') + 'D ';
  const durationHoursTemplate = (duration.hours()==0 && durationDaysTemplate==='') ? '' : duration.format('HH') + 'H ';
  const durationMinutesTemplate = duration.format('mm') + 'M';
  return durationDaysTemplate + durationHoursTemplate + durationMinutesTemplate;
};
