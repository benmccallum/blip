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
        that.tlsProcessScanObject(response.data);
      }).catch(function (thrown) {
        if (!that.axios.isCancel(thrown)) {
          console.error('Request failed for Mozilla TLS Observatory: POST /analyze.', thrown.message);
        }
      });
    },
    tlsProcessScanObject (scan) {
      console.log(scan);
      this.tlsPoll(scan.scan_id, 0);
    },
    tlsPoll (scanId, when) {
      var that = this;
      console.info('Mozilla TLS Observatory: polling again in ' + when + 'ms for scan with id "' + scanId + '" and host "' + this.hostname + '".');
      setTimeout(function () {
        var url = 'https://tls-observatory.services.mozilla.com/api/v1/results' +
          '?id=' + scanId;

        that.axios.get(url, {
          cancelToken: that.$store.state.cancelTokenSource.token
        }).then((response) => {
          console.log(response.data);
          // that.httpProcessScanObject(response.data);
        }).catch(function (thrown) {
          if (!that.axios.isCancel(thrown)) {
            console.error('Request failed for Mozilla TLS Observatory: GET /results.', thrown.message);
          }
        });
      }, when);
    }
    // ,
    // httpGetOfflineResult () {
    //   var that = this;
    //   setTimeout(function () {
    //     that.httpProcessResult(mozillaObservatoryHttpResult());
    //   }, Math.floor(Math.random() * 1000));
    // },
    // httpProcessResult (result) {
    //   this.state = 'scored';
    //   var data = {
    //     scanId: result.scan_id,
    //     score: result.score,
    //     grade: result.grade,
    //     risk: result.likelihood_indicator
    //   };
    //   this.$store.commit('setSecurityResult', { place: this.place, result: data });
    // }
  }
};
