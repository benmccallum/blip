export const MozillaObservatoryMixin = {
  props: {
    place: Object
  },
  computed: {
    scanId () {
      return this.place.security.scanId;
    },
    score () {
      return this.place.security.score;
    },
    grade () {
      return this.place.security.grade;
    },
    gradeClass () {
      if (this.grade == null) return null;
      // Trim off + or - if it's a score like A+ or A-
      return 'grade-' + (this.grade.length > 1 ? this.grade.slice(0, -1) : this.grade).toLowerCase();
    },
    risk () {
      return this.place.security.risk;
    },
    riskClass () {
      return 'risk-' + (this.risk || 'unknown').toLowerCase();
    },
    hostname () {
      var parser = document.createElement('a');
      parser.href = this.place.website;
      return parser.hostname;
    },
    encodedHostName () {
      return encodeURIComponent(this.hostname)
    },
    analyzeUrl () {
      return 'https://http-observatory.security.mozilla.org/api/v1/analyze?host=' + this.encodedHostName;
    },
    detailsUrl () {
      return 'https://observatory.mozilla.org/analyze.html?host=' + this.encodedHostName;
    }
  }
};
