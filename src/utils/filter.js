import {FilterType} from '../const.js';
import dayjs from 'dayjs';

const getPastPoints = (points) => {
  const pastPoints =  points.filter((point) =>  {
    return dayjs().isBefore(dayjs(point.dateTimeEnd)) && dayjs().isAfter(dayjs(point.dateTimeStart)) || dayjs().isAfter(dayjs(point.dateTimeEnd));
  });
  return pastPoints;
};
const getFuturePoints = (points) => {
  const futurePoints = points.filter((point) =>  {
    return dayjs().isBefore(dayjs(point.dateTimeEnd)) && dayjs().isAfter(dayjs(point.dateTimeStart)) || !dayjs().isAfter(dayjs(point.dateTimeStart));
  });
  return futurePoints;
};

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => getPastPoints(points),
  [FilterType.FUTURE]: (points) => getFuturePoints(points),
};
