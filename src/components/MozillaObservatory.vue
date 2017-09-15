<template>
  <div class="test-container d-flex flex-column justify-content-center text-center">
    <a :href="detailsUrl" target="_blank" rel="noopener" title="Click to learn more...">
      <transition name="fade" mode="out-in">
        <div v-if="state === 'loading'" :key="state">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else :key="state" class="score-container">
          <span class="score" :class="'grade-' + (grade || '').toLowerCase()">
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
  import { MozillaObservatoryMixin } from './mixins/MozillaObservatoryMixin';
  import { mozillaObservatoryResult } from '../offline-data/mozilla-observatory-result';

  export default {
    name: 'MozillaObservatory',
    mixins: [ MozillaObservatoryMixin ],
    props: {
      place: Object
    },
    data: function () {
      return {
        state: 'loading'
      };
    },
    computed: {
      hostname: function () {
        var parser = document.createElement('a');
        parser.href = this.place.website;
        return parser.hostname;
      },
      detailsUrl: function () {
        return 'https://observatory.mozilla.org/analyze.html?host=' +
          encodeURIComponent(this.hostname);
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
          this.getOfflineData();
          return;
        }

        var url = 'https://http-observatory.security.mozilla.org/api/v1/analyze?host=' +
          encodeURIComponent(this.hostname);

        var params = {
          hidden: true,
          rescan: false
        };

        fetch(url, {
          method: 'POST',
          body: JSON.stringify(params)
        }).then(function (response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then(function (json) {
          that.processScanObject(json);
        }).catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
      },
      processScanObject: function (scan) {
        switch (scan.state) {
          case 'ABORTED':
            break;
          case 'FAILED':
            break;
          case 'FINISHED':
            this.processResult(scan);
            break;
          case 'PENDING':
            this.poll(scan.scan_id, 5000);
            break;
          case 'STARTING':
            this.poll(scan.scan_id, 2500);
            break;
          case 'RUNNING':
            this.poll(scan.scan_id, 1000);
            break;
        }
      },
      poll: function (scanId, when) {
        // var that = this;
        setTimeout(function () {
          console.log('polling again...');
        }, when);
      },
      getOfflineResult: function () {
        var that = this;
        setTimeout(function () {
          that.processResult(mozillaObservatoryResult());
        }, Math.floor(Math.random() * 1000));
      },
      processResult: function (result) {
        this.state = 'scored';
        var data = { scanId: result.scan_id, score: result.score, grade: result.grade };
        this.$store.commit('setSecurityResult', { place: this.place, result: data });
      }
    }
  };
</script>
