export const getters = {
  getSortedPlaces: (state, getters) => (sortKey, sortDirection) => {
    function getVal (place, key) {
      switch (key) {
        case 'avg': return place.avg;
        case 'isHtml5': return place.isHtml5;
        case 'desktopSpeed': return place.desktop.speedScore;
        case 'mobileSpeed': return place.mobile.speedScore;
        case 'mobileUsability': return place.mobile.usabilityScore;
        default: return null;
      }
    }

    return state.places
      ? state.places
          // .filter(place => place.isTestingComplete)
          .sort((a, b) => {
            var aScore = getVal(a, sortKey);
            var bScore = getVal(b, sortKey);

            if (aScore === bScore) {
              // Sort by name to try avoid results bouncing all over the place each re-sort
              return a.name < b.name;
            }

            return sortDirection === 'asc' ? aScore > bScore : aScore < bScore;
          })
      : null;
  }
};
