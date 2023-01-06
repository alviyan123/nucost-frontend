<template>
  <div class="donation-list">
    <div class="row mb30">
      <div class="col-6">
        <h2 class="text-3c"><strong>Program Lainnya</strong></h2>
      </div>
      <div class="col-6 text-right">
        <h2 class="text-primary">
          <strong
            ><a href="/program"
              >Selanjutnya <i class="fas fa-chevron-right ml-2"></i></a
          ></strong>
        </h2>
      </div>
    </div>
    <!-- Other Projects -->
    <div class="row">
      <div
        class="col-12 col-sm-12 col-md-6 col-lg-4 mb20 align-items-center"
        v-for="(project, key) in project.related"
        :key="key"
      >
        <project-card :project="project"></project-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['project']
}
</script>