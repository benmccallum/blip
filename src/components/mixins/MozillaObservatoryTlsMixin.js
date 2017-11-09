import { mozillaObservatoryTlsResults } from '../../offline-data/mozilla-observatory-tls-results';

export const MozillaObservatoryTlsMixin = {
  methods: {
    tlsInitTestAndPolling () {
      if (window.offline) {
        this.tlsGetOfflineResult();
        return;
      }

      var that = this;

      var url = 'https://tls-observatory.services.mozilla.com/api/v1/scan' +
        '?target=' + this.encodedHostName +
        '&rescan=false';

      // Pass this even if empty so the right Content-Type header is allowed in preflight OPTIONS CORS request
      var params = new URLSearchParams();

      this.axios.post(url, params, {
        cancelToken: this.$store.state.cancelTokenSource.token
      }).then((response) => {
        that.tlsProcessScanId(response.data);
      }).catch(function (thrown) {
        if (!that.axios.isCancel(thrown)) {
          console.error('Request failed for Mozilla TLS Observatory: POST /analyze.', thrown.message);
        }
      });
    },
    tlsProcessScanId (scan) {
      // TODO: Does the result come immediately or do I need to wait/poll?
      this.tlsPoll(scan.scan_id, 0);
    },
    tlsPoll (scanId, when) {
      var that = this;
      // console.info('Mozilla TLS Observatory: polling again in ' + when + 'ms for scan with id "' + scanId + '" and host "' + this.hostname + '".');
      setTimeout(function () {
        var url = 'https://tls-observatory.services.mozilla.com/api/v1/results' +
          '?id=' + scanId;

        that.axios.get(url, {
          cancelToken: that.$store.state.cancelTokenSource.token
        }).then((response) => {
          that.tlsProcessResults(response.data);
        }).catch(function (thrown) {
          if (!that.axios.isCancel(thrown)) {
            console.error('Request failed for Mozilla TLS Observatory: GET /results.', thrown.message);
          }
        });
      }, when);
    },
    tlsGetOfflineResult () {
      var that = this;
      setTimeout(function () {
        that.tlsProcessResult(mozillaObservatoryTlsResults);
      }, Math.floor(Math.random() * 1000));
    },
    tlsProcessResults (results) {
      // this.state = 'scored';
      if (!results || !results.analysis) {
        console.error('Mozilla Observatory TLS Analysis result was missing data.');
        return;
      };

      var data = {
        tlsScanId: results.id,
        tlsLevel: results.analysis.find(a => a.analyzer === 'mozillaEvaluationWorker').result.level
      };
      this.$store.commit('setSecurityTlsResult', { place: this.place, result: data });
    }
  }
};
