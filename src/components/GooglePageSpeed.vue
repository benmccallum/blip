<template>
  <div class="test-container d-flex flex-column justify-content-center text-center">
    <a :href="detailsUrl" target="_blank" rel="noopener" title="Click to learn more...">
      <transition name="fade" mode="out-in">
        <div v-if="state === 'loading'" :key="state">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else-if="state === 'errored'" :key="state">
          <i class="fa fa-exclamation-triangle text-warning"></i>
          <span class="sr-only">Error</span>
        </div>
        <div v-else-if="state === 'scored'" :key="state" class="score-container">
          <span class="score" :class="grade.class">
            <span class="val">{{ score }}</span>
          </span>
        </div>
        <div v-else>
          Oh<br>oww
        </div>
      </transition>
      <i v-if="type !== 'USABILITY'" class="fa" :class="classObject" aria-hidden="true"></i>
      <img v-else class="mobile-usability" src="../assets/images/mobile-usability-icon.svg">
    </a>
  </div>
</template>

<script>
  import { GooglePageSpeedMixin } from './mixins/GooglePageSpeedMixin';
  import { googlePageSpeedResult } from '../offline-data/google-page-speed-result';

  export default {
    name: 'GooglePageSpeed',
    extends: GooglePageSpeedMixin,
    computed: {
      state () {
        if (this.score === null) {
          return 'loading';
        }
        return 'scored';
      },
      classObject () {
        return 'fa-' + this.strategy.toLowerCase();
      }
    },
    created () {
      // Only necessary for SPEED version as it will also bring back the USABILITY data
      if (this.type === 'SPEED') {
        this.getResult();
      }
    },
    methods: {
      getResult () {
        var that = this;

        if (window.offline) {
          this.getOfflineResult();
          return;
        }

        var url = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?key=AIzaSyCsV60UGTAkbdBHrE_jjZU_VYHSp8ioJJQ&filter_third_party_resources=true' +
          '&url=' + encodeURIComponent(this.place.website) + '&strategy=' + this.strategy;

        this.axios.get(url, {
          cancelToken: this.$store.state.cancelTokenSource.token
        }).then((response) => {
          that.processResult(response.data);
        }).catch(function (thrown) {
          if (!that.axios.isCancel(thrown)) {
            console.error('Request failed for GooglePageSpeed result.', thrown.message);
          }
        });
      },
      getOfflineResult () {
        var that = this;
        setTimeout(function () {
          that.processResult(googlePageSpeedResult()[that.strategy.toLowerCase()]);
        }, Math.floor(Math.random() * 1000));
      },
      processResult (result) {
        var data = { };
        // Speed
        data.speedScore = result.ruleGroups.SPEED.score;
        // Usability
        if (result.ruleGroups.USABILITY) {
          data.usabilityScore = result.ruleGroups.USABILITY.score;
        }
        // Rules
        data.filteredRules = this.processRules(result.formattedResults);
        // Commit to store
        this.$store.commit('set' + this.strategy + 'Result', { place: this.place, result: data });
      },
      processRules (formattedResults) {
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

              var that = this;

              ruleValue.groups.forEach(function (groupKey) {
                if (!filteredRules.hasOwnProperty(groupKey)) {
                  filteredRules[groupKey] = [];
                }
                filteredRules[groupKey].push(that.processRule(ruleKey, ruleValue));
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
      },
      processRule (key, value) {
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
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
