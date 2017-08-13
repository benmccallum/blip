<template>
  <div class="test-container d-flex flex-column justify-content-center text-center">
    <a :href="detailsUrl" target="_blank" title="Click to learn more...">
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
      <i class="fa fa-lock" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
  // TODO: https://github.com/mozilla/http-observatory/blob/master/httpobs/docs/api.md

  export default {
    name: 'MozillaObservatory',
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
        return 'https://observatory.mozilla.org/analyze.html?host=' +
          encodeURIComponent(this.website);
      },
      label: function () {
        return this.strategy[0].toUpperCase() + this.strategy.slice(1);
      }
    },
    mounted: function () {
      // Call async to init test their end and start polling for the results
      this.initTestAndPolling();
    },
    methods: {
      initTestAndPolling: function () {
        var that = this;

        if (window.offline) {
          setTimeout(function () {
            that.score = Math.random() >= 0.8 ? null : Math.floor(Math.random() * 100);
          }, 1000);
          return;
        }
        // TODO:
        // var url = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url='
        //   + encodeURIComponent(this.website) + '&strategy=' + this.strategy;

        // fetch(url).then(function (response) {
        //   if (response.ok) {
        //     return response.json();
        //   }
        //   throw new Error('Network response was not ok.');
        // }).then(function (json) {
        //   that.score = json.ruleGroups.SPEED.score;
        // }).catch(function (error) {
        //   //$scoreContainer.html('error');
        //   console.log('There has been a problem with your fetch operation: ' + error.message);
        // });
      }
    }
  };
</script>
