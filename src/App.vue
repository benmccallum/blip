<template>
  <div id="app">
    <!-- <breakpoint-indicator></breakpoint-indicator> -->
    <router-view></router-view>
    <footer class="text-center mt-4 mb-3">
      <div class="addthis_inline_share_toolbox mb-2"></div>
      <btn-buy-me-a-coffee />
      <div class="text-muted" style="font-size:.75rem">
        by <a href="https://github.com/benmccallum" target="_blank" rel="noopener">Ben McCallum</a> w/ <a href="#credits" data-toggle="modal">credits</a>
      </div>
    </footer>
    <bootstrap-modal :id="'credits'" :title="'Credits'" :label="'Credits modal'">
      <h6>Services</h6>
      <ul class="list-unstyled">
        <li><a href="https://observatory.mozilla.org" target="_blank" rel="noopener">Mozilla Observatory</a></li>
        <li><a href="https://developers.google.com/speed/docs/insights/about" target="_blank" rel="noopener">Google PageSpeed Insights</a></li>
        <li><a href="https://developers.google.com/places/web-service/" target="_blank" rel="noopener">Google Places API</a></li>
      </ul>
      <h6>Images</h6>
      <ul class="list-unstyled">
        <li>
          <a href="https://thenounproject.com/term/radar/61238/" target="_blank" rel="noopener">Radar</a>
          on home page by <a href="https://thenounproject.com/pantelis.gkavos/" target="_blank" rel="noopener">Theo K.</a>
          from <a href="http://thenounproject.com/" target="_blank" rel="noopener">the Noun Project</a></li>
      </ul>
    </bootstrap-modal>
  </div>
</template>

<script>
  // import VueBootstrapBreakpointIndicator from 'vue-bootstrap-breakpoint-indicator';
  import BootstrapModal from './components/BootstrapModal.vue';
  import BtnBuyMeACoffee from './components/BtnBuyMeACoffee.vue';

  export default {
    name: 'app',
    components: {
      // 'breakpoint-indicator': VueBootstrapBreakpointIndicator,
      'bootstrap-modal': BootstrapModal,
      'btn-buy-me-a-coffee': BtnBuyMeACoffee
    }
  };
</script>

<style src="vue-bootstrap-breakpoint-indicator/dist/VueBootstrapBreakpointIndicator.css"></style>

<style lang="scss">
  $border: 2px solid #ccc;
  .bordered-row {
    border-bottom: $border;
    border-top: $border;
  }
  .close {
    float: right;
    margin-top: -.1rem;
  }
  .place-row:not(:last-child) {
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .test-container {
    a {
      border: 1px solid transparent;
      border-radius: 5px;
      padding: 0 0 .5rem 0;
      color: #000;

      &:hover, &:focus {
        border: 1px solid #ccc;
        background-color: #eee;
        color: #000;
        text-decoration: none;
      }

      // .nav-item.active & {
      //   color: #067BC2;
      // }
    }

    i {
      line-height: 1.5rem;

      &.fa-spinner, &.fa-exclamation-triangle {
        line-height: 3rem;
        font-size: 2rem;
        color: rgba(0,0,0,.4);
      }

      &.fa-exclamation-triangle {
        font-size: 1.6rem;
      }

      &.fa-html5 {
        font-size: 1.2rem;
      }
      &.fa-lock {
        font-size: 1.3rem;
      }
      &.fa-desktop {
        font-size: 1rem;
      }
      &.fa-mobile {
        font-size: 1.5rem;
      }
    }
  }

  #place {
    .test-container {
      a {
        background: none;
        border: none;
        border-radius: 0;
      }
    }
  }

  .score {
    .val {
      display: block;
      font-size: 2rem;
    }
    .max {
      display: block;
      margin-top: -.5rem;
      padding-top: 0;
      font-size: .7rem;
    }
  }

  .score-na {
    font-size: 1.25rem;
  }

  .fade-enter-active {
    transition: opacity .5s;
  }
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .risk-unknown {
    color: #000000;
  }

  .risk-low {
    color: #cccccc;
  }

  .risk-medium {
    color: #4a6785;
  }

  .risk-high {
    color: #ffd351;
  }

  .risk-high {
    color: #d04437;
  }

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

  // .grade-i {  /* intermediate is a weird font that needs to be bigger */
  //   // font-size: 102px;
  // }

  // Errors
  .fa-exclamation-triangle {
    font-size: 2rem;
  }

  .error-code {
    font-size: .75rem;
  }
</style>
