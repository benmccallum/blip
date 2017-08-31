<template>
  <div>
    <h2>
      Security
      <template v-if="scan && scan.grade">
        <span :class="'grade-' + scan.grade.toLowerCase()">
          Grade {{scan.grade}}
        </span>
      </template>
    </h2>
    <p><i>Provided by <a href="https://observatory.mozilla.org">Mozilla Observatory</a></i></p>
    <p v-if="!scan || !scan.score">
      Loading...
    </p>
    <template v-else>
      <p>
        Mozilla Observatory is a tool used to test the security of a website. to do some more text here.
      </p>
      <p
        <strong>Score:</strong> {{scan.score}} / 100 &nbsp;
        <strong>Tests passed:</strong> {{scan.tests_passed}} / {{scan.tests_quantity}}
      </p>
      <div class="row">
        <div class="col">
          <h5>Tests failed</h5>
          <i v-if="!results" class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <template v-else>
            <ul>
              <li v-for="test in filteredTests.failed" :key="test.name">{{test.name}}</li>
            </ul>
          </template>
        </div>
        <div class="col">
          <h5>Tests passed</h5>
          <i v-if="!results" class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <template v-else>
            <ul>
              <li v-for="test in filteredTests.passed" :key="test.name">{{test.name}}</li>
            </ul>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { mozillaObservatoryTestResults } from '../offline-data/mozilla-observatory-test-results';

  export default {
    name: 'MozillaObservatoryDetails',
    props: {
      scan: Object
    },
    data: function () {
      return {
        results: null
      };
    },
    computed: {
      filteredTests: function () {
        var filtered = { failed: [], passed: [] }
        if (this.results) {
          var key;

          for (key in this.results) {
            if (this.results.hasOwnProperty(key)) {
              (this.results[key].pass ? filtered.passed : filtered.failed).push(this.results[key]);
            }
          }
        }
        return filtered;
      }
    },
    watch: {
      scan: function (val, oldVal) {
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
      }
    }
  };
</script>
