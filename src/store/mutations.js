function recalcAvg (result) {
  var sum = 0;
  var divisor = 0;

  if (result.isHtml5 != null) {
    sum += (result.isHtml5 ? 100 : 0);
    divisor++;
  }
  if (result.security != null && result.security >= 0) {
    sum += result.security;
    divisor++;
  }
  if (result.desktopSpeed != null && result.desktopSpeed >= 0) {
    sum += result.desktopSpeed;
    divisor++;
  }
  if (result.mobileSpeed != null && result.mobileSpeed >= 0) {
    sum += result.mobileSpeed;
    divisor++;
  }
  if (result.mobileUsability != null && result.mobileUsability >= 0) {
    sum += result.mobileUsability;
    divisor++;
  }

  if (divisor === 0) return;
  result.avg = sum / divisor;
}

export const mutations = {
  clearResults (state) {
    state.results = null;
  },
  initResults (state) {
    state.results = [];
  },
  addResult (state, result) {
    state.results.push(result);
  },
  setIsHtml5 (state, payload) {
    payload.result.isHtml5 = payload.isHtml5;
  },
  setSecurityScore (state, payload) {
    payload.result.security = payload.score;
    payload.result.securityGrade = payload.grade;
    recalcAvg(payload.result);
  },
  setDesktopSpeedScore (state, payload) {
    payload.result.desktopSpeed = payload.score;
    recalcAvg(payload.result);
  },
  setMobileSpeedScore (state, payload) {
    payload.result.mobileSpeed = payload.score;
    recalcAvg(payload.result);
  },
  setMobileUsabilityScore (state, payload) {
    payload.result.mobileUsability = payload.score;
    recalcAvg(payload.result);
  }
};
