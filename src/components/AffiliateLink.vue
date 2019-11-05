<template>
  <p>
    For help understanding the above you should contact your web development partner
    or engage a talented freelancer at
    <a href="https://www.freelancer.com.au/affiliates/benmccallum" target="_blank" rel="noopener"
      v-on:click="onAffiliateLinkClick">freelancer.com</a>.
  </p>
</template>

<script>
  export default {
    computed: {
      website () {
        return this.$store.state.place ? this.$store.state.place.website : null;
      }
    },
    methods: {
      onAffiliateLinkClick () {
        this.$ga.event('Affiliate', 'click', this.website, 0);
      }
    }
  }
</script>

