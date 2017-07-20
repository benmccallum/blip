<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-8">
        <h1 class="text-center m-3 sr-only">blip</h1>
        <img class="d-block my-3 mx-auto" src="../assets/blip-logo.png" alt="blip logo">
        <p class="lead text-center mb-3">
          Test websites for speed, mobile-friendliness and security.
        </p>
      </div>
    </div>
    <div id="options" class="mb-3">
      <div class="row justify-content-center mb-2 option card-primary">
        <div class="col-12 col-md-2 col-lg-2 px-4 px-md-0">
          <img class="img-fluid" src="../assets/radar-white.svg" alt="Radar">
        </div>
        <div class="col-12 col-md-9 col-lg-6 col-xl-5 py-md-3 text-center text-md-left">
          <h4>Developer?</h4>
          <p>Pick a location and we'll find businesses nearby, test their website and give you the results so you can see who needs help.</p>
          <router-link to="/radar" class="btn btn-secondary">Start searching</router-link>
        </div>
      </div>
      <div class="row justify-content-center mb-2 option card-info">
        <div class="col-12 col-md-2 col-lg-2 px-4 px-md-0">
          <img class="img-fluid" src="../assets/radar-black.svg" alt="Laser">
        </div>
        <div class="col-12 col-md-9 col-lg-6 col-xl-5 py-md-3 text-center text-md-left">
          <h4>Business owner?</h4>
          <p>Test your website and see where you can improve.</p>
          <router-link to="/laser" class="btn btn-secondary">Test now</router-link>
        </div>
      </div>
    </div>
    <footer class="text-center text-muted">
      <p id="credits">
        <strong>Credits</strong>
        <ul class="list-unstyled">
          <li>Radar by Theo K. from the Noun Project</li>
        </ul>
      </p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="scss" scoped>
  /* !!!
  currently not working, logged at https://github.com/vuejs-templates/webpack/issues/793
  .option {
    img {
      background-color: #ccc;
      border: 5px solid red;
    }
  } 
  */

  .option {
    padding: 1.25rem;
    color: #eee;
  }

  #credits {
    font-size: .7rem;
  }
</style>
