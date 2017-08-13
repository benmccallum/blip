<template>
  <div id="app">
    <bootstrap-breakpoint></bootstrap-breakpoint>
    <router-view></router-view>
  </div>
</template>

<script>
  import BootstrapBreakpoint from './components/BootstrapBreakpoint.vue';

  export default {
    name: 'app',
    components: {
      'bootstrap-breakpoint': BootstrapBreakpoint
    }
  }
</script>

<style lang="scss">
  #map {
    height: 100%;
  }
  
  $queryBorder: 2px solid #ccc;
  #query {
    border-bottom: $queryBorder;
    border-top: $queryBorder;
  }
  .close {
    float: none;
    vertical-align: middle;
    font-size: 1.4rem;
    line-height: 1.5;
  }
  .result-row {
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
    }
    
    i {
      line-height: 1.5rem;
      vertical-align: middle;

      &.fa-spinner {
        line-height: 3rem;
        font-size: 2rem;
        color: rgba(0,0,0,.4);
      }

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
        font-size: 1.3rem;
      }
    }
  }

  #result {
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
</style>
