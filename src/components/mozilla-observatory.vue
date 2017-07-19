<template>
  <div>
    <!-- TODO -->
  </div>
</template>

<script>
  // TODO: https://validator.nu/?doc=https://grazia.com.au&out=json
  // Or just 'is html5 yet?' shown as a badge which would be a good test for how recent it was built
  // i.e. doctype test 

  export default {
    name: 'html5',
    props: {
      website: String
    },
    data: function () {
      return {
        score: null
      };
    },
    computed: {
      state: function () {
        if (this.score === null) {
          return "loading";
        } else if (this.score === -1) {
          return "na";
        }
        return "scored";
      },
      detailsUrl: function () {
        return 'https://developers.google.com/speed/pagespeed/insights/?url='
          + encodeURIComponent(this.website) + '&tab=' + this.strategy;
      },
      label: function () {
        return this.strategy[0].toUpperCase() + this.strategy.slice(1);
      }
    },
    mounted: function () {
      // Call async to get details on html5 compat, etc.
      this.getHtml5Result();
    },
    methods: {
      getHtml5Result: function () {
        // TODO: 
        // var url = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url='
        //   + encodeURIComponent(this.website) + '&strategy=' + this.strategy;

        // var that = this;

        // fetch(url).then(function (response) {
        //   if (response.ok) {
        //     return response.json();
        //   }
        //   throw new Error('Network response was not ok.');
        // }).then(function (json) {
        //   that.score = json.ruleGroups.SPEED.score;
        // }).catch(function (error) {
        //   //$scoreContainer.html('error');
        //   console.log('There has been a problem with your fetch operation: ' + error.message);
        // });
      }
    }
  };
</script>