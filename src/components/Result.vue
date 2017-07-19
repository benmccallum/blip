<template>
  <div class="row mb-3" :data-id="result.id">
    <div class="col-12 col-sm mb-2 mb-sm-0">
      <h3 class="card-title">
        <a :href="result.website">{{result.name}}</a>
      </h3>
      <div>
        <a class="text-muted" :href="result.url" target="_blank">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          {{result.vicinity}}
        </a>
        <template if="result.ph">
          <br />
          <a class="text-muted" :href="'tel:' + result.ph">
            <i class="fa fa-phone" aria-hidden="true"></i>
            {{result.ph}}
          </a>
        </template>
      </div>
    </div>
    <template v-if="result.website">
      <div class="col-6 col-sm-2 desktop-score">
        <google-page-speed :strategy="'desktop'" :website="result.website" />
      </div>
      <div class="col-6 col-sm-2">
        <google-page-speed :strategy="'mobile'" :website="result.website" />
      </div>
    </template>
    <template v-else>
      <div class="col-12 col-sm-4">
        <div class="score-container d-flex flex-column justify-content-center text-center">
          <span class="score score-na" :key="state">No site</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import GooglePageSpeed from './GooglePageSpeed.vue';

export default {
  name: 'Result',
  components: {
    'google-page-speed': GooglePageSpeed
  },
  props: {
    result: Object
  },
  computed: {
    state: function () {
      if (this.result.pageSpeedScore === null) {
        return 'loading';
      } else if (this.result.pageSpeedScore === -1) {
        return 'na';
      }
      return 'scored';
    },
    testSummaryUrl: function () {
      return 'https://developers.google.com/speed/pagespeed/insights/?url=' +
        encodeURIComponent(this.result.website);
    }
  }
};
</script>

<style scoped>

</style>
