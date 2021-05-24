import Observer from '../utils/observer.js';

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  getOffers() {
    return this._offers;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  static adaptToClient(offer) {
    const adaptedOffer = Object.assign(
      {},
      offer,
      {
        name: offer.type,
        offers: offer.offers.map((item) => ({text: item.title, price: item.price})),
      },
    );

    delete adaptedOffer.type;

    return adaptedOffer;
  }
}
