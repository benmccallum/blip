export const GooglePageSpeedMixin = {
  props: {
    strategy: String // todo: add validator for "mobile" or "desktop" only
  },
  computed: {
    grade: function () {
      // TODO: Complete like Google does and match with CSS
      if (this.score == null) {
        return null;
      } else if (this.score <= 70) {
        return { label: 'Poor', class: 'grade-f' };
      } else if (this.score <= 90) {
        return { label: 'Needs work', class: 'grade-c' };
      }
      return { label: 'Good', class: 'grade-a' };
    }
  }
};
