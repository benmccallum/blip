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
    computed: { },
    mounted: function () {
      // Call async to init test their end and start polling for the results
      this.initTestAndPolling();
    },
    methods: {
      initTestAndPolling: function () {
        var that = this;

        if (window.offline) {
          this.getOfflineResult();
          return;
        }

        var url = 'https://http-observatory.security.mozilla.org/api/v1/analyze?host=' +
          encodeURIComponent(this.hostname);

        var params = new URLSearchParams();
        params.append('hidden', 'true');
        params.append('rescan', 'false');

        this.axios.post(url, params, {
          cancelToken: this.$store.state.cancelTokenSource.token
        }).then((response) => {
          // TODO: implement
          that.processScanObject(response.data);
        }).catch(function (thrown) {
          if (that.axios.isCancel(thrown)) {
            console.log('Request cancelled', thrown.message);
          } else {
            // TODO: handle error
            console.error('Request failed for MozillaObservatory:analyze.', thrown.message);
          }
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
        setTimeout(function () {
          console.info('MozillaObservatory: polling again for scan with id: ' + scanId + '.');
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
