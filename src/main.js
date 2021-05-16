import {generateTripPoint} from './mock/trip-point.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterPresenter from './presenter/filter.js';
import FilterModel from './model/filter.js';

const POINT_COUNT = 20;
const tripRoute = new Array(POINT_COUNT).fill().map(generateTripPoint);
const pointsModel = new PointsModel();
pointsModel.setPoints(tripRoute);
const filterModel = new FilterModel();
const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const tripPresener = new TripPresenter(tripEventsElement,siteHeaderElement, pointsModel);
tripPresener.init();
const filterContainer = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);
filterPresenter.init();
