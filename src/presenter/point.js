import TripRoutePoint from '../view/trip-route-point.js';
import TripRouteEditPoint from '../view/trip-route-edit-point.js';
import {render, replace} from '../utils/render.js';
import {RenderPosition} from '../const.js';

export default class Point {
  constructor(container) {
    this._listContainer = container;
    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }
  init(point) {
    this._point = point;

    this._pointComponent = new TripRoutePoint(point);
    this._pointEditComponent = new TripRouteEditPoint(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setEditClickHandler(this._handleFormSubmit);

    render(this._listContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }
  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }
  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }
}
