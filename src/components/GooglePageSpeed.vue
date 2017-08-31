<template>
  <div class="test-container d-flex flex-column justify-content-center text-center">
    <a :href="detailsUrl" target="_blank" rel="noopener" title="Click to learn more...">
      <transition name="fade" mode="out-in">
        <div v-if="state === 'loading'" :key="state">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else :key="state" class="score-container">
          <span class="score" :class="grade.class">
            <span class="val">{{ score }}</span>
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
      website: String
    },
    data: function () {
      return {
        score: null
      };
    },
    computed: {
      state: function () {
        if (this.score === null) {
          return 'loading';
        } else if (this.score === -1) {
          return 'na';
        }
        return 'scored';
      },
      detailsUrl: function () {
        return 'https://developers.google.com/speed/pagespeed/insights/?url=' +
          encodeURIComponent(this.website) + '&tab=' + this.strategy;
      },
      classObject: function () {
        return 'fa-' + this.strategy;
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
          encodeURIComponent(this.website) + '&strategy=' + this.strategy +
          '&filter_third_party_resources=true';

        fetch(url).then(function (response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then(function (json) {
          that.score = json.ruleGroups.SPEED.score;
          EventBus.$emit('google-page-speed-' + that.strategy + '-result', json);
        }).catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
      },
      getOfflineData: function () {
        var that = this;
        setTimeout(function () {
          var result = googlePageSpeedResult[that.strategy.toLowerCase()];
          that.score = result.ruleGroups.SPEED.score;
          EventBus.$emit('google-page-speed-' + that.strategy + '-result', result);
        }, 1000);
      }
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
