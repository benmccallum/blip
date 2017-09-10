export const PlaceParserMixin = {
  methods: {
    parsePlace: function (place) {
      return {
        id: place.place_id,
        website: place.website,
        name: place.name,
        url: place.url,
        vicinity: place.vicinity,
        ph: place.formatted_phone_number,
        avg: null,
        isHtml5: null,
        security: null,
        securityGrade: null,
        desktopSpeed: null,
        mobileSpeed: null,
        mobileUsability: null
      };
    }
  }
};
