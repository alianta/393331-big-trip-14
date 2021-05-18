import {generateTripPoint} from './mock/trip-point.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterPresenter from './presenter/filter.js';
import FilterModel from './model/filter.js';
import newPointView from './view/new-point-button.js';
import {RenderPosition} from './const.js';
import {render} from './utils/render.js';

const POINT_COUNT = 4;
const tripRoute = new Array(POINT_COUNT).fill().map(generateTripPoint);
const pointsModel = new PointsModel();
pointsModel.setPoints(tripRoute);
const filterModel = new FilterModel();
const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const newPointComponent = new newPointView();
render(tripMainElement, newPointComponent, RenderPosition.BEFOREEND);

const tripPresener = new TripPresenter(tripEventsElement,siteHeaderElement, pointsModel, filterModel);
tripPresener.init();
const filterContainer = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);
filterPresenter.init();

newPointComponent.setNewPointButtonClickHandler(()=>{tripPresener.createPoint();});
