<template>
  <div id="not-found" class="container-fluid">
    <my-header></my-header>
    <div class="row justify-content-md-center">      
      <div class="col-12 col-md-8 col-xl-7 text-center mt-5 mb-5">     
        <h1>Oh, oww</h1>
        <p>Sorry, that page doesn't exist.</p>
        <a href="/" class="btn btn-primary">Return home</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './Header.vue';

  export default {
    name: 'not-found',
    components: {
      'my-header': Header
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
