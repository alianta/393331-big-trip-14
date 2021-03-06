import TripRouteEditPoint from '../view/trip-route-edit-point.js';
import {render, remove} from '../utils/render.js';
import {RenderPosition} from '../const.js';
import {UserAction, UpdateType} from '../const.js';

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init(destinations, offers, callback) {
    this._destroyCallback = callback;
    this._offers = offers;
    this._destinations = destinations;
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new TripRouteEditPoint(this._offers, this._destinations, true);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setCancelClickHandler(this._handleCancelClick);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._handleEscKeyDown);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }
    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleFormSubmit(point) {
    if(point.price === '' || point.destination === '') {
      this.setAborting();
      return;
    }

    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  }

  _handleCancelClick() {
    this.destroy();
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }
}
