import Menu from './view/menu.js';
import Filters from './view/filters.js';
import Sorting from './view/sorting.js';
import TripInfo from './view/trip-info.js';
import TripRoute from './view/trip-route.js';
import TripRoutePoint from './view/trip-route-point.js';
import TripRouteEditPoint from './view/trip-route-edit-point.js';
import {generateTripPoint} from './mock/trip-point.js';
import {generateTripInfo} from './mock/trip-info.js';
import {renderElement} from './utils.js';
import {RenderPosition} from './const.js';

const POINT_COUNT = 20;
const tripRoute = new Array(POINT_COUNT).fill().map(generateTripPoint);
const siteHeaderElement = document.querySelector('.page-header');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

renderElement(tripMainElement, new TripInfo().getElement(generateTripInfo()), RenderPosition.AFTERBEGIN);

renderElement(siteNavigationElement, new Menu().getElement(), RenderPosition.BEFOREEND);
renderElement(siteFiltersElement, new Filters().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new Sorting().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new TripRoute().getElement(), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

for(let i = 0; i < tripRoute.length; i++) {
  if(i === 0) {
    renderElement(tripEventsListElement, new TripRouteEditPoint().getElement(tripRoute[i]),  RenderPosition.BEFOREEND);
  } else {
    renderElement(tripEventsListElement, new TripRoutePoint().getElement(tripRoute[i]), RenderPosition.BEFOREEND);
  }
}
