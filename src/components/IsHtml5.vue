<template>
  <div class="test-container d-flex flex-column justify-content-center text-center">
    <a :href="detailsUrl" target="_blank" rel="noopener" title="Click to learn more...">
        <div v-if="state === 'loading'" :key="state">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
          <span class="sr-only">Loading...</span>
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
  import { EventBus } from '../event-bus';

  export default {
    name: 'IsHtml5',
    props: {
      website: String
    },
    data: function () {
      return {
        isHtml5: null
      };
    },
    computed: {
      state: function () {
        if (this.isHtml5 === null) {
          return 'loading';
        }
        return 'scored';
      },
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

        if (1 || window.offline) {
          setTimeout(function () {
            that.isHtml5 = Math.random() >= 0.9 ? null : Math.random() >= 0.5;
            EventBus.$emit('is-html5-result', that.isHtml5);
          }, 1500);
          return;
        }

        fetch(this.website).then(function (response) {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Network response was not ok.');
        }).then(function (text) {
          that.isHtml5 = true;
          EventBus.$emit('is-html5-result', that.isHtml5);
        }).catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>

