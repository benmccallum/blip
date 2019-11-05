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
    getGooglePageSpeedResult ({ commit, rootState }, { place, strategy, type }) {
      // TODO: Is there somewhere better to put these? In an imported file?
      function processResult (result) {
        var data = { };

        // Speed
        data.speedScore = result.ruleGroups.SPEED.score;

        // Usability
        if (result.ruleGroups.USABILITY) {
          data.usabilityScore = result.ruleGroups.USABILITY.score;
        }

        // Rules
        data.filteredRules = processRules(result.formattedResults);

        // Commit to store
        commit('setGoogleResult', { place: place, strategy: strategy, result: data });
        commit('recalcAvg', place);
      }

      function processRules (formattedResults) {
        var filteredRules = { };

        // Filter to those with impact > 0.0,
        // grouping by group key (SPEED / USABILITY)
        if (formattedResults && formattedResults.ruleResults) {
          var ruleKey;
          for (ruleKey in formattedResults.ruleResults) {
            if (formattedResults.ruleResults.hasOwnProperty(ruleKey)) {
              var ruleValue = formattedResults.ruleResults[ruleKey];

              if (ruleValue.ruleImpact <= 0.0) {
                continue;
              }

              ruleValue.groups.forEach(function (groupKey) {
                if (!filteredRules.hasOwnProperty(groupKey)) {
                  filteredRules[groupKey] = [];
                }
                filteredRules[groupKey].push(processRule(ruleKey, ruleValue));
              });
            }
          }
        }

        // Sort by impact descending
        // TODO: Foreach groupKey do below
        // filteredRules.sort(function (a, b) {
        //   return a.ruleImpact < b.ruleImpact;
        // });

        return filteredRules;
      }

      function processRule (key, value) {
        // Type-dependant
        switch (key) {
          case 'MinifyCss':
            value.desc = ' and save ' + value.urlBlocks[0].header.args[1].value;
            break;
          case 'OptimizeImages':
            value.desc = ' and save ' + value.urlBlocks[0].header.args[1].value;
            break;
        }

        // Items
        return value;
      }

      function processError (error) {
        commit('setGoogleError', { place: place, strategy: strategy, error: error });
      }

      // Only if not already "getting a result"
      if (place[strategy.toLowerCase()].state !== null) {
        return;
      }

      // Only necessary for SPEED version as it will also bring back the USABILITY data
      if (type !== 'SPEED') {
        return;
      }

      // Set state to "getting a result"
      commit('setGoogleLoading', { place: place, strategy: strategy });

      // Get a result
      var url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?key=AIzaSyCsV60UGTAkbdBHrE_jjZU_VYHSp8ioJJQ&filter_third_party_resources=true' +
        '&url=' + encodeURIComponent(place.website) + '&strategy=' + strategy;

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
