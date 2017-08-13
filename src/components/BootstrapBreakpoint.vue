<template>
  <div id="bootstrap-breakpoint">
    <span class="hidden-sm-up">XS</span>
    <span class="hidden-md-up hidden-xs-down">SM</span>
    <span class="hidden-lg-up hidden-sm-down">MD</span>
    <span class="hidden-xl-up hidden-md-down">LG</span>
    <span class="hidden-lg-down">XL</span>
  </div>
</template>

<script>
  export default {
    name: 'BootstrapBreakpoint'
  }
</script>

<style scoped>
  #bootstrap-breakpoint {
    position: absolute;
    top: 5;
    left: 5;
    background-color: #ccc;
    font-size: .6rem;
    margin: 2px;
    padding: 2px 4px;
    border-radius: 2px;
    opacity: 0.5;
  }  
</style>
