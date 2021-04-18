import {generateTripPoint} from './mock/trip-point.js';
import Trip from './presenter/trip.js';

const POINT_COUNT = 20;
const tripRoute = new Array(POINT_COUNT).fill().map(generateTripPoint);
const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');


const tripPresener = new Trip(tripEventsElement,siteHeaderElement);
tripPresener.init(tripRoute);
