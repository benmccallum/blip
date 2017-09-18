export const GooglePageSpeedMixin = {
  props: {
    strategy: String, // todo: add validator for "mobile" or "desktop" only
    type: String, // todo: add validator for "SPEED" or "USABILITY" only
    place: Object
  },
  computed: {
    speedScore: function () {
      return this.place[this.strategy.toLowerCase()].speedScore;
    },
    usabilityScore: function () {
      return this.place[this.strategy.toLowerCase()].usabilityScore;
    },
    speedGrade: function () {
      return this.getGrade(this.speedScore);
    },
    usabilityGrade: function () {
      return this.getGrade(this.usabilityScore);
    },
    score: function () {
      return this.type === 'SPEED' ? this.speedScore : this.usabilityScore;
    },
    grade: function () {
      return this.type === 'SPEED' ? this.speedGrade : this.usabilityGrade;
    },
    detailsUrl: function () {
      return 'https://developers.google.com/speed/pagespeed/insights/?url=' +
          encodeURIComponent(this.place.website) + '&tab=' + this.strategy;
    }
  },
  methods: {
    getGrade: function (score) {
      // TODO: Complete like Google does and match with CSS
      if (score == null) {
        return null;
      } else if (score <= 70) {
        return { label: 'Poor', class: 'grade-f' };
      } else if (score <= 90) {
        return { label: 'Needs work', class: 'grade-c' };
      }
      return { label: 'Good', class: 'grade-a' };
    }
  }
};
