<template>
  <div class="container-fluid">
    <my-header subtitle="Test websites for speed, usability, security and the HTML5 doctype."></my-header>
    <section class="row justify-content-center option bg-primary">
      <div class="col-12 col-md-3 col-lg-3 col-xl-2 mb-2 mb-sm-0 px-5 px-sm-5 px-md-1 px-lg-4 px-xl-3">
        <img class="img-fluid" src="../assets/images/radar-white.svg" alt="Radar">
      </div>
      <div class="col-12 col-md-8 col-lg-5 col-xl-5 py-md-3 text-center text-md-left">
        <h4>Developer?</h4>
        <p>Pick a location and we'll find businesses nearby, test their website and give you the results to see who needs help.</p>
        <router-link to="/radar" class="btn btn-light mb-1">Find now</router-link>
      </div>
    </section>
    <section class="row justify-content-center mb-3 option bg-info">
      <div class="col-12 col-md-3 col-lg-3 col-xl-2 mb-2 mb-sm-0 px-5 px-sm-5 px-md-1 px-lg-4 px-xl-3">
        <img class="img-fluid" src="../assets/images/chart.svg" alt="Target">
      </div>
      <div class="col-12 col-md-8 col-lg-5 col-xl-5 py-md-3 text-center text-md-left">
        <h4>Business owner?</h4>
        <p>Test your website and see how it scores. For help understanding the results you may need to contact a web developer.</p>
        <router-link to="/laser" class="btn btn-light mb-1">Test now</router-link>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from './Header.vue';

  export default {
    name: 'home',
    components: {
      'my-header': Header
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .option {
    padding: 1.25rem;
    color: #eee;

    // TODO: Resize image in its transparent square in Illustator and remove this workaround
    &.bg-info > div {
      text-align: center;

      img {
        max-width: 96%;
      }
    }
  }
  #credits {
    font-size: .7rem;
    opacity: .7;
  }
</style>
