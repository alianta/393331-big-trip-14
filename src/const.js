export const TYPES = [
  {
    name: 'Taxi',
    offerTypeNames: ['comfort', 'luggage', 'meal', 'seats', 'train'],
  },
  {
    name: 'Bus',
    offerTypeNames: ['comfort', 'meal', 'seats', 'train'],
  },
  {
    name: 'Train',
    offerTypeNames: ['comfort', 'luggage', 'train'],
  },
  {
    name: 'Ship',
    offerTypeNames: ['meal', 'seats'],
  },
  {
    name: 'Transport',
    offerTypeNames: ['comfort', 'seats', 'train'],
  },
  {
    name: 'Drive',
    offerTypeNames: ['luggage', 'seats'],
  },
  {
    name: 'Flight',
    offerTypeNames: ['meal', 'seats'],
  },
  {
    name: 'Check-in',
    offerTypeNames: ['comfort', 'luggage', 'meal'],
  },
  {
    name: 'Sightseeing',
    offerTypeNames: ['comfort', 'meal'],
  },
  {
    name: 'Restaurant',
    offerTypeNames: ['comfort', 'meal', 'seats'],
  },
];
export const DESTINATIONS = [
  'Amsterdam',
  'Geneva',
  'Chamonix',
];


export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const SortType = {
  DAY: 'sort-day',
  EVENT: 'sort-event',
  TIME: 'sort-time',
  PRICE: 'sort-price',
  OFFER: 'sort-offer',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  TABLE: 'Table',
  STATISTICS: 'Stats',
};
