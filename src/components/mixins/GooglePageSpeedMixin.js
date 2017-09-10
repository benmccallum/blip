export const GooglePageSpeedMixin = {
  props: {
    strategy: String // todo: add validator for "mobile" or "desktop" only
  },
  computed: {
    speedGrade: function () {
      return this.getGrade(this.speedScore);
    },
    usabilityGrade: function () {
      return this.getGrade(this.usabilityScore);
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
