import {OFFER_LIST} from '../const.js';
/**
 * Функция создания разметки дополнительный опций маршрута
 * @param {array} currentOffers - массив объектов, поедставляющий собой выбранные дополнительные опции маршрута
 * @returns - строка, содержащая разметку дополнительных опций маршрута
 */
export const createTripRouteOfferTemplate = (currentOffers) => {
  return OFFER_LIST.map((offer) => {
    const isChecked = (currentOffers.find((currentOffer) => currentOffer.name === offer.name))? 'checked':'';
    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" ${isChecked}>
    <label class="event__offer-label" for="event-offer-${offer.type}-1">
      <span class="event__offer-title">${offer.name}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  }).join('');
};
