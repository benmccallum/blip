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
    <a class="d-block text-muted" :href="detailsUrl" target="_blank">
      {{ label }}
      <i class="fa fa-external-link" aria-hidden="true"></i>
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
      label: function () {
        return this.strategy[0].toUpperCase() + this.strategy.slice(1);
      }
    },
    mounted: function () {
      // Call async to get score from Google PageSpeed Insights
      this.getGooglePageSpeedResult();
    },
    methods: {
      getGooglePageSpeedResult: function () {
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
  .score-container {
    height: 75px;
  }

  .score {
    .val {
      display: block;
      font-size: 2rem;
    }
    .max {
      display: block;
      margin-top: -.5rem;
      padding-top: 0;
      font-size: .7rem;
    }
  }

  .score-na {
    font-size: 1.25rem;
  }
  .score-container a {
    font-size: .8rem;
  }

  .fade-enter-active {
    transition: opacity .5s;
  } 
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
