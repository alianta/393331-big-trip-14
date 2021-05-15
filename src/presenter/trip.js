
import Sorting from '../view/sorting.js';
import TripRoute from '../view/trip-route.js';
import TripEmpty from '../view/trip-empty.js';
import {RenderPosition, SortTypes, UpdateType, UserAction} from '../const.js';
import TripInfo from '../view/trip-info.js';
import {generateTripInfo} from '../mock/trip-info.js';
import {render, remove} from '../utils/render.js';
import Menu from '../view/menu.js';
import Filters from '../view/filters.js';
import PointPresenter from './point.js';
import {sortTime, sortPrice} from '../utils/trip.js';


export default class Trip {
  constructor(tripContainer, headerContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripContainer = tripContainer;
    this._headerContainer = headerContainer;
    this._pointPresenter = {};
    this._currentSortType = SortTypes.DAY;

    this._sortingComponent = new Sorting();
    this._tripRouteComponent = new TripRoute();
    this._tripEmptyComponent = new TripEmpty();
    this._tripInfoComponent = new TripInfo(generateTripInfo());
    this._filterComponent = new Filters();
    this._menuComponent = new Menu();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filterContainer = this._headerContainer.querySelector('.trip-controls__filters');
    this._navigationContainer = this._headerContainer.querySelector('.trip-controls__navigation');
    this._tripMainContainer = headerContainer.querySelector('.trip-main');

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._navigationContainer, this._menuComponent, RenderPosition.BEFOREEND);
    render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortTypes.TIME:
        return this._pointsModel.getPoints().slice().sort(sortTime);
      case SortTypes.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPrice);
    }
    return this._pointsModel.getPoints();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderPoints(this._getPoints());
  }

  _renderSort() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearTrip({resetSortType = false} = {}) {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._tripEmptyComponent);

    if (resetSortType) {
      this._currentSortType = SortTypes.DAY;
    }
  }

  _renderTripInformation() {
    render(this._tripMainContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(listContainer, point) {
    const pointPresenter = new PointPresenter(listContainer, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(this._tripRouteComponent, point));
  }

  _renderEmptyTrip() {
    render(this._tripContainer, this._tripEmptyComponent, RenderPosition.BEFOREEND);
  }

  _renderTripRouteBlock() {
    render(this._tripContainer, this._tripRouteComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if(this._getPoints().length === 0) {
      this._renderEmptyTrip();
      return;
    }

    this._renderTripInformation();
    this._renderSort();
    this._renderTripRouteBlock();
    this._renderPoints(this._pointsModel.getPoints());
  }
}
