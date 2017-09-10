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
  import { EventBus } from '../event-bus';
  import { googlePageSpeedResult } from '../offline-data/google-page-speed-result';
  import { GooglePageSpeedMixin } from './mixins/GooglePageSpeedMixin';

  export default {
    name: 'GooglePageSpeed',
    extends: GooglePageSpeedMixin,
    props: {
      result: Object
    },
    computed: {
      state: function () {
        if (this.speedScore === null) {
          return 'loading';
        } else if (this.speedScore === -1) {
          return 'na';
        }
        return 'scored';
      },
      speedScore: function () {
        return this.result[this.strategy.toLowerCase() + 'Speed'];
      },
      usabilityScore: function () {
        return this.result[this.strategy.toLowerCase() + 'Usability'];
      },
      detailsUrl: function () {
        return 'https://developers.google.com/speed/pagespeed/insights/?url=' +
          encodeURIComponent(this.result.website) + '&tab=' + this.strategy;
      },
      classObject: function () {
        return 'fa-' + this.strategy.toLowerCase();
      }
    },
    mounted: function () {
      // Call async to get score from Google PageSpeed Insights
      this.getGooglePageSpeedResult();
    },
    methods: {
      getGooglePageSpeedResult: function () {
        var that = this;

        if (window.offline) {
          this.getOfflineData();
          return;
        }

        var url = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=' +
          encodeURIComponent(this.result.website) + '&strategy=' + this.strategy +
          '&filter_third_party_resources=true';

        fetch(url).then(function (response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then(function (json) {
          that.processData(json);
        }).catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
      },
      getOfflineData: function () {
        var that = this;
        setTimeout(function () {
          that.processData(googlePageSpeedResult()[that.strategy.toLowerCase()]);
        }, 1000);
      },
      processData: function (data) {
        // Speed
        this.$store.commit('set' + this.strategy + 'SpeedScore', { result: this.result, score: data.ruleGroups.SPEED.score });
        // Usability
        if (data.ruleGroups.USABILITY && data.ruleGroups.USABILITY.score) {
          this.$store.commit('set' + this.strategy + 'UsabilityScore', { result: this.result, score: data.ruleGroups.USABILITY.score });
        }
        // Everything
        EventBus.$emit('google-page-speed-' + this.strategy.toLowerCase() + '-result', data);
      }
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
