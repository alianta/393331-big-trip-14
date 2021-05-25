export const createTripRouteDestinationTemplate = (destinationDetails) => {
  if (destinationDetails === null){
    return '';
  }

  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destinationDetails.description}</p>
  <div class="event__photos-container">
  <div class="event__photos-tape">
    ${destinationDetails.photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join('')}
  </div>
</div>
</section>`;
};
