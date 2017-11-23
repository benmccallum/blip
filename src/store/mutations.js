import { CancelToken } from 'axios';

export const mutations = {
  clearPlaces (state) {
    state.places = null;
  },
  emptyPlaces (state) {
    state.places = [];
  },
  addPlace (state, place) {
    var alreadyAdded = state.places ? state.places.some(p => p.id === place.id) : false;
    if (alreadyAdded) {
      console.error('wtf why is this repeated!!!');
      return;
    }
    state.places ? state.places.push(place) : (state.places = [place]);
  },
  clearPlace (state) {
    state.place = null;
  },
  setPlace (state, place) {
    state.place = place;
  },
  setSecurityTlsResult (state, payload) {
    if (payload.error) {
      payload.place.security.state = 'errored';
    } else {
      payload.place.security.tlsScanId = payload.tlsScanId;
      payload.place.security.tlsLevel = payload.tlsLevel;
      payload.place.security.state = 'scored';
      // TODO: If needed then: recalcAvg(place);
    }
  },
  resetCancelToken (state) {
    // Cancel any pending HTTP requests
    if (state.cancelTokenSource != null) {
      state.cancelTokenSource.cancel('Cancelled on user page transition / form reset.');
    }
    // Re-assign a new one for next time
    state.cancelTokenSource = CancelToken.source();
  },
  recalcAvg (state, place) {
    let sum = 0;
    let divisor = 0;

    if (place.isSiteDown) {
      place.avg = -1;
      return;
    }

    // If a test completes or errors it's considered 'completed'
    // Error tests give a score of 0 and are included in the average so that:
    //  - The place gets an avg and enters the completed search results rows.
    //  - A failed test could be for a number of reasons (network, API down, etc.)
    //    but most likely would be failure for the website to be tested so should
    //    reflect negatively in their avg

    const endStates = ['scored', 'errored'];

    if (endStates.includes(place.isHtml5.state)) {
      sum += (place.isHtml5.score ? 100 : 0);
      divisor++;
    }

    if (endStates.includes(place.security.state)) {
      sum += place.security.score || 0;
      divisor++;
    }

    if (endStates.includes(place.desktop.state)) {
      sum += place.desktop.speedScore || 0;
      divisor++;
    }

    if (endStates.includes(place.mobile.state)) {
      sum += place.mobile.speedScore || 0;
      divisor++;
      sum += place.mobile.usabilityScore || 0;
      divisor++;
    }

    // If all tests 'ended/completed' then a place gets an avg and
    // can move into the filtered/completed results listing.
    if (divisor === 5) {
      place.avg = sum / divisor;
    }
  }
};
