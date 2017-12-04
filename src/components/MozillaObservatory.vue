<template>
  <div class="test-container d-flex flex-column justify-content-center text-center">
    <a :href="detailsUrl" target="_blank" rel="noopener" title="Click to learn more...">
      <transition name="fade" mode="out-in">
        <div v-if="state === 'errored'" :key="state">
          <i class="fa fa-exclamation-triangle text-warning"></i>
          <span class="sr-only">Error</span>
        </div>
        <div v-else-if="state === 'scored'" :key="state" class="score-container">
          <span class="score" :class="gradeClass">
            <span class="val">{{ score }}</span>
            <span class="max text-muted sr-only">/100</span>
          </span>
        </div>
        <div v-else :key="state">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <span class="sr-only">Loading...</span>
        </div>
      </transition>
      <i class="fa fa-lock" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
  import { MozillaObservatoryMixin } from './mixins/MozillaObservatoryMixin';
  import { MozillaObservatoryHttpMixin } from './mixins/MozillaObservatoryHttpMixin';
  // import { MozillaObservatoryTlsMixin } from './mixins/MozillaObservatoryTlsMixin';

  export default {
    name: 'MozillaObservatory',
    mixins: [ MozillaObservatoryMixin, MozillaObservatoryHttpMixin
      // , MozillaObservatoryTlsMixin
    ],
    props: {
      place: Object
    }
  };
</script>
