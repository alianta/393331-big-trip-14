export const MIN_PRICE = 1;
export const MAX_PRICE = 20000;
export const RANDOM_MIN_DAY = -10;
export const RANDOM_MAX_DAY = 10;
export const RANDOM_MIN_TIME = -1000;
export const RANDOM_MAX_TIME = 1000;
export const MIN_OFFER_COUNT = 0;
export const MAX_OFFER_COUNT = 5;
export const MIN_COUNT_PHOTOS = 1;
export const MAX_COUNT_PHOTOS = 10;
export const MAX_NUMBER_PHOTO = 2000;
export const MIN_ROUTE_POINT_COUNT = 2;
export const MAX_ROUTE_POINT_COUNT = 5;
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
export const DESTINATION_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

export const OFFER_LIST = [
  {
    type: 'luggage',
    name: 'Add luggage',
    price: 10000,
  },
  {
    type: 'comfort',
    name: 'Switch to comfort',
    price: 1000,
  },
  {
    type: 'meal',
    name: 'Add meal',
    price: 5000,
  },
  {
    type: 'seats',
    name: 'Choose seats',
    price: 5,
  },
  {
    type: 'train',
    name: 'Travel by train',
    price: 40,
  },
];

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const SortTypes = {
  DAY: 'sort-day',
  EVENT: 'sort-event',
  TIME: 'sort-time',
  PRICE: 'sort-price',
  OFFER: 'sort-offer',
};
