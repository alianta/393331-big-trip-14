import AbstractView from './abstract.js';

/**
 * Функция создания блока разметки для блока меню
 * @returns - строка, содержащая блок разметки для блока меню
 */
const createMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
</nav>`;
};

export default class Menu extends AbstractView{
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _setInactiveMenu() {
    const item = this.getElement().querySelector('.trip-tabs__btn--active');
    item.classList.remove('trip-tabs__btn--active');
  }
  _menuClickHandler(evt) {
    if(evt.target.classList.contains('trip-tabs__btn--active')) {
      return;
    }
    evt.preventDefault();
    this._setInactiveMenu();
    evt.target.classList.add('trip-tabs__btn--active');
    this._callback.menuClick(evt.target.text);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}
