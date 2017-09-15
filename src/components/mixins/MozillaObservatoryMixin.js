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
    }
  }
};
