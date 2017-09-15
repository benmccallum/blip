<<template>
  <div>
    <h2>
      HTML5
      <i v-if="isHtml5 === null" class="fa fa-spinner fa-pulse fa-3x fa-fw mx-auto"></i>
      <span v-else :class="[ isHtml5 ? 'green' : 'red' ]">{{isHtml5 ? 'Yes' : 'No'}}</span>
    </h2>
    <p><i>Provided by blip</i></p>
    <p>
      HTML5 is the latest markup language used for structuring and presenting content on the web. 
      A website written in HTML5 renders more consistently across browsers/devices  
      and can offer richer, modern experiences.
      If a website isn't using HTML5 it's a very strong indication it hasn't been updated, built or rebuilt since 2015.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'IsHtml5Details',
    props: {
      place: Object
    },
    computed: {
      isHtml5: function () {
        return this.place.isHtml5;
      }
    }
  }
</script>
