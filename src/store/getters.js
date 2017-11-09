export const getters = {
  unsortedPlaces: (state, getters) => {
    return state.places
      ? state.places.filter(place => place.avg == null)
      : [];
  },
  getSortedPlaces: (state, getters) => (sortKey, sortDirection) => {
    function getVal (place, key) {
      if (!place.website) return -1;
      switch (key) {
        case 'avg': return place.avg;
        case 'isHtml5': return place.isHtml5;
        case 'security': return place.security.score;
        case 'desktopSpeed': return place.desktop.speedScore;
        case 'mobileSpeed': return place.mobile.speedScore;
        case 'mobileUsability': return place.mobile.usabilityScore;
        default: return null;
      }
    }

    function sort (a, b) {
      var aScore = getVal(a, sortKey);
      var bScore = getVal(b, sortKey);
      let result = 0;
      if (aScore < bScore) {
        result = -1;
      } else if (aScore > bScore) {
        result = 1;
      }
      return sortDirection === 'asc' ? result : result * -1;
    }

    return state.places
      ? state.places.filter(place => place.avg != null).sort(sort)
      : [];
  }
};
