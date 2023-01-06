<template>
  <button :class="classname" type="button" disabled>
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Loading...
  </button>
</template>

<script>
export default {
  props: ['classname']
}
</script>