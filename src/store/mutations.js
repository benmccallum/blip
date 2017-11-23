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

    if (place.isHtml5.score != null) {
      sum += (place.isHtml5.score ? 100 : 0);
      divisor++;
    }

    if (place.security.score != null && place.security.score >= 0) {
      sum += place.security.score;
      divisor++;
    }

    if (place.desktop.speedScore != null && place.desktop.speedScore >= 0) {
      sum += place.desktop.speedScore;
      divisor++;
    }

    if (place.mobile.speedScore != null && place.mobile.speedScore >= 0) {
      sum += place.mobile.speedScore;
      divisor++;
    }

    if (place.mobile.usabilityScore != null && place.mobile.usabilityScore >= 0) {
      sum += place.mobile.usabilityScore;
      divisor++;
    }

    if (divisor === 5) {
      place.avg = sum / divisor;
    }
  }
};
