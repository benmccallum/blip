import { mapActions } from 'vuex';

export const MozillaObservatoryHttpMixin = {
  created () {
    this.getMozillaObservatoryHttpResult({ place: this.place, analyzeUrl: this.analyzeUrl });
  },
  methods: {
    ...mapActions([
      'getMozillaObservatoryHttpResult'
    ])
  }
};
