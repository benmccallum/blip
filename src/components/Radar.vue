<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-8">
        <my-header subtitle="Pick a location. We'll find businesses nearby and test their website."></my-header>
        <form v-show="!hasResults">
          <button type="button" class="btn btn-primary btn-block" v-on:click="searchNearby">
            <i class="fa fa-location-arrow" aria-hidden="true"></i> Search nearby
          </button>
          <p class="text-center mt-1 mb-2 ">or</p>
          <input type="text" class="form-control text-center mb-3" id="address" placeholder="Search elsewhere..." aria-label="Address">
        </form>
        <p v-show="hasResults">
          <strong>Searching around... </strong>
          <span>{{query.label}}</span>
          <button type="button" class="close" aria-label="Search again..." v-on:click="reset">
            <span aria-hidden="true">&times;</span>
          </button>
        </p>
  
        <div id="results" v-show="hasResults">
          <ul class="nav nav-tabs justify-content-end mb-2" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#listview" role="tab">
                List view
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#mapview" role="tab">
                Map view
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="listview" class="tab-pane active" role="tabpanel">
              <result v-for="result in results" :key="result.place_id" :result="result"></result>
            </div>
            <div id="mapview" class="tab-pane" role="tabpanel">
              <div id="map">TODO map</div>
            </div>
          </div>
        </div>
  
        <div id="no-result" v-show="hasNoResults">
          No results
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Result from './Result.vue';
import Header from './Header.vue';

// TODO: Scope in component
var map = null;
var autocomplete = null;
var placeChangedListener = null;
var service = null;

export default {
  name: 'radar',
  components: {
    'result': Result,
    'my-header': Header
  },
  data: function () {
    return {
      query: {
        coord: null,
        label: null
      },
      results: null
    };
  },
  // watch: {
  //   results: {
  //     handler: function() { console.log('result changed!!!'); },
  //     deep: true
  //   }
  // },
  computed: {
    hasResults: function () {
      return this.results && this.results.length > 0;
    },
    hasNoResults: function () {
      return this.results && this.results.length < 1
    }
  },
  methods: {
    searchNearby: function () {
      if (window.offline) {
        this.useOfflineData();
        return;
      }

      if (navigator.geolocation) {
        var that = this;
        navigator.geolocation.getCurrentPosition(function (position) {
          that.query.coord = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          // Load map
          map = new window.google.maps.Map(document.getElementById('map'), {
            center: that.query.coord,
            zoom: 15
          });

          // weight autocomplete
          //  var circle = new window.google.maps.Circle({
          //   center: that.query.coord,
          //   radius: position.coords.accuracy
          // });
          // autocomplete.setBounds(circle.getBounds());

          that.search(that.query.coord, 'your current location');
        });
      }
    },
    onPlaceChanged: function () {
      var place = autocomplete.getPlace();
      var coord = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      var label = place.formatted_address;

      this.search(coord, label);
    },
    useOfflineData: function () {
      setTimeout(function () {
        var result = {
          id: 123,
          website: 'https://google.com',
          name: 'Test name',
          url: 'https://google.com',
          vicinity: '14 Random St, New York, 4012',
          ph: '+61 444 333 222'
        };
        this.results = [
          result,
          result,
          result,
          result,
          result
        ];
      }, 1000);
    },
    search: function (coord, label) {
      // Setup label
      this.query.label = label;

      // Setup service
      map = new window.google.maps.Map(document.getElementById('map'));
      service = new window.google.maps.places.PlacesService(map);

      // Conduct search
      service.nearbySearch({
        location: coord,
        radius: 500,
        type: ['store']
      }, this.nearbySearchCallback);
    },
    nearbySearchCallback: function (results, status) {
      this.results = [];
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          service.getDetails({ placeId: results[i].place_id }, this.getDetailsCallback);
        }
      }
    },
    getDetailsCallback: function (place, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        this.results.push({
          id: place.place_id,
          website: place.website,
          name: place.name,
          url: place.url,
          vicinity: place.vicinity,
          ph: place.formatted_phone_number
        });
      } else {
        console.error('Error getting details for place', place);
      }
    },
    reset: function () {
      // Cancel any in-progress async calls
      // TODO: Once fetch supports it, https://github.com/whatwg/fetch/issues/447

      // Clear/reset UI
      this.initAutocomplete();
      this.search = {};
      this.results = null;
    },
    initAutocomplete: function () {
      var eleAddress = document.getElementById('address');

      // Clear any existing value and listener
      eleAddress.value = '';
      if (placeChangedListener) {
        window.google.maps.event.removeListener(placeChangedListener);
      }

      // Init and store listener for gc later
      autocomplete = new window.google.maps.places.Autocomplete(
        eleAddress,
        { types: ['geocode'] } // TODO: check this!
      );
      placeChangedListener = autocomplete.addListener('place_changed', this.onPlaceChanged);
    }
  }
};

// function createMarker(place) {
//   var placeLoc = place.geometry.location;
//   var marker = new window.google.maps.Marker({
//     map: map,
//     position: place.geometry.location
//   });
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
