import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterPresenter from './presenter/filter.js';
import FilterModel from './model/filter.js';
import newPointView from './view/new-point-button.js';
import {RenderPosition, UpdateType} from './const.js';
import {render} from './utils/render.js';
import {MenuItem} from './const.js';
import MenuView from './view/menu.js';
import StatisticPresenter from './presenter/statistics.js';
import Api from './api.js';
import DestinationsModel from './model/destinations.js';
import OffersModel from './model/offers.js';

const AUTHORIZATION = 'Basic 13579zaqwsx24680';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip/';

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
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
const tripPresener = new TripPresenter(tripEventsElement, siteHeaderElement, pointsModel, filterModel, destinationsModel, offersModel, api);
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

api.getOffers()
  .then((offers) => {
    offersModel.setOffers(offers);
    return api.getDestinations();
  })
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
    return api.getPoints();
  })
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });
