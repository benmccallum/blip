<template>
  <div class="test-container d-flex flex-column justify-content-center text-center">
    <a :href="detailsUrl" target="_blank" rel="noopener" title="Click to learn more...">
      <transition name="fade" mode="out-in">
        <div v-if="state === 'loading'" :key="state">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else :key="state" class="score-container">
          <span class="score" :class="speedGrade.class">
            <span class="val">{{ speedScore }}</span>
            <span class="max text-muted sr-only">/100</span>
          </span>
        </div>
      </transition>
      <i class="fa" :class="classObject" aria-hidden="true"></i>
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
      state: function () {
        if (this.speedScore === null) {
          return 'loading';
        } else if (this.speedScore === -1) {
          return 'na';
        }
        return 'scored';
      },
      detailsUrl: function () {
        return 'https://developers.google.com/speed/pagespeed/insights/?url=' +
          encodeURIComponent(this.place.website) + '&tab=' + this.strategy;
      },
      classObject: function () {
        return 'fa-' + this.strategy.toLowerCase();
      }
    },
    mounted: function () {
      // Call async to get score from Google PageSpeed Insights
      // TODO: Can do earlier??
      this.getResult();
    },
    methods: {
      getResult: function () {
        var that = this;

        if (window.offline) {
          this.getOfflineResult();
          return;
        }

        var url = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?key=AIzaSyCsV60UGTAkbdBHrE_jjZU_VYHSp8ioJJQ&filter_third_party_resources=true' +
          '&url=' + encodeURIComponent(this.place.website) + '&strategy=' + this.strategy;

        fetch(url).then(function (response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then(function (result) {
          that.processResult(result);
        }).catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
      },
      getOfflineResult: function () {
        var that = this;
        setTimeout(function () {
          that.processResult(googlePageSpeedResult()[that.strategy.toLowerCase()]);
        }, Math.floor(Math.random() * 1000));
      },
      processResult: function (result) {
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
      processRules: function (formattedResults) {
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
      processRule: function (key, value) {
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
