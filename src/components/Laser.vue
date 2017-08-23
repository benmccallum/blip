<template>
  <div class="container-fluid">
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
              <is-html5 :website="query"></is-html5>
            </div>
            <div class="col nav-item" data-toggle="tab" href="#security" role="tab">
              <mozilla-observatory :website="query"></mozilla-observatory>
            </div>
            <div class="col nav-item" data-toggle="tab" href="#desktop" role="tab">
              <google-page-speed :website="query" :strategy="'desktop'"></google-page-speed>
            </div>
            <div class="col nav-item" data-toggle="tab" href="#mobile" role="tab">
              <google-page-speed :website="query" :strategy="'mobile'"></google-page-speed>
            </div>
          </nav>
          <div class="row tab-content">
            <div class="col tab-pane active" id="html5" role="tabpanel">
              <h2>
                HTML5
                <i v-if="isHtml5 === null" class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
                <span v-else :class="[ isHtml5 ? 'green' : 'red' ]">{{isHtml5 ? 'Yes' : 'No'}}</span>
              </h2>
              <p><i>Provided by blip</i></p>
              <p>
                HTML5 is the latest markup language used for structuring and presenting content on the web. 
                A website written in HTML5 renders more consistently across browsers/devices  
                and can offer richer, modern experiences.
                If a website isn't using HTML5 it's a very strong indication it hasn't been updated, built or rebuilt since 2015.
              </p>
            </div>
            <div class="col tab-pane" id="security" role="tabpanel">
              <h2>
                Security
                <template v-if="mozillaObservatory && mozillaObservatory.grade">
                  <span :class="'grade-' + mozillaObservatory.grade.toLowerCase()">
                    Grade {{mozillaObservatory.grade}}
                  </span>
                </template>
              </h2>
              <p><i>Provided by <a href="https://observatory.mozilla.org">Mozilla Observatory</a></i></p>
              <p v-if="!mozillaObservatory || !mozillaObservatory.score">Loading...</p>
              <template v-else>
                <p
                  <strong>Score:</strong> {{mozillaObservatory.score}} / 100 &nbsp;
                  <strong>Tests passed:</strong> {{mozillaObservatory.tests_passed}} / {{mozillaObservatory.tests_quantity}}
                </p>
                <mozilla-observatory-test-results :scanId="mozillaObservatory.scan_id"></mozilla-observatory-test-results>
              </template>              
            </div>
            <div class="col tab-pane" id="desktop" role="tabpanel">
              <h2>
                Desktop experience
                <span>Poor</span>
              </h2>
              <i>Provided by <a href="https://developers.google.com/speed/docs/insights/about">Google PageSpeed Insights</a></i>
              <p v-if="googlePageSpeed && googlePageSpeed.desktop">
                {{googlePageSpeed.desktop.id}}
              </p>
              <p v-else>nothing loaded</p>
            </div>
            <div class="col tab-pane" id="mobile" role="tabpanel">
              <h2>
                Mobile experience
                <span>Poor</span>
              </h2>
              <i>Provided by <a href="https://developers.google.com/speed/docs/insights/about">Google PageSpeed Insights</a></i>
              <p>
                blah blah
              </p>
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
  import IsHtml5 from './IsHtml5.vue';
  import MozillaObservatory from './MozillaObservatory.vue';
  import MozillaObservatoryTestResults from './MozillaObservatoryTestResults.vue';
  import { EventBus } from '../event-bus';

  export default {
    name: 'laser',
    components: {
      'my-header': Header,
      'google-page-speed': GooglePageSpeed,
      'is-html5': IsHtml5,
      'mozilla-observatory': MozillaObservatory,
      'mozilla-observatory-test-results': MozillaObservatoryTestResults
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
      }
    },
    created: function () {
      var that = this;
      EventBus.$on('is-html5-result', function (result) {
        console.log('is-html5-result fired with: ', result)
        that.isHtml5 = result;
      });
      EventBus.$on('google-page-speed-mobile-result', function (result) {
        that.googlePageSpeed.mobile = result;
      });
      EventBus.$on('google-page-speed-desktop-result', function (result) {
        console.log('desktop result loaded');
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .grade-a, .green {
    color: #2d882d;
  }

  .grade-b {
    color: #aaaa39;
  }

  .grade-c {
    color: #aa7039;
  }

  .grade-d, .grade-e {
    color: #652770;
  }

  .grade-f, .red {
    color: #aa3939;
  }

  .grade-i {  /* intermediate is a weird font that needs to be bigger */
    // font-size: 102px;
  }
  
  h2 {
    span, i {
      font-size: 1.5rem;
    }
  }
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
