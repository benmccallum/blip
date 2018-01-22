<template>
  <div id="laser" class="container-fluid">
    <my-header subtitle="Enter a website URL and we'll test it."></my-header>
    <div class="row justify-content-md-center">      
      <div class="col-12 col-md-8 col-xl-7">     

        <form id="form" ref="form" class="mb-5" novalidate v-show="!hasQuery" v-on:submit.prevent.stop="submit">
          <input type="url" ref="url" class="form-control text-center mb-3" id="url" 
            required pattern="(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,63}" placeholder="https://example.com" aria-label="Website URL">
          <button type="submit" class="btn btn-primary btn-block">Test now</button>
        </form>

        <div id="query" v-show="hasQuery" class="row pt-2 pb-1 mb-3">
          <div class="col">
            <p id="label" class="mb-2">
              <strong>Testing... </strong>
              <span>{{query}}</span>
              <button type="button" class="close float-right" aria-label="Search again..." v-on:click="reset">
                <span aria-hidden="true">&times;</span>
              </button>
            </p>
          </div>
        </div>

        <div id="place" v-if="hasQuery">
          <nav class="row nav" role="tablist">
            <div class="col nav-item active" data-toggle="tab" href="#html5" role="tab">
              <is-html5 :place="place"></is-html5>
            </div>
            <div class="col nav-item" data-toggle="tab" href="#security" role="tab">
              <mozilla-observatory :place="place"></mozilla-observatory>
            </div>
            <div class="col nav-item" data-toggle="tab" href="#desktop-speed" role="tab">
              <google-page-speed :place="place" :strategy="'Desktop'" :type="'SPEED'"></google-page-speed>
            </div>
            <div class="col nav-item" data-toggle="tab" href="#mobile-speed" role="tab">
              <google-page-speed :place="place" :strategy="'Mobile'" :type="'SPEED'"></google-page-speed>
            </div>
            <div class="col nav-item" data-toggle="tab" href="#mobile-usability" role="tab">
              <google-page-speed :place="place" :strategy="'Mobile'" :type="'USABILITY'"></google-page-speed>
            </div>
          </nav>
          <div class="row tab-content">
            <div class="col tab-pane active" id="html5" role="tabpanel">
              <is-html5-details :place="place"></is-html5-details>
            </div>
            <div class="col tab-pane" id="security" role="tabpanel">
              <mozilla-observatory-details :place="place"></mozilla-observatory-details>             
            </div>
            <div class="col tab-pane" id="desktop-speed" role="tabpanel">
              <google-page-speed-details :strategy="'Desktop'" :type="'SPEED'" :place="place"></google-page-speed-details>
            </div>
            <div class="col tab-pane" id="mobile-speed" role="tabpanel">
              <google-page-speed-details :strategy="'Mobile'" :type="'SPEED'" :place="place"></google-page-speed-details>
            </div>
            <div class="col tab-pane" id="mobile-usability" role="tabpanel">
              <google-page-speed-details :strategy="'Mobile'" :type="'USABILITY'" :place="place"></google-page-speed-details>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <media :query="{ minWidth: 310, maxWidth: 901 }" @media-enter="reloadAds">
                <div class='fln-affiliate' data-username='benmccallum' data-style='' data-qts='//t.flnaffiliate.com/' 
                  data-type='banner' data-theme='faces' data-size='300x250'
                ></div>
              </media>
              <media :query="{ minWidth: 901, maxWidth: 1280 }" @media-enter="reloadAds">
                <div class='fln-affiliate' data-username='benmccallum' data-style='' data-qts='//t.flnaffiliate.com/' 
                  data-type='banner' data-theme='faces' data-size='468x60'
                ></div>
              </media>
              <media :query="{ minWidth: 1281 }" @media-enter="reloadAds">
                <div class='fln-affiliate' data-username='benmccallum' data-style='' data-qts='//t.flnaffiliate.com/' 
                  data-type='banner' data-theme='faces' data-size='728x90'
                ></div>
              </media>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import GooglePageSpeed from './GooglePageSpeed.vue';
  import GooglePageSpeedDetails from './GooglePageSpeedDetails.vue';
  import IsHtml5 from './IsHtml5.vue';
  import IsHtml5Details from './IsHtml5Details.vue';
  import MozillaObservatory from './MozillaObservatory.vue';
  import MozillaObservatoryDetails from './MozillaObservatoryDetails.vue';
  import { PlaceParserMixin } from './mixins/PlaceParserMixin';
  import Media from 'vue-media';

  export default {
    name: 'laser',
    mixins: [ PlaceParserMixin ],
    components: {
      'my-header': Header,
      'google-page-speed': GooglePageSpeed,
      'google-page-speed-details': GooglePageSpeedDetails,
      'is-html5': IsHtml5,
      'is-html5-details': IsHtml5Details,
      'mozilla-observatory': MozillaObservatory,
      'mozilla-observatory-details': MozillaObservatoryDetails,
      'media': Media
    },
    data () {
      return {
        query: null
      };
    },
    computed: {
      hasQuery () {
        return this.query != null;
      },
      place () {
        return this.$store.state.place;
      }
    },
    created () {
      if (this.$route.query.q) {
        this.setPlace(this.$route.query.q);
      }
    },
    mounted () {
      if (!this.$route.query.q) {
        this.$refs.url.focus();
      }

      // Hacky way to get tracking of the affiliate banner which is in an iframe.
      // Since we can't get click events on any parent element or from the iframe,
      // we detect an unload event as the window unloads, and sniff for the active element.
      // If the active element is an iframe and the src looks like what the affiliate one is, boom.
      var that = this;
      window.addEventListener('beforeunload', function (e) {
        if (e && e.srcElement && e.srcElement.activeElement && e.srcElement.activeElement.attributes && e.srcElement.activeElement.attributes.src) {
          let src = e.srcElement.activeElement.attributes.src.value;
          if (src.indexOf('affiliate') >= 0 && src.indexOf('benmccallum') >= 0) {
            // Pretty sure this is the affiliate banner iframe, track that click before they leave
            that.$ga.event('Affiliate', 'click', that.query, 1);
          }
        }
      });
    },
    methods: {
      reset () {
        this.$store.commit('resetCancelToken');
        this.$refs.url.value = null;
        this.$refs.form.classList.remove('was-validated')
        this.query = null;
        this.$router.push({ query: { } });
        setTimeout(() => this.$refs.url.focus(), 100);
      },
      submit (event) {
        // Autocorrect to just a domain if it's a full URL
        const regex = new RegExp(this.$refs.url.getAttribute('pattern'));
        let matches = regex.exec(this.$refs.url.value);
        if (matches && matches.length) {
          this.$refs.url.value = matches[0];
        }

        if (event.target.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          this.setPlace(this.$refs.url.value);
        }
        event.target.classList.add('was-validated');
      },
      setPlace (query) {
        this.query = query;
        this.$store.commit('setPlace', this.parsePlace({ website: this.query }));
        this.$router.push({ query: { q: this.query } });
        this.reloadAds();
      },
      reloadAds () {
        // TODO: Get rid of this hack if there is a better way to due via an SDK method
        window.affiliate_sdk_included = false;
        (function (d) {
          var po = d.createElement('script');
          po.type = 'text/javascript'; po.async = true; po.src = '//static.flnaffiliate.com/build/js/affiliate-sdk.js';
          var s = d.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(po, s);
        })(document);
      }
    }
  }
</script>

<style lang="scss">
  #laser {
    h2 {
      span, i {
        font-size: 1.5rem;
      }
    }
  }
</style>

<style lang="scss" scoped> 
  .fln-affiliate {
    margin: 0 auto;
  }

  .nav-item {
    border-bottom: 5px solid transparent;
    &.active, &:focus {
      border-bottom: 5px solid #067BC2;
    }
    &:hover:not(.active) {
      border-bottom: 5px solid #84BCDA;
    }
  }
  .nav-item {
    padding: 15px 15px 5px 15px;
    cursor: pointer;
  }
  .tab-pane {
    padding-top: 15px;
    padding-bottom: 15px;
  }
</style>
