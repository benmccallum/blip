<template>
  <div>
    <h2>
      Security
      <template v-if="grade">
        <span :class="gradeClass">
          Grade {{grade}}
        </span>
      </template>
    </h2>
    <p><i>Provided by <a href="https://observatory.mozilla.org">Mozilla Observatory</a></i></p>
    <p v-if="score === null">
      Loading...
    </p>
    <template v-else>
      <p>
        Observatory by Mozilla is a tool used to test the security of a website by identifying 
        gaps in configuration. Scores are out of 100, although you can receive more with bonuses, 
        and give you a <a href="https://wiki.mozilla.org/Security/Scoring_and_other_levels#Scoring_levels">grade</a> between F and A+
        and equivalent <a href="https://wiki.mozilla.org/Security/Standard_Levels#Standard_risk_levels_definition_and_nomenclature">risk indication</a>.
        Possible optimizations are provided in order of their score impact if implemented.
        <a href="https://observatory.mozilla.org/faq.html" target="_blank" rel="noopener">Read more...</a>
      </p>
      <p
        <strong>Score:</strong> {{score}} / 100
        <br>
        <strong>Risk: <span :class="riskClass">{{risk}}</span></strong>
      </p>
      <div class="row">
        <div class="col" v-for="key in ['failed', 'passed']" :key="key">
          <h5>Tests {{key}}</h5>
          <i v-if="!results" class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <template v-else>
            <ul>
              <li v-for="test in filteredTests[key]" :key="test.name">
                {{test.name}} 
                <span :class="[test.score_modifier >= 0 ? 'green' : 'red']">
                  {{(test.score_modifier > 0 ? '+' : '') + test.score_modifier.toString()}}
                </span>
              </li>
            </ul>
          </template>
        </div>
      </div>
      <template v-if="results != null">
        <p>For help understanding the above you should contact your web development partner.</p>
        <p>To see the complete and detailed results, <a :href="detailsUrl" target="_blank" rel="noopener">go here</a>.</p>
      </template>
    </template>
  </div>
</template>

<script>
  import { MozillaObservatoryMixin } from './mixins/MozillaObservatoryMixin';

  export default {
    name: 'MozillaObservatoryDetails',
    mixins: [ MozillaObservatoryMixin ],
    props: {
      place: Object
    },
    data () {
      return {
        results: null
      };
    },
    computed: {
      scanId () {
        // Needs to be repeated (it's already in the mixin) as otherwise the watch doesn't fire...
        return this.place.security.scanId;
      },
      filteredTests () {
        var filtered = { failed: [], passed: [] }
        if (this.results) {
          var key;

          for (key in this.results) {
            if (this.results.hasOwnProperty(key)) {
              (this.results[key].pass ? filtered.passed : filtered.failed).push(this.results[key]);
            }
          }

          filtered.failed.sort(this.sortTestsByModifierAsc);
          filtered.passed.sort(this.sortTestsByModifierDesc);
        }
        return filtered;
      }
    },
    watch: {
      scanId (val, oldVal) {
        if (val === oldVal) return;
        this.getTestResults();
      }
    },
    methods: {
      getTestResults () {
        var that = this;

        var url = 'https://http-observatory.security.mozilla.org/api/v1/getScanResults?scan=' +
          encodeURIComponent(this.scanId);

        this.axios.get(url, {
          cancelToken: this.$store.state.cancelTokenSource.token
        }).then((response) => {
          that.results = response.data;
        }).catch(function (thrown) {
          if (!that.axios.isCancel(thrown)) {
            console.error('Request failed for MozillaObservatory:getScanResults.', thrown.message);
          }
        });
      },
      sortTestsByModifierDesc (a, b) {
        return a.score_modifier <= b.score_modifier;
      },
      sortTestsByModifierAsc (a, b) {
        return a.score_modifier >= b.score_modifier;
      }
    }
  };
</script>
