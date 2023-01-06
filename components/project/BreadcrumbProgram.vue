<template>
  <div>
    <div class="row mt30 mb30">
        <div class="col">
          <div class="breadcrumb d-flex align-items-center">
            <nuxt-link :to="'/'"
              ><h6 class="text-primary">Beranda</h6></nuxt-link
            >
            <!-- <a href="/"><h6 class="text-primary">Beranda</h6></a> -->
            <img
              class="breadcrumb-next"
              src="~assets/images/icons/arrow-next.svg"
            />
            <nuxt-link :to="'/program'"
              ><h6 class="text-primary">Eksplore Donasi</h6></nuxt-link
            >
            <img
              class="breadcrumb-next"
              src="~assets/images/icons/arrow-next.svg"
            />
            <h6 class="text-3c">{{ project.name }}</h6>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['project']
}
</script>