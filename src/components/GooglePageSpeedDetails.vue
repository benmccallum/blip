<template>
  <div>
    <h2>
      {{strategy}} {{type.toLowerCase()}}
      <template v-if="score != null">
        <span :class="grade.class">
          {{grade.label}}
        </span>
      </template>
    </h2>
    <p><i>Provided by <a href="https://developers.google.com/speed/docs/insights/about">Google PageSpeed Insights</a></i></p>
    <div>
      <p>
        <template v-if="type !== 'USABILITY'">
          PageSpeed Insights measures the performance of a page based on best practices.
        </template>
        <template v-else>
          PageSpeed Insights measures the usability of a mobile page based on best practices.
        </template>
        Scores are out of 100 and group you into either "poor", "needs work" or "good". 
        Possible optimizations are provided in order of their impact if implemented.
        <a href="https://developers.google.com/speed/docs/insights/about" target="_blank">Read more...</a>
      </p>
      <p v-if="score == null">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
      </p>
      <div v-else-if="!result.filteredRules.hasOwnProperty(type)">
        <p><strong>Score:</strong> {{score}} / 100</p>
        <h5>Congrats!</h5>
        <p>Your website is already implements all the recommended, best-practise optimizations.</p>
      </div>
      <template v-else>
        <p><strong>Score:</strong> {{score}} / 100</p>
        <h5>Possible optimizations</h5>
        <ul>
          <li v-for="rule in result.filteredRules[type]" :key="rule.localizedRuleName">
            {{rule.localizedRuleName}}
            <!-- <span class="text-muted">{{result.desc}}</span> -->
          </li>
        </ul>
        <p>For help understanding the above you should contact your web development partner.</p>
      </template>
      <p v-if="score != null">
        To see the complete and detailed results, <a :href="detailsUrl" target="_blank">go here</a>.
      </p>     
    </div>    
  </div>
</template>

<script>
  import { GooglePageSpeedMixin } from './mixins/GooglePageSpeedMixin';

  export default {
    name: 'GooglePageSpeedDetails',
    extends: GooglePageSpeedMixin,
    props: {
      place: Object
    },
    computed: {
      result: function () {
        return this.place[this.strategy.toLowerCase()];
      },
      noOptimizations: function () {
        // TODO: Do a check for each group of optimizations to see if all their arrays are empty
        return false;
      }
    }
  };
</script>
