export const GooglePageSpeedMixin = {
  props: {
    strategy: String,
    place: Object
  },
  computed: {
    result () { return this.place[this.strategy.toLowerCase()]; },
    state () { return this.result.state; },
    categories () { return this.result.categories; },
    score () { return this.result.score; },
    grade () { return this.getGrade(this.score); },
    detailsUrl () {
      return 'https://developers.google.com/speed/pagespeed/insights/?url=' +
          encodeURIComponent(this.place.website) + '&tab=' + this.strategy;
    }
  },
  methods: {
    getGrade (score) {
      if (score == null) {
        return null;
      } else if (score <= 49) {
        return { label: 'Poor', class: 'grade-f' };
      } else if (score <= 89) {
        return { label: 'Needs work', class: 'grade-c' };
      }
      return { label: 'Good', class: 'grade-a' };
    }
  }
};
