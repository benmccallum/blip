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
          <input type="text" class="form-control text-center mb-sm-1" id="address" ref="address" placeholder="Search elsewhere..." aria-label="Address">
        </form>

        <div class="row bordered-row pt-2 pb-1 mb-3" v-show="status === 'locating' || status === 'loading' || status === 'results'">
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
          <div class="row justify-content-center" v-show="!sortedPlaces.length">
            <div class="col col-sm-3 text-center text-muted">
              <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto mb-1"></i>
              <br>
              Completed results will appear here shortly...
            </div>
          </div>
          <transition-group name="places-list" tag="div">
            <place v-for="place in sortedPlaces" :key="place.id" :place="place"></place>
          </transition-group>
          <div class="row bordered-row pt-2 pb-1 mt-3 mb-3" v-show="unsortedPlaces.length">
            <div class="col">
              <h4 class="text-center">We're still working on these...</h4>
            </div>
          </div>          
          <place v-for="place in unsortedPlaces" :key="place.id" :place="place"></place>
          <div class="row">
            <div class="col">
              <button type="button" class="btn btn-lg btn-primary mb-3 w-100"
                :hidden="pagination == null || (!queue.length && !pagination.hasNextPage)" 
                :disabled="!canLoadMore" 
                v-on:click="onLoadMore">
                Load more... 
                <span v-show="!canLoadMore">in {{canLoadMoreIn}}s</span>
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
              <div>Security score, by <a href="">Mozilla Observatory</a></div>
            </div>
            <div class="d-flex flex-row">
              <div class="pr-1"><i class="fa fa-desktop"></i></div>
              <div>Desktop speed score, by <a href="">Google PageSpeed Insights</a></div>
            </div>
            <div class="d-flex flex-row">
              <div class="pr-1"><i class="fa fa-mobile"></i></div>
              <div>Mobile speed score, by <a href="">Google PageSpeed Insights</a></div>
            </div>
            <div class="d-flex flex-row">
              <div class="pr-1">
                <img class="mobile-usability" src="../assets/images/mobile-usability-icon.svg" alt="Mobile usability icon">
              </div>
              <div>Mobile usability score, by <a href="">Google PageSpeed Insights</a></div>
            </div>
            <div class="d-flex flex-row">
              <div class="pr-1"><i class="fa fa-exclamation-triangle text-warning"></i></div>
              <div>Test failed. Score of 0 given and included in average.</div>
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
  mounted () {
    var that = this;

    // Every second, restore 1 call to Google Places
    setInterval(function () {
      if (that.canLoadMoreIn > 0) {
        that.canLoadMoreIn--;
      }
    }, 1000);
  },
  data () {
    return {
      query: this.defaultQuery(),
      status: 'form', // 'locating' or loading' or 'results' or 'no-results'
      pagination: null,
      canLoadMoreIn: 0,
      queue: [],
      canGeolocate: navigator.geolocation,
      errorCode: null
    };
  },
  computed: {
    unsortedPlaces () {
      return this.$store.getters.unsortedPlaces;
    },
    sortedPlaces () {
      return this.$store.getters.getSortedPlaces(this.query.sortBy, this.query.sortDirection);
    },
    canLoadMore () {
      return this.canLoadMoreIn === 0;
    }
  },
  methods: {
    defaultQuery () {
      return {
        coord: null,
        label: null,
        sortBy: 'avg',
        sortDirection: 'asc'
      };
    },
    searchNearby () {
      // Set status and try locate them
      this.status = 'locating';
      navigator.geolocation.getCurrentPosition(this.onGetCurrentPositionSuccess, this.onGetCurrentPositionError);
    },
    onGetCurrentPositionSuccess (position) {
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
    onGetCurrentPositionError (positionError) {
      this.status = 'no-location';
      this.errorCode = positionError.code;
      console.warn('Could not locate user', positionError.code, positionError.message);
    },
    onPlaceChanged () {
      var place = autocomplete.getPlace();
      var coord = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      var label = place.formatted_address;

      this.search(coord, label);
    },
    search (coord, label) {
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
    nearbySearchCallback (places, status, pagination) {
      if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        this.$store.commit('emptyPlaces');
      } else if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        this.pagination = pagination;
        for (var i = 0; i < places.length; i++) {
          this.queue.push(places[i].place_id);
        }
        this.processQueue();
      } else if (this.places.length) {
        // Show error label saying we couldn't get any more results but leave original still intact.
        // this.$store.commit('emptyPlaces');
      } else {
        // TODO: Show error with ability to try again
        // this.$store.commit('emptyPlaces');
      }
    },
    processQueue () {
      let i = 0;
      while (this.queue.length && i < 10) {
        this.canLoadMoreIn++;
        i++;
        service.getDetails({ placeId: this.queue.shift() }, this.getDetailsCallback);
      }
    },
    getDetailsCallback (place, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        this.status = 'results';
        this.$store.commit('addPlace', this.parsePlace(place));
      } else {
        console.error('Error getting details for place.', place, status);
      }
    },
    onLoadMore () {
      if (this.queue.length) {
        this.processQueue();
      } else {
        this.pagination.nextPage();
      }
    },
    reset () {
      // Clear/reset UI, cancelling any in-progress ajax calls
      this.initAutocomplete();
      this.query = this.defaultQuery();
      this.status = 'form';
      this.$store.commit('clearPlaces');
      this.$store.commit('resetCancelToken');
    },
    initAutocomplete () {
      if (!window.google) {
        console.warn('Google Maps API wasn\'t loaded. Initing Autocomplate will be skipped.');
        return;
      }

      // Clear any existing value and listener
      this.$refs.address.value = '';
      if (placeChangedListener) {
        window.google.maps.event.removeListener(placeChangedListener);
      }

      // Init and store listener for gc later
      autocomplete = new window.google.maps.places.Autocomplete(
        this.$refs.address,
        { types: ['geocode'] }
      );
      placeChangedListener = autocomplete.addListener('place_changed', this.onPlaceChanged);
    }
  }
};
</script>

<style lang="scss" scoped>
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
      font-size: 1rem;

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

  .google-logo {
    max-width: 200px;
  }
</style>
