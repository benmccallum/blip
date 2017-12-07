<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="label" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bootstrap-modal',
  props: {
    id: String,
    label: String,
    title: String
  }
}
</script>
