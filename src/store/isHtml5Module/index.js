import axios from 'axios';

const isHtml5Module = {
  mutations: {
    setIsHtml5Loading (state, place) {
      place.isHtml5.state = 'loading';
    },
    setIsHtml5Result (state, payload) {
      if (payload.isHtml5 === null) {
        // Error loading and testing website... show in the UI, give negative avg
        payload.place.isSiteDown = true;
        payload.place.isHtml5.state = 'errored';
      } else {
        payload.place.isHtml5.score = payload.isHtml5;
        payload.place.isHtml5.state = 'scored';
      }
    },
    setIsHtml5Error (state, payload) {
      payload.place.isHtml5.state = 'errored';
    }
  },
  actions: {
    getHtml5Result ({ commit, rootState }, place) {
      // Only if not already "getting a result"
      if (place.isHtml5.state !== null) {
        return;
      }

      // Set state to "getting a result"
      commit('setIsHtml5Loading', place);

      // Get a result
      var url = 'https://ishtml5.azurewebsites.net/api/testurl' +
        '?code=LzMreSQDMm6BKT3KUU6UaEaw/5m4r2SG6LMzytPI0LPZ6uR/5xa6qA==' +
        '&url=' + encodeURIComponent(place.website);

      axios.get(url, {
        cancelToken: rootState.cancelTokenSource.token
      }).then((response) => {
        commit('setIsHtml5Result', { place: place, isHtml5: response.data });
        commit('recalcAvg', place);
      }).catch((thrown) => {
        if (!axios.isCancel(thrown)) {
          commit('setIsHtml5Error', { place: place, error: thrown });
        }
      });
    }
  }
};

export default isHtml5Module;
