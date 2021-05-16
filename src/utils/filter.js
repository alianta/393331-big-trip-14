import {FilterType} from '../const.js';
import dayjs from 'dayjs';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) =>  dayjs().isAfter(dayjs(point.dateTimeStart))),
  [FilterType.FUTURE]: (points) => points.filter((point) =>  !dayjs().isAfter(dayjs(point.dateTimeStart))),
};
