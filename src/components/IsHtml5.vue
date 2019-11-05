<template>
  <div class="test-container d-flex flex-column justify-content-center text-center">
    <a :href="detailsUrl" target="_blank" rel="noopener" title="Click to learn more...">
      <transition name="fade" mode="out-in">
        <div v-if="state === 'errored'" :key="state">
          <i class="fa fa-exclamation-triangle text-warning"></i>
          <span class="sr-only">Error</span>
        </div>
        <div v-else-if="state === 'scored'" :key="state" class="score-container">
          <span class="score">
            <span class="val" :class="isHtml5 ? 'green' : 'red'">
              <template v-if="isHtml5"><i class="fa fa-check"></i></template>
              <template v-else><i class="fa fa-times"></i></template>
            </span>
          </span>
        </div>
        <div v-else :key="state">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <span class="sr-only">Loading...</span>
        </div>
      </transition>
      <i class="fa fa-html5" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'IsHtml5',
    props: {
      place: Object
    },
    computed: {
      state () {
        return this.place.isHtml5.state;
      },
      isHtml5 () {
        return this.place.isHtml5.score;
      },
      detailsUrl () {
        // TODO: Find something for this or do my own page.
        // https://www.w3.org/QA/2002/04/valid-dtd-list.html
        return 'https://google.com?q=doctype';
      }
    },
    created () {
      this.getHtml5Result(this.place);
    },
    methods: {
      ...mapActions([
        'getHtml5Result'
      ])
    }
  };
</script>

<style lang="scss" scoped>

</style>

