<template>
  <div class="test-container d-flex flex-column justify-content-center text-center">
    <a :href="detailsUrl" target="_blank" rel="noopener" title="Click to learn more...">
      <transition name="fade" mode="out-in">
        <div v-if="state === 'errored'" :key="state">
          <i class="fa fa-exclamation-triangle text-warning"></i>
          <span class="sr-only">Error</span>
        </div>
        <div v-else-if="state === 'scored'" :key="state" class="score-container">
          <span class="score" :class="grade.class">
            <span class="val">{{ score }}</span>
          </span> 
        </div>
        <div v-else :key="state">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <span class="sr-only">Loading...</span>
        </div>
      </transition>
      <i v-if="type !== 'USABILITY'" class="fa" :class="classObject" aria-hidden="true"></i>
      <img v-else class="mobile-usability" src="../assets/images/mobile-usability-icon.svg">
    </a>
  </div>
</template>

<script>
  import { GooglePageSpeedMixin } from './mixins/GooglePageSpeedMixin';
  import { mapActions } from 'vuex';

  export default {
    name: 'GooglePageSpeed',
    extends: GooglePageSpeedMixin,
    computed: {
      classObject () {
        return 'fa-' + this.strategy.toLowerCase();
      }
    },
    created () {
      this.getGooglePageSpeedResult({ place: this.place, strategy: this.strategy, type: this.type });
    },
    methods: {
      ...mapActions([
        'getGooglePageSpeedResult'
      ])
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
