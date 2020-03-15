import axios from 'axios';

const mozillaObservatoryHttpModule = {
  mutations: {
    setSecurityLoading (state, place) {
      place.security.state = 'loading';
    },
    setSecurityResult (state, payload) {
      payload.result.state = 'scored';
      payload.place.security = payload.result;
    },
    setSecurityError (state, payload) {
      payload.place.security.state = 'errored';
    }
  },
  actions: {
    getMozillaObservatoryHttpResult ({ commit, rootState }, { place, analyzeUrl }) {
      const maxPolls = 50;
      let polls = 0;

      // TODO: Is there a better place for these? Separate JS file?
      function processScanObject (scan) {
        switch (scan.state) {
          case 'ABORTED':
            processError(null);
            break;
          case 'FAILED':
            processError(null);
            break;
          case 'FINISHED':
            processResult(scan);
            break;
          case 'PENDING':
            poll(scan.scan_id, 5000);
            break;
          case 'STARTING':
            poll(scan.scan_id, 4000);
            break;
          case 'RUNNING':
            poll(scan.scan_id, 2500);
            break;
        }
      }

      function poll (_scanId, when) {
        //console.log('Polled: ' + polls.toString());
        if (polls > maxPolls) {
          processError(null);
          return;
        }
        polls++;
        setTimeout(function () {
          axios.get(analyzeUrl, {
            cancelToken: rootState.cancelTokenSource.token
          }).then((response) => {
            processScanObject(response.data);
          }).catch(function (thrown) {
            if (!axios.isCancel(thrown)) {
              //console.error('Request failed for Mozilla HTTP Observatory: GET /analyze.', thrown.message);
              processError(thrown);
            }
          });
        }, when);
      }

      function processResult (result) {
        var data = {
          scanId: result.scan_id,
          score: result.score,
          grade: result.grade,
          risk: result.likelihood_indicator
        };
        commit('setSecurityResult', { place: place, result: data });
        commit('recalcAvg', place)
      }

      function processError (error) {
        commit('setSecurityError', { place: place, error: error });
      }

      // Only if not already "getting a result"
      if (place.security.state !== null) {
        return;
      }

      // Set state to "getting a result"
      commit('setSecurityLoading', place);

      // Get a result
      var params = new URLSearchParams();
      params.append('hidden', 'true');
      params.append('rescan', 'false');

      axios.post(analyzeUrl, params, {
        cancelToken: rootState.cancelTokenSource.token
      }).then((response) => {
        if (response.data.error === 'invalid-hostname') {
          processError(response.data);
        } else {
          processScanObject(response.data);
        }
      }).catch(function (thrown) {
        if (!axios.isCancel(thrown)) {
          // console.error('Request failed for Mozilla HTTP Observatory: POST /analyze.', thrown.message);
          processError(thrown);
        }
      });
    }
  }
};

export default mozillaObservatoryHttpModule;
