import { mozillaObservatoryHttpResult } from '../../offline-data/mozilla-observatory-http-result';

export const MozillaObservatoryHttpMixin = {
  data () {
    return {
      state: 'loading'
    };
  },
  methods: {
    httpInitTestAndPolling () {
      if (window.offline) {
        this.httpGetOfflineResult();
        return;
      }

      var that = this;

      var params = new URLSearchParams();
      params.append('hidden', 'true');
      params.append('rescan', 'false');

      this.axios.post(this.analyzeUrl, params, {
        cancelToken: this.$store.state.cancelTokenSource.token
      }).then((response) => {
        that.httpProcessScanObject(response.data);
      }).catch(function (thrown) {
        if (!that.axios.isCancel(thrown)) {
          console.error('Request failed for Mozilla HTTP Observatory: POST /analyze.', thrown.message);
        }
      });
    },
    httpProcessScanObject (scan) {
      switch (scan.state) {
        case 'ABORTED':
          break;
        case 'FAILED':
          break;
        case 'FINISHED':
          this.httpProcessResult(scan);
          break;
        case 'PENDING':
          this.httpPoll(scan.scan_id, 5000);
          break;
        case 'STARTING':
          this.httpPoll(scan.scan_id, 2500);
          break;
        case 'RUNNING':
          this.httpPoll(scan.scan_id, 1000);
          break;
      }
    },
    httpPoll (scanId, when) {
      var that = this;
      console.info('MozillaObservatory: polling again in ' + when + 'ms for scan with id "' + scanId + '" and host "' + this.hostname + '".');
      setTimeout(function () {
        that.axios.get(that.analyzeUrl, {
          cancelToken: that.$store.state.cancelTokenSource.token
        }).then((response) => {
          that.httpProcessScanObject(response.data);
        }).catch(function (thrown) {
          if (!that.axios.isCancel(thrown)) {
            console.error('Request failed for Mozilla HTTP Observatory: GET /analyze.', thrown.message);
          }
        });
      }, when);
    },
    httpGetOfflineResult () {
      var that = this;
      setTimeout(function () {
        that.httpProcessResult(mozillaObservatoryHttpResult());
      }, Math.floor(Math.random() * 1000));
    },
    httpProcessResult (result) {
      this.state = 'scored';
      var data = {
        scanId: result.scan_id,
        score: result.score,
        grade: result.grade,
        risk: result.likelihood_indicator
      };
      this.$store.commit('setSecurityResult', { place: this.place, result: data });
    }
  }
};
