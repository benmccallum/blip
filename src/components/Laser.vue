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

        <div id="result" v-show="hasQuery">
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
              <h2>HTML5 test</h2>
              <p>
                This test checks whether a website uses the HTML5 doctype, the latest implementation of 
                HTML introduced in 20xx. If a website isn't using HTML it's a very strong indication it 
                hasn't been updated or rebuilt post-20xx.
              </p>
            </div>
            <div class="col tab-pane" id="security" role="tabpanel">
              <h2>Security</h2>
              <p>
                blah blah
              </p>
            </div>
            <div class="col tab-pane" id="desktop" role="tabpanel">
              <h2>Desktop</h2>
              <p>
                blah blah
              </p>
            </div>
            <div class="col tab-pane" id="mobile" role="tabpanel">
              <h2>Mobile</h2>
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

  export default {
    name: 'laser',
    components: {
      'my-header': Header,
      'google-page-speed': GooglePageSpeed,
      'is-html5': IsHtml5,
      'mozilla-observatory': MozillaObservatory
    },
    data: function () {
      return {
        query: null
      };
    },
    computed: {
      hasQuery: function () {
        return this.query != null;
      }
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
  h2 {
    i {
      font-size: .75rem;
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
  }
  .tab-pane {
    padding-top: 15px;
    padding-bottom: 15px;
  }
</style>
