<template>
  <header class="row justify-content-md-center">
    <div class="col-12 col-md-8 col-xl-7">
      <nav class="p-2" v-if="showNav">
        <router-link to="/">
          <i class="fa fa-home"></i>
        </router-link>
      </nav>
      <router-link to="/" class="d-block p-2 my-3 mx-auto">
        <h1 class="text-center m-3 sr-only">blip</h1>
        <img class="d-block mx-auto" src="../assets/images/blip-logo.png" alt="blip logo">
      </router-link>
      <p class="lead text-center mb-3">
        {{subtitle}}
      </p>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'my-header',
    props: {
      subtitle: String
    },
    computed: {
      showNav () {
        return this.$route.fullPath !== '/';
      }
    }
  }
</script>

<style lang="scss" scoped>
  header {
    a {
      max-width: 175px;
    }
    img {
      width: 100%;
    }
  }
  nav {
    position: absolute;
    font-size: 1.5rem;
  }
</style>
