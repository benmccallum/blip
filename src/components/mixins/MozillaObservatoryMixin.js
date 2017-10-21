export const MozillaObservatoryMixin = {
  props: {
    place: Object
  },
  computed: {
    scanId: function () {
      return this.place.securiy.scanId;
    },
    score: function () {
      return this.place.security.score;
    },
    grade: function () {
      return this.place.security.grade;
    },
    hostname: function () {
      var parser = document.createElement('a');
      parser.href = this.place.website;
      return parser.hostname;
    },
    encodedHostName: function () {
      return encodeURIComponent(this.hostname)
    },
    analyzeUrl: function () {
      return 'https://http-observatory.security.mozilla.org/api/v1/analyze?host=' + this.encodedHostName;
    },
    detailsUrl: function () {
      return 'https://observatory.mozilla.org/analyze.html?host=' + this.encodedHostName;
    }
  }
};
