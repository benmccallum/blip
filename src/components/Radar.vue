<template>
  <div id="radar" class="container-fluid">
    <my-header subtitle="Pick a location. We'll find businesses nearby and test their website."></my-header>
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-10 col-lg-7 col-xl-7">
        <form class="mb-3" v-show="status === 'form' || status === 'no-location'">
          <template v-if="canGeolocate">
            <button type="button" class="btn btn-primary btn-block" v-on:click="searchNearby">
              <i class="fa fa-location-arrow" aria-hidden="true"></i> Search nearby
            </button>
            <p class="text-center mt-1 mb-2 ">or</p>
          </template>
          <input type="text" class="form-control text-center mb-sm-1" id="address" placeholder="Search elsewhere..." aria-label="Address">
        </form>

        <div id="query" class="row pt-2 pb-1 mb-3" v-show="status === 'locating' || status === 'loading' || status === 'results'">
          <div class="col">
            <p id="label" class="mb-2">
              <strong>Searching around... </strong>
              <span>{{query.label}}</span>
              <button type="button" class="close mr-sm-0" aria-label="Search again..." v-on:click="reset">
                <span aria-hidden="true">&times;</span>
              </button>
            </p>
            <form id="filters" class="mb-2">
              <label for="sortBy">sorting by</label>
              <select id="sortBy" v-model="query.sortBy" class="custom-select">
                <option selected value="avg">average score</option>
                <option value="isHtml5">is HTML5?</option>
                <option value="security">security score</option>
                <option value="desktopSpeed">desktop speed score</option>
                <option value="mobileSpeed">mobile speed score</option>
                <option value="mobileUsability">mobile usability score</option>
              </select>
              <label for="sortDirection"aria-label="sort direction">with</label>
              <select id="sortDirection" v-model="query.sortDirection" class="custom-select">
                <option value="asc" selected>worst first</option>
                <option value="desc">best first</option>
              </select>
            </form>
          </div>
        </div>

        <div id="working" class="row justify-content-center" v-show="status === 'locating' || status === 'loading'">
          <div class="col col-sm-3 text-center">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto mb-1"></i>
            <br>
            {{ status === 'locating' ? 'Locating you...' : 'Finding businesses...' }}
          </div>
        </div>

        <div id="places" v-show="status === 'results'">
          <div class="row justify-content-center" v-show="sortedPlaces && sortedPlaces.length < 1">
            <div class="col col-sm-3 text-center">
              <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto mb-1"></i>
              <br>
              Completed results will appear here shortly...
            </div>
          </div>
          <transition-group name="places-list" tag="div">
            <place v-for="place in sortedPlaces" :key="place.id" :place="place"></place>
          </transition-group>
          <div class="row">
            <div class="col">
              <button type="button" id="btn-load-more" disabled class="btn btn-lg btn-primary mb-3 w-100">
                Load more...
              </button>
            </div>
          </div>
          <p class="text-right mr-1">
            <img class="google-logo" src="../assets/images/powered_by_google.png" alt="Powered by Google">
          </p>
        </div>

        <div id="no-places" v-show="status === 'no-results'">
          <p>No places could be found</p>
        </div>

        <div id="no-location" class="row justify-content-center" v-show="status === 'no-location'">
          <div class="col col-sm-3 col-md-6 text-center">
            <i class="fa fa-exclamation-triangle text-warning"></i>
            <p>
              We couldn't get your location. Please allow us to determine your location by accepting the permission.
              You may need to clear your block and reload the page to start again.
              <br>
              <i class="error-code text-muted">Error code: {{errorCode}}</i>
            </p>
          </div>
        </div>
      </div>
    </div>
    <a id="legend-icon" href="#legend" data-toggle="modal" v-show="status === 'results'">
      <i class="fa fa-question"></i>
    </a>
    <div id="map" style="display:none!important;" hidden></div>
    <div class="modal fade" id="legend" tabindex="-1" role="dialog" aria-labelledby="Legend modal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Legend</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Scores are out of 100. Click a score for complete details.
            <hr>
            By default, results are sorted by a computed "average", 
            the sum of the scores divided by the number of tests. 
            Feel free to sort as you wish with the sort controls.
            <hr>
            <div class="d-flex flex-row">
              <div class="pr-1"><i class="fa fa-html5"></i></div>
              <div>Is page written in HTML5? by blip</div>
            </div>
            <div class="d-flex flex-row">
              <div class="pr-1"><i class="fa fa-lock"></i></div>
              <div>Security score by <a href="">Mozilla Observatory</a></div>
            </div>
            <div class="d-flex flex-row">
              <div class="pr-1"><i class="fa fa-desktop"></i></div>
              <div>Desktop speed score by <a href="">Google PageSpeed Insights</a></div>
            </div>
            <div class="d-flex flex-row">
              <div class="pr-1"><i class="fa fa-mobile"></i></div>
              <div>Mobile speed score by <a href="">Google PageSpeed Insights</a></div>
            </div>
            <div class="d-flex flex-row">
              <div class="pr-1">
                <img class="mobile-usability" src="../assets/images/mobile-usability-icon.svg" alt="Mobile usability icon">
              </div>
              <div>Mobile usability score by <a href="">Google PageSpeed Insights</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Place from './Place.vue';
import Header from './Header.vue';
import { googleMapsResult } from '../offline-data/google-maps-result';
import { PlaceParserMixin } from './mixins/PlaceParserMixin';

// TODO: Scope in component
var autocomplete = null;
var placeChangedListener = null;
var service = null;

export default {
  name: 'radar',
  mixins: [ PlaceParserMixin ],
  components: {
    'place': Place,
    'my-header': Header
  },
  data: function () {
    return {
      query: this.defaultQuery(),
      status: 'form', // 'locating' or loading' or 'results' or 'no-results'
      lastDetailsCall: new Date(),
      canGeolocate: navigator.geolocation,
      errorCode: null
    };
  },
  computed: {
    places: function () {
      return this.$store.state.places;
    },
    sortedPlaces: function () {
      return this.$store.getters.getSortedPlaces(this.query.sortBy, this.query.sortDirection);
    }
  },
  methods: {
    defaultQuery: function () {
      return {
        coord: null,
        label: null,
        sortBy: 'avg',
        sortDirection: 'asc'
      };
    },
    searchNearby: function () {
      if (window.offline) {
        this.useOfflineData();
        return;
      }

      // Set status and try locate them
      this.status = 'locating';
      navigator.geolocation.getCurrentPosition(this.onGetCurrentPositionSuccess, this.onGetCurrentPositionError);
    },
    onGetCurrentPositionSuccess: function (position) {
      this.query.coord = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // weight autocomplete
      //  var circle = new window.google.maps.Circle({
      //   center: this.query.coord,
      //   radius: position.coords.accuracy
      // });
      // autocomplete.setBounds(circle.getBounds());

      this.search(this.query.coord, 'your current location');
    },
    onGetCurrentPositionError: function (positionError) {
      this.status = 'no-location';
      this.errorCode = positionError.code;
      console.warn('Could not locate user', positionError.code, positionError.message);
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
        googleMapsResult.forEach(function (place) {
          that.$store.commit('addPlace', that.parsePlace(place));
        });
      }, 1000);
      that.query.label = 'your location';
    },
    search: function (coord, label) {
      // Change status and set query label
      this.status = 'loading';
      this.query.label = label;

      // Setup service
      service = new window.google.maps.places.PlacesService(document.getElementById('map'));

      // Conduct search
      service.nearbySearch({
        location: coord,
        radius: 500,
        type: ['store']
      }, this.nearbySearchCallback);
    },
    nearbySearchCallback: function (places, status, pagination) {
      var that = this;
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        if (places.length) {
          // Get each place's complete details (to get their website URL)
          for (var i = 0; i < places.length; i++) {
            // You seem to have a pool of 9 or 10 requests to exhaust,
            // then you get another request every second therein.
            var timeSinceLast = Date.now() - that.lastDetailsCall;
            var delay = timeSinceLast > 1000 ? 0 : 1000 - timeSinceLast;

            (function (i) {
              setTimeout(function () {
                service.getDetails({ placeId: places[i].place_id }, that.getDetailsCallback);
              }, delay);
            })(i);

            that.lastDetailsCall = new Date(Date.now() + delay);
            console.log('Last call: ' + that.lastDetailsCall);
          }

          // Configure pagination button
          this.configureLoadMoreButton(pagination);
        } else {
          this.$store.commit('emptyPlaces');
        }
      } else {
        this.$store.commit('emptyPlaces'); // todo: error view?
      }
    },
    getDetailsCallback: function (place, status) {
      window.requestsMade = window.requestsMade || 0;
      window.requestsMade++;
      console.log('Requests made: ' + (window.requestsMade));
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        this.status = 'results';
        this.$store.commit('addPlace', this.parsePlace(place));
      } else {
        console.error('Error getting details for place', place, status);
      }
    },
    configureLoadMoreButton: function (pagination) {
      if (pagination.hasNextPage) {
        var btn = document.getElementById('btn-load-more');
        btn.disabled = false;
        btn.addEventListener('click', function () {
          btn.disabled = true;
          pagination.nextPage();
        });
      }
    },
    reset: function () {
      // Cancel any in-progress async calls
      // TODO: Once fetch supports it, https://github.com/whatwg/fetch/issues/447

      // Clear/reset UI
      this.initAutocomplete();
      this.query = this.defaultQuery();
      this.$store.commit('clearPlaces');
      this.$store.commit('resetCancelToken');
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
    },
    getPlaceScore: function (place, key) {
      switch (key) {
        case 'avg': return place.avg;
        case 'isHtml5': return place.isHtml5;
        case 'security': return place.security.score;
        case 'desktopSpeed': return place.desktop.speedScore;
        case 'mobileSpeed': return place.mobile.speedScore;
        case 'mobileUsability': return place.mobile.usabilityScore;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  //@import '../../node_modules/bootstrap/scss/_variables.scss';
  //@import '../../node_modules/bootstrap/scss/mixins/_breakpoints.scss';

  #btn-load-more:disabled {
    // Hide entirely when disabled...
    display: none;
  }

  #filters {
    font-size: .75rem;
    opacity: .75;
  }
  .custom-select {
    height: auto;
  }

  #legend-icon {
    display: block;
    position: sticky;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    color: #555;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.5);
    bottom: 20px;
    left: calc(100vw - 75px);

    &:focus, &:active, &:visited {
      outline: none;
    }

    i {
      font-size: 1.2rem;
      margin-top: 16px;
      margin-left: 18px;
    }
  }

  #legend {
    line-height: 1.7;

    hr {
      margin-top: .7rem;
      margin-bottom: .7rem;
    }
        
    i {
      width: 1rem;
      text-align: center;

      &.fa-html5 {
        font-size: 1.1rem;
      }
      &.fa-lock {
        font-size: 1.2rem;
        padding-top: 2px;
      }
      &.fa-desktop {
        font-size: .9rem;
        padding-top: 3px;
      }
      &.fa-mobile {
        font-size: 1.5rem;
      }
    }
    img.mobile-usability {
      display: inline-block;
      height: 1.3rem;
      margin-top: -6px;
      margin-left: -3px;
    }
  }

  .places-list-move {
    transition: transform 1s;
  }

  // todo: figure this out.
  .places-list-leave-active {
    background-color: red;
  }

  .google-logo {
    max-width: 200px;
    // @include media-breakpoint-up(sm) {
    //   max-width: 150px;  
    // }
  }

  .fa-exclamation-triangle {
    font-size: 2rem;
  }

  .error-code {
    font-size: .75rem;
  }
</style>
