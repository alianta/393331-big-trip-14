import Menu from './view/menu.js';
import Filters from './view/filters.js';
import Sorting from './view/sorting.js';
import TripInfo from './view/trip-info.js';
import TripRoute from './view/trip-route.js';
import TripRoutePoint from './view/trip-route-point.js';
import TripRouteEditPoint from './view/trip-route-edit-point.js';
import {generateTripPoint} from './mock/trip-point.js';
import {generateTripInfo} from './mock/trip-info.js';
import {render} from './utils.js';
import {RenderPosition} from './const.js';

const POINT_COUNT = 20;
const tripRoute = new Array(POINT_COUNT).fill().map(generateTripPoint);
const siteHeaderElement = document.querySelector('.page-header');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const renderPoint = (tripRouteList,point) => {
  const routePoint = new TripRoutePoint(point);
  const routeEditPoint = new TripRouteEditPoint(point);

  const openEditPointForm = () => {
    tripRouteList.replaceChild(routeEditPoint.getElement(), routePoint.getElement());
  };

  const closeEditPointForm = () => {
    tripRouteList.replaceChild(routePoint.getElement(), routeEditPoint.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closeEditPointForm();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  routePoint.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    openEditPointForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  routeEditPoint.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    closeEditPointForm();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(tripRouteList, routePoint.getElement(), RenderPosition.BEFOREEND);
};

render(tripMainElement, new TripInfo(generateTripInfo()).getElement(), RenderPosition.AFTERBEGIN);

render(siteNavigationElement, new Menu().getElement(), RenderPosition.BEFOREEND);
render(siteFiltersElement, new Filters().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new Sorting().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new TripRoute().getElement(), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

for(let i = 0; i < tripRoute.length; i++) {
  renderPoint(tripEventsListElement, tripRoute[i]);
}
