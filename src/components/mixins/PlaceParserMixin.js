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
        avg: place.website ? null : -999,
        isHtml5: {
          state: null, // 'loading' or 'scored' or 'errored'
          score: null
        },
        security: {
          state: null,
          scanId: null,
          score: null,
          grade: null,
          risk: null,
          tlsState: null,
          tlsScanId: null,
          tlsLevel: null
        },
        desktop: {
          state: null,
          score: null
        },
        mobile: {
          state: null,
          score: null
        }
      };
    }
  }
};
