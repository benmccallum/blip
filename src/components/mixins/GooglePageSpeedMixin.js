export const GooglePageSpeedMixin = {
  props: {
    strategy: String, // todo: add validator for "mobile" or "desktop" only
    type: String, // todo: add validator for "SPEED" or "USABILITY" only
    place: Object
  },
  computed: {
    state () {
      return this.place[this.strategy.toLowerCase()].state;
    },
    speedScore () {
      return this.place[this.strategy.toLowerCase()].speedScore;
    },
    usabilityScore () {
      return this.place[this.strategy.toLowerCase()].usabilityScore;
    },
    speedGrade () {
      return this.getGrade(this.speedScore);
    },
    usabilityGrade () {
      return this.getGrade(this.usabilityScore);
    },
    score () {
      return this.type === 'SPEED' ? this.speedScore : this.usabilityScore;
    },
    grade () {
      return this.type === 'SPEED' ? this.speedGrade : this.usabilityGrade;
    },
    detailsUrl () {
      return 'https://developers.google.com/speed/pagespeed/insights/?url=' +
          encodeURIComponent(this.place.website) + '&tab=' + this.strategy;
    }
  },
  methods: {
    getGrade (score) {
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
