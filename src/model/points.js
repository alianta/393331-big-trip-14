import Observer from '../utils/observer.js';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    console.log('update=');
    console.log(update);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        dateTimeStart: point.date_from !== null ? new Date(point.date_from) : point.date_from,
        dateTimeEnd: point.adaptedPoint !== null ? new Date(point.date_to) : point.date_to,
        price: point.base_price,
        isFavorite: point.is_favorite,
        offers: point.offers.map((item) => ({name: item.title, price: item.price})),
        destinationDetails: {
          description: point.destination.description,
          photos: point.destination.pictures.map((item) => item.src),
        },
        destination: point.destination.name,
      },
    );

    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'date_from': point.dateTimeStart instanceof Date ? point.dateTimeStart.toISOString() : null,
        'date_to': point.dateTimeEnd instanceof Date ? point.dateTimeEnd.toISOString() : null,
        'base_price': point.price,
        'is_favorite': point.isFavorite,
        'offers': point.offers.map((item) => ({title: item.name, price: item.price})),
        'destination': {
          'description': point.destinationDetails.description,
          'name': point.destination,
          'pictures': point.destinationDetails.photos.map((item) => ({'src': item, 'description': ''})),
        },
      },
    );

    delete adaptedPoint.dateTimeStart;
    delete adaptedPoint.dateTimeEnd;
    delete adaptedPoint.price;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.destinationDetails;

    return adaptedPoint;
  }
}
