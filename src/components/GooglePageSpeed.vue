<template>
  <div class="score-container d-flex flex-column justify-content-center text-center">
    <transition name="fade" mode="out-in">
      <div v-if="state === 'loading'" :key="state" class="pt-sm-1">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto text-muted"></i>
        <span class="sr-only">Loading...</span>
      </div>
      <div v-else :key="state">
        <span class="score">
          <span class="val">{{ score }}</span>
          <span class="max text-muted sr-only">/100</span>
        </span>
      </div>
    </transition>
    <a class="d-block text-muted text-center" :href="detailsUrl" target="_blank">
      <i class="fa" :class="classObject" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
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
        if (window.offline) {
          setTimeout(function () { this.score = 100; }, 1000);
          return;
        }

        var url = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=' +
          encodeURIComponent(this.website) + '&strategy=' + this.strategy;

        var that = this;

        fetch(url).then(function (response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then(function (json) {
          that.score = json.ruleGroups.SPEED.score;
        }).catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
      }
    }
  };
</script>

<style lang="scss" scoped>  

</style>
