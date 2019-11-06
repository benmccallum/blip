import axios from 'axios';

const googlePageSpeedModule = {
  mutations: {
    setGoogleLoading (_state, payload) {
      payload.place[payload.strategy.toLowerCase()].state = 'loading';
    },
    setGoogleResult (_state, payload) {
      payload.result.state = 'scored';
      payload.place[payload.strategy.toLowerCase()] = payload.result;
    },
    setGoogleError (_state, payload) {
      payload.place[payload.strategy.toLowerCase()].state = 'errored';
    }
  },
  actions: {
    getGooglePageSpeedResult ({ commit, rootState }, { place, strategy }) {
      function processResult (result) {
        const data = {
          categories: []
        };

        const cats = result.lighthouseResult.categories;
        Object.keys(cats).forEach(key => {
          const category = cats[key];
          data.categories.push({
            title: category.title,
            score: Math.round(category.score * 100)
          });
        });

        data.score = Math.round(data.categories.reduce((ac, cat) => ac + cat.score, 0) / data.categories.length);

        // Commit to store
        commit('setGoogleResult', { place: place, strategy: strategy, result: data });
        commit('recalcAvg', place);
      }

      function processError (error) {
        commit('setGoogleError', { place: place, strategy: strategy, error: error });
      }

      // Only if not already "getting a result"
      if (place[strategy.toLowerCase()].state !== null) {
        return;
      }

      // Set state to "getting a result"
      commit('setGoogleLoading', { place: place, strategy: strategy });

      // Get a result
      let url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?key=AIzaSyCsV60UGTAkbdBHrE_jjZU_VYHSp8ioJJQ' +
        '&filter_third_party_resources=true' +
        '&url=' + encodeURIComponent(place.website) +
        '&strategy=' + strategy;

      ['accessibility', 'best-practices', 'performance', 'pwa', 'seo'].forEach(cat => { url += `&category=${cat}`; });

      axios.get(url, {
        cancelToken: rootState.cancelTokenSource.token
      }).then((response) => {
        processResult(response.data);
      }).catch((thrown) => {
        if (!axios.isCancel(thrown)) {
          console.error('Request failed for GooglePageSpeed result.', thrown.message);
          processError(thrown);
        }
      });
    }
  }
};

export default googlePageSpeedModule;
