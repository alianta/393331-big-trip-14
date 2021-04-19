
import Sorting from '../view/sorting.js';
import TripRoute from '../view/trip-route.js';
import TripEmpty from '../view/trip-empty.js';
import {RenderPosition} from '../const.js';
import TripInfo from '../view/trip-info.js';
import {generateTripInfo} from '../mock/trip-info.js';
import {render, replace} from '../utils/render.js';
import TripRoutePoint from '../view/trip-route-point.js';
import TripRouteEditPoint from '../view/trip-route-edit-point.js';
import Menu from '../view/menu.js';
import Filters from '../view/filters.js';
import PointPresenter from './point.js';

export default class Trip {
  constructor(tripContainer, headerContainer) {
    this._tripContainer = tripContainer;
    this._headerContainer = headerContainer;

    this._sortingComponent = new Sorting();
    this._tripRouteComponent = new TripRoute();
    this._tripEmptyComponent = new TripEmpty();
    this._tripInfoComponent = new TripInfo(generateTripInfo());
    this._filterComponent = new Filters();
    this._menuComponent = new Menu();
    this._filterContainer = this._headerContainer.querySelector('.trip-controls__filters');
    this._navigationContainer = this._headerContainer.querySelector('.trip-controls__navigation');
    this._tripMainContainer = headerContainer.querySelector('.trip-main');
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    render(this._navigationContainer, this._menuComponent, RenderPosition.BEFOREEND);
    render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderTripInformation() {
    render(this._tripMainContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(listContainer, point) {
   /* const routePoint = new TripRoutePoint(point);
    const routeEditPoint = new TripRouteEditPoint(point);
    const openEditPointForm = () => {
      replace(routeEditPoint, routePoint);
    };
    const closeEditPointForm = () => {
      replace(routePoint, routeEditPoint);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeEditPointForm();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    routePoint.setEditClickHandler(() => {
      openEditPointForm();
      document.addEventListener('keydown', onEscKeyDown);
    });
    routeEditPoint.setEditClickHandler(() => {
      closeEditPointForm();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    routeEditPoint.setFormSubmitHandler(() => {
      closeEditPointForm();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render(listContainer, routePoint, RenderPosition.BEFOREEND);*/

    const pointPresenter = new PointPresenter(listContainer);
    pointPresenter.init(point);
  }

  _renderPoints() {
    const tripEventsListElement = this._tripContainer.querySelector('.trip-events__list');
    this._tripPoints.forEach((point) => this._renderPoint(tripEventsListElement, point));
  }

  _renderEmptyTrip() {
    render(this._tripContainer, this._tripEmptyComponent, RenderPosition.BEFOREEND);
  }

  _renderTripRouteBlock() {
    render(this._tripContainer, this._tripRouteComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if(this._tripPoints.length === 0) {
      this._renderEmptyTrip();
      return;
    }

    this._renderTripInformation();
    this._renderSort();
    this._renderTripRouteBlock();
    this._renderPoints();
  }
}
