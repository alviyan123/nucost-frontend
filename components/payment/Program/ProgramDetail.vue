<template>
  <div class="payment-item mt-0 mt-lg-4">
    <div class="item pb-0 pb-lg-3 mb-3">
      <div class="d-lg-flex d-block">
        <div class="flex-shrink-0 d-none d-lg-block w-25 rounded" :style="`background-image: url(${getThumbnail(project)});background-size:cover;background-postion:center`">
        </div>
        <!-- <img class="rounded d-block d-lg-none" :src="getThumbnail(project)" alt="" /> -->
        <div class="flex-grow-1 ms-lg-3 ms-0">
          <h4>Anda akan berdonasi untuk project:</h4>
          <h3>
            {{ project.name }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['project'],
  methods: {
    getThumbnail(project) {
      let image =
        project.images_url && project.images_url[0] ? project.images_url[0] : ''

      return `${image}`
    },
  }
}
</script>