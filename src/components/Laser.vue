<template>
  <div id="laser" class="container-fluid">
    <my-header subtitle="Enter a website URL and we'll test it."></my-header>
    <div class="row justify-content-md-center">      
      <div class="col-12 col-md-8 col-xl-7">     

        <form id="form" novalidate v-show="!hasQuery" v-on:submit.stop="submit">
          <input type="url" class="form-control text-center mb-3" id="url" required pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&amp;//=]*)" placeholder="https://example.com" aria-label="Website URL">
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
            <div class="col nav-item" data-toggle="tab" href="#desktop" role="tab">
              <google-page-speed :place="place" :strategy="'Desktop'"></google-page-speed>
            </div>
            <div class="col nav-item" data-toggle="tab" href="#mobile" role="tab">
              <google-page-speed :place="place" :strategy="'Mobile'"></google-page-speed>
            </div>
          </nav>
          <div class="row tab-content">
            <div class="col tab-pane active" id="html5" role="tabpanel">
              <is-html5-details :place="place"></is-html5-details>
            </div>
            <div class="col tab-pane" id="security" role="tabpanel">
              <mozilla-observatory-details :place="place"></mozilla-observatory-details>             
            </div>
            <div class="col tab-pane" id="desktop" role="tabpanel">
              <google-page-speed-details :strategy="'Desktop'" :place="place"></google-page-speed-details>
            </div>
            <div class="col tab-pane" id="mobile" role="tabpanel">
              <google-page-speed-details :strategy="'Mobile'" :place="place"></google-page-speed-details>
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
      'mozilla-observatory-details': MozillaObservatoryDetails
    },
    data: function () {
      return {
        query: null
      };
    },
    computed: {
      hasQuery: function () {
        return this.query != null;
      },
      place: function () {
        return this.$store.state.place;
      }
    },
    methods: {
      getInput: function () {
        return document.getElementById('url');
      },
      getForm: function () {
        return document.getElementById('form');
      },
      reset: function () {
        this.getInput().value = null;
        this.getForm().classList.remove('was-validated')
        this.query = null;
      },
      submit: function (event) {
        if (event.target.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          this.query = this.getInput().value;
          this.$store.commit('setPlace', this.parsePlace({ website: this.query }));
        }
        event.target.classList.add('was-validated');
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
