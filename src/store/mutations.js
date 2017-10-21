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
  setIsHtml5 (state, payload) {
    payload.place.isHtml5 = payload.isHtml5;
  },
  setSecurityResult (state, payload) {
    payload.place.security = payload.result;
    recalcAvg(payload.place);
  },
  setDesktopResult (state, payload) {
    payload.place.desktop = payload.result;
    recalcAvg(payload.place);
  },
  setMobileResult (state, payload) {
    payload.place.mobile = payload.result;
    recalcAvg(payload.place);
  },
  resetCancelToken (state) {
    // Cancel any pending HTTP requests
    if (state.cancelTokenSource != null) {
      state.cancelTokenSource.cancel('Cancelled on user page transition / form reset.');
    }
    // Re-assign a new one for next time
    state.cancelTokenSource = CancelToken.source();
  }
};

function recalcAvg (place) {
  var sum = 0;
  var divisor = 0;

  if (place.isHtml5 != null) {
    sum += (place.isHtml5 ? 100 : 0);
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

  if (divisor === 0) return;

  if (divisor === 4) {
    place.isTestingComplete = true;
  }

  place.avg = sum / divisor;
}
