<template>
  <div class="result-row row mb-3 pb-2 pb-sm-3" :data-id="result.id">
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
      <div class="col-12 col-sm">
        <div class="row">
          <div class="col">
            <is-html5 :website="result.website"></is-html5>
          </div> 
          <div class="col">
            <mozilla-observatory :website="result.website" />
          </div>
          <div class="col">
            <google-page-speed :strategy="'desktop'" :website="result.website" />
          </div>
          <div class="col">
            <google-page-speed :strategy="'mobile'" :website="result.website" />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="col-12 col-sm-4">
        <div class="score-container d-flex flex-column justify-content-center text-center">
          <span class="score score-na">No site</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import GooglePageSpeed from './GooglePageSpeed.vue';
import IsHtml5 from './IsHtml5.vue';
import MozillaObservatory from './MozillaObservatory.vue';

export default {
  name: 'Result',
  components: {
    'google-page-speed': GooglePageSpeed,
    'is-html5': IsHtml5,
    'mozilla-observatory': MozillaObservatory
  },
  props: {
    result: Object
  }
};
</script>

<style lang="scss" scoped>

</style>
