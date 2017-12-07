<template>
  <div class="place-row row mb-3 pb-2 pb-sm-3" :data-id="place.id">
    <div class="col-12 col-sm mb-2 mb-sm-0">
      <h3 class="card-title">
        <a :href="place.website" target="_blank" rel="noopener">{{place.name}}</a>
      </h3>
      <div>
        <a class="text-muted" :href="place.url" target="_blank" rel="noopener">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          {{place.vicinity}}
        </a>
        <template v-if="place.ph">
          <br />
          <a class="text-muted" :href="'tel:' + place.ph">
            <i class="fa fa-phone" aria-hidden="true"></i>
            {{place.ph}}
          </a>
        </template>

        <!-- For debugging -->
        <!-- <p style="position:absolute;top:5px;right:5px;color:#ccc;opacity:.8;">{{Math.floor(place.avg)}}</p> -->
      </div>
    </div>    
    <template v-if="place.isSiteDown">
      <div class="col-12 col-sm">
        <div class="score-container d-flex flex-column justify-content-center text-center">
          <p class="score score-na mt-sm-1">Site down</p>
        </div>
      </div>
    </template>
    <template v-else-if="place.website">
      <div class="col-12 col-sm">
        <div class="row">
          <div class="col">
            <is-html5 :place="place"></is-html5>
          </div>
          <div class="col">
            <mozilla-observatory :place="place" />
          </div>
          <div class="col">
            <google-page-speed :strategy="'Desktop'" :type="'SPEED'" :place="place" />
          </div>
          <div class="col">
            <google-page-speed :strategy="'Mobile'" :type="'SPEED'" :place="place" />
          </div>
          <div class="col">
            <google-page-speed :strategy="'Mobile'" :type="'USABILITY'" :place="place" />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="col-12 col-sm">
        <div class="score-container d-flex flex-column justify-content-center text-center">
          <p class="score score-na mt-sm-1">No site</p>
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
    place: Object
  }
};
</script>

<style lang="scss" scoped>
  .place-row .row > .col {
    margin: 0; 
    padding: 0 3px;
  }
</style>
