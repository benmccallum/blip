<template>
  <div class="html5-test">
    <i class="fa fa-html5 text-muted" :class="{ 'text-muted': !isHtml5  }"></i>
  </div>
</template>

<script>
export default {
  name: 'Html5',
  props: {
    website: String
  },
  data: function () {
    return {
      isHtml5: null
    };
  },
  computed: {
    detailsUrl: function () {
      return 'https://google.com?q=doctype';
      // https://www.w3.org/QA/2002/04/valid-dtd-list.html
    }
  },
  mounted: function () {
    // Call async to get details on html5 compat, etc.
    this.getHtml5Result();
  },
  methods: {
    getHtml5Result: function () {
      var that = this;

      fetch(this.website).then(function (response) {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      }).then(function (text) {
        console.log(text);
        that.isHtml5 = true;
      }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
    }
  }
};
</script>
