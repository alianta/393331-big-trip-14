import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

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
  if(arrayA.length !== arrayB.length){
    return false;
  }

  for(let i = 0; i < arrayA.length; i++){
    if(arrayA[i] !== arrayB[i]) {
      return false;
    }
  }

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
  const durationDaysTemplate = (duration.days() === 0) ? '' : duration.format('DD') + 'D ';
  const durationHoursTemplate = (duration.hours() === 0 && durationDaysTemplate ==='') ? '' : duration.format('HH') + 'H ';
  const durationMinutesTemplate = duration.format('mm') + 'M';
  return durationDaysTemplate + durationHoursTemplate + durationMinutesTemplate;
};
