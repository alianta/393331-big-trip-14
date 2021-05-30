import StatisticsView from '../view/statistics.js';
import {render, remove} from '../utils/render.js';
import {RenderPosition} from '../const.js';

export default class Statistics {
  constructor(statisticContainer, points) {
    this._statisticContainer = statisticContainer;
    this._statisticComponent = null;
    this._pointsData = points;
  }

  init() {
    if (this._statisticComponent !== null) {
      return;
    }
    this._data = this._pointsData.getPoints();
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
