<template>
  <div id="bootstrap-breakpoint">
    <span class="d-inline-block d-sm-none">XS</span>
    <span class="d-none d-sm-inline-block d-md-none">SM</span>
    <span class="d-none d-md-inline-block d-lg-none">MD</span>
    <span class="d-none d-lg-inline-block d-xl-none">LG</span>
    <span class="d-none d-xl-inline-block">XL</span>
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
