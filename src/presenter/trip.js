
import Sorting from '../view/sorting.js';
import TripRoute from '../view/trip-route.js';
import TripEmpty from '../view/trip-empty.js';
import {RenderPosition} from '../const.js';
import TripInfo from '../view/trip-info.js';
import {generateTripInfo} from '../mock/trip-info.js';
import {render} from '../utils/render.js';
import Menu from '../view/menu.js';
import Filters from '../view/filters.js';
import PointPresenter from './point.js';
import {updateItem} from '../utils/common.js';


export default class Trip {
  constructor(tripContainer, headerContainer) {
    this._tripContainer = tripContainer;
    this._headerContainer = headerContainer;
    this._pointPresenter = {};

    this._sortingComponent = new Sorting();
    this._tripRouteComponent = new TripRoute();
    this._tripEmptyComponent = new TripEmpty();
    this._tripInfoComponent = new TripInfo(generateTripInfo());
    this._filterComponent = new Filters();
    this._menuComponent = new Menu();

    this._handlePointChange = this._handlePointChange.bind(this);

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

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderSort() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderTripInformation() {
    render(this._tripMainContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(listContainer, point) {
    const pointPresenter = new PointPresenter(listContainer);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
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

  _clearPointList() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }
}
