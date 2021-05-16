
import Sorting from '../view/sorting.js';
import TripRoute from '../view/trip-route.js';
import TripEmpty from '../view/trip-empty.js';
import {RenderPosition, SortType, UpdateType, UserAction} from '../const.js';
import TripInfo from '../view/trip-info.js';
import {generateTripInfo} from '../mock/trip-info.js';
import {render, remove} from '../utils/render.js';
import Menu from '../view/menu.js';
import PointPresenter from './point.js';
import {sortTime, sortPrice} from '../utils/trip.js';
import {filter} from '../utils/filter.js';

export default class Trip {
  constructor(tripContainer, headerContainer, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._headerContainer = headerContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortingComponent = new Sorting();
    this._tripRouteComponent = new TripRoute();
    this._tripEmptyComponent = new TripEmpty();
    this._tripInfoComponent = new TripInfo(generateTripInfo());
    this._menuComponent = new Menu();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._navigationContainer = this._headerContainer.querySelector('.trip-controls__navigation');
    this._tripMainContainer = headerContainer.querySelector('.trip-main');

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._navigationContainer, this._menuComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredPoints.sort(sortTime);
      case SortType.PRICE:
        return filtredPoints.sort(sortPrice);
    }
    return filtredPoints;
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
      this._currentSortType = SortType.DAY;
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
    this._renderPoints(this._getPoints());
  }
}
