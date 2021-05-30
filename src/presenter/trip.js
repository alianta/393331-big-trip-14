import SortView from '../view/sorting.js';
import TripRoute from '../view/trip-route.js';
import TripEmpty from '../view/trip-empty.js';
import {RenderPosition, SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {render, remove} from '../utils/render.js';
import PointPresenter, {State as PointPresenterViewState} from './point.js';
import {sortTime, sortPrice, sortDay} from '../utils/trip.js';
import {filter} from '../utils/filter.js';
import PointNewPresenter from './point-new.js';
import LoadingView from '../view/loading.js';

export default class Trip {
  constructor(tripContainer, headerContainer, points, filter, destinations, offers, api) {
    this._pointsData = points;
    this._filterData = filter;
    this._tripContainer = tripContainer;
    this._headerContainer = headerContainer;
    this._point = {};
    this._currentSortType = SortType.DAY;
    this._isLoading = true;
    this._destinationsData = destinations;
    this._offersData = offers;
    this._api = api;

    this._tripRouteComponent = new TripRoute();
    this._tripEmptyComponent = new TripEmpty();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._tripMainContainer = headerContainer.querySelector('.trip-main');

    this._pointNew = new PointNewPresenter(this._tripRouteComponent, this._handleViewAction);
  }

  init() {
    this._pointsData.addObserver(this._handleModelEvent);
    this._filterData.addObserver(this._handleModelEvent);
    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._tripRouteComponent);

    this._pointsData.removeObserver(this._handleModelEvent);
    this._filterData.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._currentSortType = SortType.DAY;
    this._filterData.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNew.init(this._destinationsData.getDestinations(), this._offersData.getOffers(), callback);
  }

  _getPoints() {
    const filterType = this._filterData.getFilter();
    const points = this._pointsData.getPoints();
    const filtredPoints = filter[filterType](points).slice();

    switch (this._currentSortType) {
      case SortType.DAY:
        return filtredPoints.sort(sortDay);
      case SortType.TIME:
        return filtredPoints.sort(sortTime);
      case SortType.PRICE:
        return filtredPoints.sort(sortPrice);
    }
    return filtredPoints;
  }

  _handleModeChange() {
    this._pointNew.destroy();
    Object
      .values(this._point)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._point[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsData.updatePoint(updateType, response);
          })
          .catch(() => {
            this._point[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNew.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsData.addPoint(updateType, response);
          })
          .catch(() => {
            this._pointNew.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._point[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsData.deletePoint(updateType, update);
          })
          .catch(() => {
            this._point[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._point[data.id].init(data, this._destinationsData.getDestinations(), this._offersData.getOffers());
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
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
    this._renderSort();
    this._renderPoints(this._getPoints());
  }

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }
    this._sortingComponent = new SortView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortingComponent, RenderPosition.AFTERBEGIN);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNew.destroy();

    Object
      .values(this._point)
      .forEach((presenter) => presenter.destroy());
    this._point = {};

    remove(this._tripEmptyComponent);
    remove(this._sortingComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderPoint(listContainer, point) {
    const renderPoint = new PointPresenter(listContainer, this._handleViewAction, this._handleModeChange);
    renderPoint.init(point, this._destinationsData.getDestinations(), this._offersData.getOffers());
    this._point[point.id] = renderPoint;
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
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if(this._getPoints().length === 0) {
      this._renderEmptyTrip();
      return;
    }

    this._renderSort();
    this._renderTripRouteBlock();
    this._renderPoints(this._getPoints());
  }
}
