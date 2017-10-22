<template>
  <div class="test-container d-flex flex-column justify-content-center text-center">
    <a :href="detailsUrl" target="_blank" rel="noopener" title="Click to learn more...">
        <div v-if="state === 'loading'" :key="state">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else-if="state === 'errored'" :key="state">
          <i class="fa fa-exclamation-triangle text-warning"></i>
          <span class="sr-only">Error</span>
        </div>
        <div v-else :key="state" class="score-container">
          <span class="score">
            <span class="val" :class="isHtml5 ? 'green' : 'red'">
              <template v-if="isHtml5"><i class="fa fa-check"></i></template>
              <template v-else><i class="fa fa-times"></i></template>
            </span>
          </span>
        </div>
      </transition>
      <i class="fa fa-html5" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'IsHtml5',
    props: {
      place: Object
    },
    data () {
      return {
        // TODO: Move to vuex so it can be shown on the Details tabs in Laser.vue
        state: 'loading' // or 'scored' or 'errored'
      };
    },
    computed: {
      isHtml5 () {
        return this.place.isHtml5;
      },
      detailsUrl () {
        // TODO: Find something for this or do my own page.
        // https://www.w3.org/QA/2002/04/valid-dtd-list.html
        return 'https://google.com?q=doctype';
      }
    },
    created () {
      this.getHtml5Result();
    },
    methods: {
      getHtml5Result () {
        var that = this;

        if (window.offline) {
          setTimeout(function () {
            that.processResult((Math.random() >= 0.9 ? null : Math.random() >= 0.5));
          }, 1500);
          return;
        }

        var url = 'https://ishtml5.azurewebsites.net/api/testurl' +
          '?code=LzMreSQDMm6BKT3KUU6UaEaw/5m4r2SG6LMzytPI0LPZ6uR/5xa6qA==' +
          '&url=' + encodeURIComponent(this.place.website);

        this.axios.get(url, {
          cancelToken: this.$store.state.cancelTokenSource.token
        }).then((response) => {
          this.processResult(response.data);
        }).catch((thrown) => {
          if (!that.axios.isCancel(thrown)) {
            console.error('Request failed for IsHtml5 result.', thrown.message);
            this.processResult(null);
          }
        });
      },
      processResult (result) {
        if (result == null) {
          this.state = 'errored';
          return;
        }
        this.$store.commit('setIsHtml5', { place: this.place, isHtml5: result });
        this.state = 'scored';
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>

