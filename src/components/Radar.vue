<template>
  <div id="radar" class="container-fluid">
    <my-header subtitle="Pick a location. We'll find businesses nearby and test their website."></my-header>
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-8 col-xl-7">
        
        <form v-show="!hasResults">
          <button type="button" class="btn btn-primary btn-block" v-on:click="searchNearby">
            <i class="fa fa-location-arrow" aria-hidden="true"></i> Search nearby
          </button>
          <p class="text-center mt-1 mb-2 ">or</p>
          <input type="text" class="form-control text-center mb-3" id="address" placeholder="Search elsewhere..." aria-label="Address">
        </form>

        <div id="query" v-show="hasResults" class="row pt-2 pb-1 mb-3">
          <div class="col">
            <p id="label" class="mb-2">
              <strong>Searching around... </strong>
              <span>{{query.label}}</span>
              <button type="button" class="close" aria-label="Search again..." v-on:click="reset">
                <span aria-hidden="true">&times;</span>
              </button>
            </p>
            <form id="filters" class="mb-2">
              <label for="sortBy" class="mr-sm-1">sorting by</label>
              <select id="sortBy" v-model="query.sortBy" class="custom-select mb-2 mr-sm-2 mb-sm-0">
                <option selected value="avg'">average score</option>
                <option value="isHtml">is HTML5?</option>
                <option value="security">security score</option>
                <option value="desktopSpeed">desktop speed score</option>
                <option value="mobileSpeed">mobile speed score</option>
                <option value="mobileUsability">mobile usability score</option>
              </select>
              <label for="sortDirection" class="mr-sm-1" aria-label="sort direction">with</label>
              <select id="sortDirection" v-model="query.sortDirection" class="custom-select">
                <option value="0">worst first</option>
                <option value="1">best first</option>
              </select>
            </form>
          </div>
        </div>
  
        <div id="results" v-show="hasResults">

          <aside id="legend" class="hidden-md-down">
            <!-- TODO: Legend for mobile views -->
            <h5>Legend</h5>
            Scores are out of 100.<br>
            Click a score for complete details.
            <hr>
            <div class="d-flex flex-row">
              <div class="pr-1"><i class="fa fa-html5"></i></div>
              <div>Is HTML5?</div>
            </div>
            <div class="d-flex flex-row">
              <div class="pr-1"><i class="fa fa-lock"></i></div>
              <div>Security by <a href="">Mozilla Observatory</a></div>
            </div>
            <div class="d-flex flex-row">
              <div class="pr-1"><i class="fa fa-desktop"></i></div>
              <div>Desktop speed score by <a href="">Google PageSpeed Insights</a></div>
            </div>
            <div class="d-flex flex-row">
              <div class="pr-1"><i class="fa fa-mobile"></i></div>
              <div>Mobile speed score by <a href="">Google PageSpeed Insights</a></div>
            </div>
          </aside>

          <div>
            <result v-for="result in results" :key="result.place_id" :result="result"></result>
          </div>
        </div>
  
        <div id="no-result" v-show="hasNoResults">
          No results
        </div>
      </div>
    </div>
    <div id="map" style="display:none!important;" hidden></div>
  </div>
</template>

<script>
import Result from './Result.vue';
import Header from './Header.vue';
import { googleMapsResult } from '../offline-data/google-maps-result';

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
        label: null,
        sortBy: 'avg',
        sortDirection: 'asc'
      },
      results: null
    };
  },
  computed: {
    hasResults: function () {
      return this.results && this.results.length > 0;
    },
    hasNoResults: function () {
      return this.results && this.results.length < 1
    },
    sortedResults: function () {
      this.results.sortBy(function (a, b) {
        return this.sortDirection === 'asc'
          ? a.name > b.name
          : a.name < b.name;
      });
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
      var that = this;
      setTimeout(function () {
        that.results = googleMapsResult;
      }, 1000);
      that.query.label = 'your location';
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
      if (!window.google) {
        console.warn('Google Maps API wasn\'t loaded. Initing Autocomplate will be skipped.');
        return;
      }

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
</script>

<style lang="scss" scoped>
  #filters {
    font-size: .9rem;
    opacity: .75;
  }

  #legend {
    position: absolute;
    right: -250px;
    width: 230px;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 10px;
    font-size: .7rem;
    line-height: 1.7;

    hr {
      margin-top: .7rem;
      margin-bottom: .7rem;
    }

        
    i {
      width: .8rem;
      text-align: center;

      &.fa-html5 {
        font-size: .85rem;
      }
      &.fa-lock {
        font-size: .95rem;
        padding-top: 2px;
      }
      &.fa-desktop {
        font-size: .7rem;
        padding-top: 3px;
      }
      &.fa-mobile {
        font-size: 1.1rem;
      }
    }
  }
</style>
