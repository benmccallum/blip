<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  #map {
      height: 100%;
  }
  .close {
      float: none;
      vertical-align: middle;
      font-size: 1.4rem;
      line-height: 1.5;
  }
</style>
