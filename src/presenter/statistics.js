import StatisticsView from '../view/statistics.js';
import {render, remove} from '../utils/render.js';
import {RenderPosition} from '../const.js';

export default class Statistics {
  constructor(statisticContainer, data) {
    this._statisticContainer = statisticContainer;
    this._data = data;
    this._statisticComponent = null;
  }

  init() {
    if (this._statisticComponent !== null) {
      return;
    }
    this._statisticComponent = new StatisticsView(this._data);
    render(this._statisticContainer, this._statisticComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }
    remove(this._statisticComponent);
    this._statisticComponent = null;
  }
}
