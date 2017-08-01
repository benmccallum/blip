<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-8">
        <my-header subtitle="Enter a website URL and we'll test it."></my-header>
        <form v-show="!hasResults">
          <input type="url" class="form-control text-center mb-3" id="url" placeholder="Enter your URL..." aria-label="Website URL">
          <button class="btn btn-primary">Test now</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './Header.vue';

  export default {
    name: 'laser',
    components: {
      'my-header': Header
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
