<template>
  <div>
    <h2>
      HTML5
      <span v-if="isHtml5.state === 'scored'" :class="[ isHtml5.score ? 'green' : 'red' ]">
        {{isHtml5.score ? 'Yes' : 'No'}}
      </span>
    </h2>
    <p><i>Provided by blip</i></p>
    <p>
      HTML5 is the latest markup language used for structuring and presenting content on the web.
      A website written in HTML5 renders more consistently across browsers/devices
      and can offer richer, modern experiences.
      If a website isn't using HTML5 it's a very strong indication it hasn't been updated, built or rebuilt since 2015.
    </p>
    <p v-if="isHtml5.state === 'loading'">
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
    </p>
    <p v-else-if="isHtml5.state === 'errored'" class="text-warning">
      Error getting test result.
    </p>
    <p v-else>
      <template v-if="isHtml5.score">
        <h5>Congrats!</h5>
        <p>Your website uses the HTML5 doctype.</p>
      </template>
      <template v-else>
        <h5>Hmmm</h5>
        <p>Your website uses an older doctype. It could do with an update.</p>
        <affiliate-link />
      </template>
    </p>
  </div>
</template>

<script>
  import AffiliateLink from './AffiliateLink.vue';

  export default {
    name: 'IsHtml5Details',
    components: {
      'affiliate-link': AffiliateLink
    },
    props: {
      place: Object
    },
    computed: {
      isHtml5 () {
        return this.place.isHtml5;
      }
    }
  }
</script>
