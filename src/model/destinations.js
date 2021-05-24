import Observer from '../utils/observer.js';

export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  getDestinations() {
    return this._destinations;
  }

  static adaptToClient(destination) {
    const adaptedDestination = Object.assign(
      {},
      destination,
      {
        destinationDetails: {
          description: destination.description,
          photos: destination.pictures.map((item) => item.src),
        },
      },
    );

    delete adaptedDestination.description;
    delete adaptedDestination.pictures;

    return adaptedDestination;
  }
}
