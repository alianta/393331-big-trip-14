import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterPresenter from './presenter/filter.js';
import FilterModel from './model/filter.js';
import NewPointView from './view/new-point-button.js';
import {RenderPosition, UpdateType} from './const.js';
import {render} from './utils/render.js';
import {MenuItem} from './const.js';
import MenuView from './view/menu.js';
import StatisticPresenter from './presenter/statistics.js';
import Api from './api.js';
import DestinationsModel from './model/destinations.js';
import OffersModel from './model/offers.js';

const AUTHORIZATION = 'Basic 13579zaqwsx24680';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

const pointsData = new PointsModel();
const filterData = new FilterModel();
const destinationsData = new DestinationsModel();
const offersData = new OffersModel();
const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const pageBodyElement = siteMainElement.querySelector('.page-body__container');

const navigationElement = document.querySelector('.trip-controls__navigation');
const menuComponent = new MenuView();
const newPointComponent = new NewPointView();
const trip = new TripPresenter(tripEventsElement, siteHeaderElement, pointsData, filterData, destinationsData, offersData, api);
const filterContainer = document.querySelector('.trip-controls__filters');
const filter = new FilterPresenter(filterContainer, filterData, pointsData);
const statistic = new StatisticPresenter(pageBodyElement, pointsData);

const handlePointNewFormClose = () => {
  newPointComponent.getElement().disabled = false;
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      statistic.destroy();
      trip.init();
      break;
    case MenuItem.STATISTICS:
      trip.destroy();
      statistic.init();
      break;
  }
};

render(tripMainElement, newPointComponent, RenderPosition.BEFOREEND);
render(navigationElement, menuComponent, RenderPosition.BEFOREEND);

filter.init();
trip.init();
newPointComponent.setNewPointButtonClickHandler(()=>{trip.createPoint(handlePointNewFormClose);});

menuComponent.setMenuClickHandler(handleSiteMenuClick);

Promise.all([
  api.getOffers(),
  api.getDestinations(),
  api.getPoints(),
]).then((data) => {
  offersData.setOffers(data[0]);
  destinationsData.setDestinations(data[1]);
  pointsData.setPoints(UpdateType.INIT, data[2]);
}).catch(() => {
  pointsData.setPoints(UpdateType.INIT, []);
});
