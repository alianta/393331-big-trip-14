import {generateTripPoint} from './mock/trip-point.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterPresenter from './presenter/filter.js';
import FilterModel from './model/filter.js';
import newPointView from './view/new-point-button.js';
import {RenderPosition} from './const.js';
import {render} from './utils/render.js';
import {MenuItem} from './const.js';
import MenuView from './view/menu.js';
import StatisticPresenter from './presenter/statistics.js';

const POINT_COUNT = 20;
const tripRoute = new Array(POINT_COUNT).fill().map(generateTripPoint);
const pointsModel = new PointsModel();
pointsModel.setPoints(tripRoute);
const filterModel = new FilterModel();
const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const pageBodyElement = siteMainElement.querySelector('.page-body__container');

const navigationElement = document.querySelector('.trip-controls__navigation');
const menuComponent = new MenuView();
const newPointComponent = new newPointView();
render(tripMainElement, newPointComponent, RenderPosition.BEFOREEND);
render(navigationElement, menuComponent, RenderPosition.BEFOREEND);
const tripPresener = new TripPresenter(tripEventsElement,siteHeaderElement, pointsModel, filterModel);
const filterContainer = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);
filterPresenter.init();
tripPresener.init();
newPointComponent.setNewPointButtonClickHandler(()=>{tripPresener.createPoint();});
const statisticPresener = new StatisticPresenter(pageBodyElement, pointsModel.getPoints());

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      statisticPresener.destroy();
      tripPresener.init();
      break;
    case MenuItem.STATISTICS:
      tripPresener.destroy();
      statisticPresener.init();
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);
