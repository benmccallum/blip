export const PlaceParserMixin = {
  methods: {
    parsePlace (place) {
      return {
        id: place.place_id,
        website: place.website,
        name: place.name,
        url: place.url,
        vicinity: place.vicinity,
        ph: place.formatted_phone_number,
        isTestingComplete: !place.website,
        avg: null,
        isHtml5: null,
        security: {
          scanId: null,
          score: null,
          grade: null,
          risk: null
        },
        desktop: {
          speedScore: null,
          filteredRules: null
        },
        mobile: {
          speedScore: null,
          usabilityScore: null,
          filteredRules: null
        }
      };
    }
  }
};
