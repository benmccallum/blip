<template>
  <div>
    <h2>
      {{strategy}} experience
      <template v-if="grade">
        <span :class="grade.class">
          {{grade.label}}
        </span>
      </template>
    </h2>
    <p><i>Provided by <a href="https://developers.google.com/speed/docs/insights/about">Google PageSpeed Insights</a></i></p>
    <p v-if="!results">Loading...</p>
    <div v-else>
      <p>
        PageSpeed Insights is used by developers to measure the performance of a page on mobile and desktop devices based on best practices.
        Scores are out of 100 and group you into either "poor", "needs work" or "good". 
        Possible optimizations are provided in order of their impact if implemented.
        <a href="https://developers.google.com/speed/docs/insights/about" target="_blank">Read more...</a>
      </p>
      <p v-if="!results">Loading...</p>
      <p v-else-if="noOptimizations">Congrats! Your website is already implements all the recommended, best-practise optimizations.</p>
      <template v-else>
        <div class="row">
          <div class="col" v-for="(value, key) in filteredResults" :key="key">
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
      </template>
      <p>To see the complete and detailed results, <a :href="detailsUrl" target="_blank">go here</a></p>
    </div>    
  </div>
</template>

<script>
  import { GooglePageSpeedMixin } from './mixins/GooglePageSpeedMixin';

  export default {
    name: 'GooglePageSpeedDetails',
    extends: GooglePageSpeedMixin,
    props: {
      results: Object
    },
    computed: {
      detailsUrl: function () {
        var website = this.results ? this.results.id : null;
        if (website) {
          return 'https://developers.google.com/speed/pagespeed/insights/?url=' +
            encodeURIComponent(website) + '&tab=' + this.strategy;
        }
        return null;
      },
      score: function () {
        return this.results ? this.results.ruleGroups.SPEED.score : null;
      },
      filteredResults: function () {
        var filtered = { };
        if (this.results && this.results.formattedResults.ruleResults) {
          var ruleKey;
          for (ruleKey in this.results.formattedResults.ruleResults) {
            if (this.results.formattedResults.ruleResults.hasOwnProperty(ruleKey)) {
              var ruleValue = this.results.formattedResults.ruleResults[ruleKey];

              if (ruleValue.ruleImpact > 0.0) {
                continue;
              }

              var that = this;

              ruleValue.groups.forEach(function (groupKey) {
                if (!filtered.hasOwnProperty(groupKey)) {
                  filtered[groupKey] = [];
                }
                filtered[groupKey].push(that.processResult(ruleKey, ruleValue));
              });
            }
          }
        }
        return filtered;
        // return filtered.sort(function (a, b) {
        //   return a.ruleImpact < b.ruleImpact;
        // });
      },
      noOptimizations: function () {
        // TODO: Do a check for each group of optimizations to see if all their arrays are empty
        return false;
      }
    },
    methods: {
      processResult: function (key, value) {
        // Type-dependant
        switch (key) {
          case 'MinifyCss':
            value.desc = ' and save ' + value.urlBlocks[0].header.args[1].value;
            break;
          case 'OptimizeImages':
            value.desc = ' and save ' + value.urlBlocks[0].header.args[1].value;
            break;
        }

        // Items
        return value;
      }
    }
  };
</script>
