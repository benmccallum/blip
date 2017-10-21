<template>
  <div>
    <h2>
      Security
      <template v-if="grade">
        <span :class="'grade-' + grade.toLowerCase()">
          Grade {{grade}}
        </span>
      </template>
    </h2>
    <p><i>Provided by <a href="https://observatory.mozilla.org">Mozilla Observatory</a></i></p>
    <p v-if="!score">
      Loading...
    </p>
    <template v-else>
      <p>
        Observatory by Mozilla is a tool used to test the security of a website by identifying 
        gaps in configuration. Scores are out of 100 and give you a grade between F and A+. 
        Possible optimizations are provided in order of their score impact if implemented.
        <a href="https://observatory.mozilla.org/faq.html" target="_blank">Read more...</a>
      </p>
      <p
        <strong>Score:</strong> {{score}} / 100
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
        <p>To see the complete and detailed results, <a :href="detailsUrl" target="_blank">go here</a>.</p>
      </template>
    </template>
  </div>
</template>

<script>
  import { MozillaObservatoryMixin } from './mixins/MozillaObservatoryMixin';
  import { mozillaObservatoryTestResults } from '../offline-data/mozilla-observatory-test-results';

  export default {
    name: 'MozillaObservatoryDetails',
    mixins: [ MozillaObservatoryMixin ],
    props: {
      place: Object
    },
    data: function () {
      return {
        results: null
      };
    },
    computed: {
      scanId: function () {
        return this.place.security.scanId;
      },
      filteredTests: function () {
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
      scanId: function (val, oldVal) {
        if (val === oldVal) return;
        this.getTestResults();
      }
    },
    methods: {
      getTestResults: function () {
        var that = this;

        if (window.offline) {
          setTimeout(function () {
            that.results = mozillaObservatoryTestResults;
          }, 1000);
          return;
        }

        var url = 'https://http-observatory.security.mozilla.org/api/v1/getScanResults?scan=' +
          encodeURIComponent(this.scanId);

        this.axios.post(url, {
          cancelToken: this.$store.state.cancelTokenSource.token
        }).then((response) => {
          // TODO: implement
          that.processScanObject(response.data);
        }).catch(function (thrown) {
          if (!that.axios.isCancel(thrown)) {
            console.error('Request failed for MozillaObservatory:getScanResults.', thrown.message);
          }
        });

        fetch(url).then(function (response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then(function (json) {
          that.results = json;
        }).catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
      },
      sortTestsByModifierDesc: function (a, b) {
        return a.score_modifier <= b.score_modifier;
      },
      sortTestsByModifierAsc: function (a, b) {
        return a.score_modifier >= b.score_modifier;
      }
    }
  };
</script>
