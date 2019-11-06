<template>
  <div>
    <h2>
      {{strategy}}
      <template v-if="state === 'scored'">
        <span :class="grade.class">
          {{grade.label}}
        </span>
      </template>
    </h2>
    <p><i>Provided by <a href="https://developers.google.com/speed/docs/insights/about" target="_blank" rel="noopener">Google PageSpeed Insights</a></i></p>
    <div>
      <p>
        PageSpeed Insights analyses a page with a wide array of audits under a number of categories. Each category gets a score out of 100 according to
        <a href="https://developers.google.com/web/tools/lighthouse/v3/scoring" target="_blank" rel="noopener"> their scoring guide</a>.
        blip averages these to form an overall score. To learn more about PageSpeed Insights
        <a href="https://developers.google.com/speed/docs/insights/about" target="_blank" rel="noopener">go here...</a>
      </p>
      <p v-if="state === 'loading'">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
      </p>
      <p v-else-if="state === 'errored'" class="text-warning">
        Error getting test results.
      </p>
      <div v-else>
        <p><strong>Overall Score:</strong> {{score}} / 100</p>
        <ul>
          <li v-for="cat in categories" :key="cat.title">
            <strong>{{cat.title}}: </strong>{{cat.score}} / 100
          </li>
        </ul>
        <affiliate-link />
        <p>
          To see the complete and detailed results, <a :href="detailsUrl" target="_blank" rel="noopener">go here</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { GooglePageSpeedMixin } from './mixins/GooglePageSpeedMixin';
  import AffiliateLink from './AffiliateLink.vue';

  export default {
    name: 'GooglePageSpeedDetails',
    extends: GooglePageSpeedMixin,
    components: {
      'affiliate-link': AffiliateLink
    },
    props: {
      place: Object
    }
  };
</script>
