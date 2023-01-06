<template>
  <div class="donation-list" style="margin-top:80px">
    <div class="container" >
      <div class="row mb-4 d-block align-items-center" style="margin-bottom:20px">

        <!-- For Mobile -->

        <div class="col-12 d-block d-md-none mb-5">
          <h2 class="= text-center"><b>Ayo Mulai Berdonasi!</b></h2>
        </div>

        <!-- End For Mobile -->

        <!-- For Desktop -->

        <div class="col-12 d-none d-md-block mb-5">
          <h1 class="text-center">Ayo Mulai Berdonasi!</h1>
        </div>

        <!-- End for Desktop -->

      </div>

      <div class="row">
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 donation-wrapper" v-for="(project, key) in projects" :key="`project${key}`">
          <project-card :project="project"></project-card>
        </div>
      </div>

      <div class="row mt-3 mt-md-5">
        <div class="col-12 text-center d-md-none">
          <nuxt-link :to="'/program'" class="btn btn-primary btn-block cta-button btn">Program Lainnya</nuxt-link>
        </div>
        <div class="col-12 text-center d-none d-md-block">
          <nuxt-link :to="'/program'" class="btn btn-primary cta-button btn wider" >Program Lainnya</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['projects'],
  data() {
    return {
      // projects: [],
    }
  },
  // async fetch() {
  //   let projects = await this.$api.get(this.$endpoint.projects, {
  //     per_page: 6,
  //   })
  //   this.projects = projects.data
  // },
}
</script>
