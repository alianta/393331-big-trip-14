import {FilterType} from '../const.js';
import dayjs from 'dayjs';

const getPastPoints = (points) => {
  const pastPoints = points.filter((point) =>  dayjs().isAfter(dayjs(point.dateTimeEnd)));
  const futureAndPastPoints = points.filter((point) =>  {return dayjs().isBefore(dayjs(point.dateTimeEnd)) && dayjs().isAfter(dayjs(point.dateTimeStart)); });
  return pastPoints.concat(futureAndPastPoints);
};
const getFuturePoints = (points) => {
  const futurePoints = points.filter((point) =>  !dayjs().isAfter(dayjs(point.dateTimeStart)));
  const futureAndPastPoints = points.filter((point) =>  {return dayjs().isBefore(dayjs(point.dateTimeEnd)) && dayjs().isAfter(dayjs(point.dateTimeStart)); });
  return futurePoints.concat(futureAndPastPoints);
};

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => getPastPoints(points),
  [FilterType.FUTURE]: (points) => getFuturePoints(points),
};
