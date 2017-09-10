<template>
  <div id="laser" class="container-fluid">
    <my-header subtitle="Enter a website URL and we'll test it."></my-header>
    <div class="row justify-content-md-center">      
      <div class="col-12 col-md-8 col-xl-7">     

        <form v-show="!hasQuery">
          <input type="url" class="form-control text-center mb-3" id="url" placeholder="https://example.com" aria-label="Website URL">
          <button type="button" class="btn btn-primary btn-block" v-on:click="testWebsite">Test now</button>
        </form>

        <div id="query" v-show="hasQuery" class="row pt-2 pb-1 mb-3">
          <div class="col">
            <p id="label" class="mb-2">
              <strong>Testing... </strong>
              <span>{{query}}</span>
              <button type="button" class="close float-right" aria-label="Search again..." v-on:click="reset">
                <span aria-hidden="true">&times;</span>
              </button>
            </p>
          </div>
        </div>

        <div id="result" v-if="hasQuery">
          <nav class="row">
            <div class="col nav-item active" data-toggle="tab" href="#html5" role="tab">
              <is-html5 :result="result"></is-html5>
            </div>
            <div class="col nav-item" data-toggle="tab" href="#security" role="tab">
              <mozilla-observatory :result="result"></mozilla-observatory>
            </div>
            <div class="col nav-item" data-toggle="tab" href="#desktop" role="tab">
              <google-page-speed :result="result" :strategy="'Desktop'"></google-page-speed>
            </div>
            <div class="col nav-item" data-toggle="tab" href="#mobile" role="tab">
              <google-page-speed :result="result" :strategy="'Mobile'"></google-page-speed>
            </div>
          </nav>
          <div class="row tab-content">
            <div class="col tab-pane active" id="html5" role="tabpanel">
              <is-html5-details :isHtml5="isHtml5"></is-html5-details>
            </div>
            <div class="col tab-pane" id="security" role="tabpanel">
              <mozilla-observatory-details :scan="mozillaObservatory"></mozilla-observatory-details>             
            </div>
            <div class="col tab-pane" id="desktop" role="tabpanel">
              <google-page-speed-details :strategy="'Desktop'" :results="googlePageSpeed.desktop"></google-page-speed-details>
            </div>
            <div class="col tab-pane" id="mobile" role="tabpanel">
              <google-page-speed-details :strategy="'Mobile'" :results="googlePageSpeed.mobile"></google-page-speed-details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import GooglePageSpeed from './GooglePageSpeed.vue';
  import GooglePageSpeedDetails from './GooglePageSpeedDetails.vue';
  import IsHtml5 from './IsHtml5.vue';
  import IsHtml5Details from './IsHtml5Details.vue';
  import MozillaObservatory from './MozillaObservatory.vue';
  import MozillaObservatoryDetails from './MozillaObservatoryDetails.vue';
  import { EventBus } from '../event-bus';
  import { PlaceParserMixin } from './mixins/PlaceParserMixin';

  export default {
    name: 'laser',
    mixins: [ PlaceParserMixin ],
    components: {
      'my-header': Header,
      'google-page-speed': GooglePageSpeed,
      'google-page-speed-details': GooglePageSpeedDetails,
      'is-html5': IsHtml5,
      'is-html5-details': IsHtml5Details,
      'mozilla-observatory': MozillaObservatory,
      'mozilla-observatory-details': MozillaObservatoryDetails
    },
    data: function () {
      return {
        query: null,
        isHtml5: null,
        googlePageSpeed: {
          mobile: null,
          desktop: null
        },
        mozillaObservatory: null
      };
    },
    computed: {
      hasQuery: function () {
        return this.query != null;
      },
      result: function () {
        return this.parsePlace({ website: this.query });
      }
    },
    created: function () {
      var that = this;
      EventBus.$on('is-html5-result', function (result) {
        that.isHtml5 = result;
      });
      EventBus.$on('google-page-speed-mobile-result', function (result) {
        that.googlePageSpeed.mobile = result;
      });
      EventBus.$on('google-page-speed-desktop-result', function (result) {
        that.googlePageSpeed.desktop = result;
      });
      EventBus.$on('mozilla-observatory-result', function (result) {
        that.mozillaObservatory = result;
      });
    },
    methods: {
      getInput: function () {
        return document.getElementById('url');
      },
      testWebsite: function () {
        this.query = this.getInput().value;
        console.log('testing website...' + this.query);
      },
      reset: function () {
        this.getInput().value = null;
        this.query = null;
      }
    }
  }
</script>

<style lang="scss">
  #laser {
    h2 {
      span, i {
        font-size: 1.5rem;
      }
    }
  }
</style>

<style lang="scss" scoped> 
  .nav-item {
    border-bottom: 5px solid transparent;
    &.active, &:focus {
      border-bottom: 5px solid #067BC2;
    }
    &:hover:not(.active) {
      border-bottom: 5px solid #84BCDA;
    }
  }
  .nav-item {
    padding: 15px 15px 5px 15px;
    cursor: pointer;
  }
  .tab-pane {
    padding-top: 15px;
    padding-bottom: 15px;
  }
</style>
