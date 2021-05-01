
import Sorting from '../view/sorting.js';
import TripRoute from '../view/trip-route.js';
import TripEmpty from '../view/trip-empty.js';
import {RenderPosition, SortTypes} from '../const.js';
import TripInfo from '../view/trip-info.js';
import {generateTripInfo} from '../mock/trip-info.js';
import {render} from '../utils/render.js';
import Menu from '../view/menu.js';
import Filters from '../view/filters.js';
import PointPresenter from './point.js';
import {updateItem} from '../utils/common.js';
import {sortTime, sortPrice} from '../utils/trip.js';


export default class Trip {
  constructor(tripContainer, headerContainer) {
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

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filterContainer = this._headerContainer.querySelector('.trip-controls__filters');
    this._navigationContainer = this._headerContainer.querySelector('.trip-controls__navigation');
    this._tripMainContainer = headerContainer.querySelector('.trip-main');
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._sourcedTripPoints = tripPoints.slice();
    render(this._navigationContainer, this._menuComponent, RenderPosition.BEFOREEND);
    render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _sortTripPointsAndSaveCurrentSortType(sortType) {
    switch (sortType) {
      case SortTypes.TIME:
        this._tripPoints.sort(sortTime);
        break;
      case SortTypes.PRICE:
        this._tripPoints.sort(sortPrice);
        break;
      default:
        this._tripPoints = this._sourcedTripPoints.slice();
    }

    this._currentSortType = sortType;
  }
  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTripPointsAndSaveCurrentSortType(sortType);
    this._clearPointList();
    this._renderPoints();
  }

  _renderSort() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripInformation() {
    render(this._tripMainContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(listContainer, point) {
    const pointPresenter = new PointPresenter(listContainer, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._tripPoints.forEach((point) => this._renderPoint(this._tripRouteComponent, point));
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
