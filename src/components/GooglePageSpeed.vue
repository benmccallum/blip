<template>
  <div class="test-container d-flex flex-column justify-content-center text-center">
    <a :href="detailsUrl" target="_blank" rel="noopener" title="Click to learn more...">
      <transition name="fade" mode="out-in">
        <div v-if="state === 'loading'" :key="state">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else :key="state" class="score-container">
          <span class="score">
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

  export default {
    name: 'GooglePageSpeed',
    props: {
      strategy: String, // todo: add validator for "mobile" or "desktop" only
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
          setTimeout(function () {
            that.score = Math.random() >= 0.8 ? null : Math.floor(Math.random() * 100);
            EventBus.$emit('google-page-speed-' + this.strategy + '-result', { });
          }, 1000);
          return;
        }

        var url = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=' +
          encodeURIComponent(this.website) + '&strategy=' + this.strategy;

        fetch(url).then(function (response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then(function (json) {
          that.score = json.ruleGroups.SPEED.score;
          EventBus.$emit('google-page-speed-' + this.strategy + '-result', json);
        }).catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
