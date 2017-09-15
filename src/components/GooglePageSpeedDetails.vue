<template>
  <div>
    <h2>
      {{strategy}} experience
      <template v-if="speedGrade">
        <span :class="speedGrade.class">
          {{speedGrade.label}}
        </span>
      </template>
      <template v-if="usabilityGrade">
        <span :class="usabilityGrade.class">
          {{usabilityGrade.label}}
        </span>
      </template>
    </h2>
    <p><i>Provided by <a href="https://developers.google.com/speed/docs/insights/about">Google PageSpeed Insights</a></i></p>
    <div>
      <p>
        PageSpeed Insights is used by developers to measure the performance of a page on mobile and desktop devices based on best practices.
        Scores are out of 100 and group you into either "poor", "needs work" or "good". 
        Possible optimizations are provided in order of their impact if implemented.
        <a href="https://developers.google.com/speed/docs/insights/about" target="_blank">Read more...</a>
      </p>
      <p v-if="result.speedScore === null">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
      </p>
      <p v-else-if="noOptimizations">Congrats! Your website is already implements all the recommended, best-practise optimizations.</p>
      <template v-else>
        <div class="row">
          <div class="col" v-for="(value, key) in result.filteredRules" :key="key">
            <h5>Possible {{key.toLowerCase()}} optimizations</h5>
            <ul>
              <li v-for="result in value" :key="result.localizedRuleName">
                {{result.localizedRuleName}}
                <!-- <span class="text-muted">{{result.desc}}</span> -->
              </li>
            </ul>
          </div>
        </div>
        <p>For help understanding the above you should contact your web development partner.</p>
        <p>To see the complete and detailed results, <a :href="detailsUrl" target="_blank">go here</a>.</p>
      </template>      
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
      detailsUrl: function () {
        return 'https://developers.google.com/speed/pagespeed/insights/?url=' +
            encodeURIComponent(this.place.website) + '&tab=' + this.strategy;
      },
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
