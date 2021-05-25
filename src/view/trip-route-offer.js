const createTripRouteOfferTemplateList = (currentOffers, offersList, currentType) => {
  currentType = currentType.toLowerCase();
  const offerIndex = offersList.map((offer) => (offer.name)).indexOf(currentType);

  if(offersList[offerIndex].offers.length === 0) {
    return '';
  }
  return offersList[offerIndex].offers.map((offer) => {
    const isChecked = (currentOffers.find((currentOffer) => currentOffer.name === offer.text))? 'checked':'';
    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" ${isChecked}>
    <label class="event__offer-label" for="event-offer-${offer.type}-1">
      <span class="event__offer-title">${offer.text}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  }).join('');
};
/**
 * Функция создания разметки дополнительный опций маршрута
 * @param {array} currentOffers - массив объектов, поедставляющий собой выбранные дополнительные опции маршрута
 * @returns - строка, содержащая разметку дополнительных опций маршрута
 */
export const createTripRouteOfferTemplate = (currentOffers, offersList, currentType) => {
  const templateList = createTripRouteOfferTemplateList(currentOffers, offersList, currentType);
  if(templateList === '') {
    return '';
  }
  return `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${templateList}
          </div>
        </section>`;
};
