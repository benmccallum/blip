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
        isSiteDown: false,
        avg: place.website ? null : -1,
        isHtml5: {
          state: 'loading', // 'scored' or 'errored'
          score: null
        },
        security: {
          state: 'loading',
          scanId: null,
          score: null,
          grade: null,
          risk: null,
          tlsState: 'loading',
          tlsScanId: null,
          tlsLevel: null
        },
        desktop: {
          state: 'loading',
          speedScore: null,
          filteredRules: null
        },
        mobile: {
          state: 'loading',
          speedScore: null,
          usabilityScore: null,
          filteredRules: null
        }
      };
    }
  }
};
