import {TYPES} from '../const.js';
import dayjs from 'dayjs';

export const sortTime = (pointA, pointB) => {
  const durationPointA = dayjs.duration(dayjs(pointA.dateTimeEnd).diff(dayjs(pointA.dateTimeStart)));
  const durationPointB = dayjs.duration(dayjs(pointB.dateTimeEnd).diff(dayjs(pointB.dateTimeStart)));
  return durationPointB.asMinutes() - durationPointA.asMinutes();
};

export const sortDay = (pointA, pointB) => {
  const res = pointA.dateTimeStart - pointB.dateTimeStart;
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

const countPriceByType = (points, type) => {
  const pointsByType = points.filter((point) => point.type === type);
  if(pointsByType.length !== 0){
    return pointsByType.reduce((prev, curr) => {return prev + curr.price;}, 0);
  }
  return 0;
};

export const countPriceByTypes = (points) => {
  const prices = TYPES.map((element) => {
    return {
      price: countPriceByType(points,element.name.toLowerCase()),
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
