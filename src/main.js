import {createMenuTemplate} from './view/menu.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortingTemplate} from './view/sorting.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripRouteTemplate} from './view/trip-route.js';
import {createTripRoutePointElement} from './view/trip-route-point.js';
import {createTripRouteEditPointTemplate} from './view/trip-route-edit-point.js';
import {generateTripPoint} from './mock/trip-point.js';
import {generateTripInfo} from './mock/trip-info.js';

const POINT_COUNT = 20;
const tripRoute = new Array(POINT_COUNT).fill().map(generateTripPoint);
const siteHeaderElement = document.querySelector('.page-header');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

/**
 * Функция для отрисовки (вставки в DOM) компонентов
 * @param {*} container - компонетен, в который необходимо вставть
 * @param {*} template -элемент, который необходимо вставить
 * @param {*} place - позицмя вставки (beforeBegin, afterBegin, beforeEnd, afterEnd)
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripMainElement, createTripInfoTemplate(generateTripInfo()), 'afterbegin');

render(siteNavigationElement, createMenuTemplate(), 'beforeend');
render(siteFiltersElement, createFiltersTemplate(), 'beforeend');
render(tripEventsElement, createSortingTemplate(), 'beforeend');
render(tripEventsElement, createTripRouteTemplate(), 'beforeend');

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

for(let i = 0; i < tripRoute.length; i++) {
  if(i === 0) {
    render(tripEventsListElement, createTripRouteEditPointTemplate(tripRoute[i]), 'beforeend');
  } else {
    render(tripEventsListElement, createTripRoutePointElement(tripRoute[i]), 'beforeend');
  }
}
