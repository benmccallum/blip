<template>
  <div>
    <h1 class="text-center m-3">blip</h1>
    <p class="lead text-center mb-3">
      Get quick ratings on websites for speed, mobile-friendliness and security. 
      Test multiple businesses' websites at once radiating from a location or just test one URL.
    </p>
    <div id="options" class="row mb-5">
      <div class="col-12 col-md-6">
        <router-link to="/radar" class="d-block">
          <img class="img-fluid" src="../assets/radar-white.svg" alt="Radar">
        </router-link>       
      </div>
      <div class="col-12 col-md-6">
        <router-link to="/laser" class="d-block">
          <img class="img-fluid" src="../assets/radar-black.svg" alt="Laser">
        </router-link> 
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
  #options {
    a {
      background-color: #cccccc;
    }
  }
  #credits {
    font-size: .9rem;
  }
</style>
