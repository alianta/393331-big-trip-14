import {createMenuTemplate} from './view/menu.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortingTemplate} from './view/sorting.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createCostTemplate} from './view/cost.js';
import {createTripRouteTemplate} from './view/trip-route.js';
import {createTripRoutePointElement} from './view/trip-route-point.js';
import {createTripRouteEditPointTemplate} from './view/trip-route-edit-point.js';
import {createTripRouteAddPointTemplate} from './view/trip-route-add-point.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripMainElement, createTripInfoTemplate(), 'afterbegin');

const tripInfoElement = tripMainElement.querySelector('.trip-info');

render(tripInfoElement, createCostTemplate(), 'beforeend');
render(siteNavigationElement, createMenuTemplate(), 'beforeend');
render(siteFiltersElement, createFiltersTemplate(), 'beforeend');
render(tripEventsElement, createSortingTemplate(), 'beforeend');
render(tripEventsElement, createTripRouteTemplate(), 'beforeend');

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

render(tripEventsListElement, createTripRouteEditPointTemplate(), 'beforeend');
render(tripEventsListElement, createTripRouteAddPointTemplate(), 'beforeend');

render(tripEventsListElement, createTripRoutePointElement(), 'beforeend');
render(tripEventsListElement, createTripRoutePointElement(), 'beforeend');
render(tripEventsListElement, createTripRoutePointElement(), 'beforeend');
