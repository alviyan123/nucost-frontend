<template>
  <div class="donation-card">


    <nuxt-link :to="`/qurban/detail/${project.id}`">
      <div class="thumbnail" :style="getThumbnail(project)">
        <!-- <div class="donation-type wakaf">
                {{ project.type }}
            </div> -->
      </div>
      <div class="description">
        <h3 style="min-height: 20px">
          <strong>{{ project.name }} {{ project.type }}</strong>
        </h3>
        <h5 class="font-weight-bold size20">{{ project.formatted_price }}</h5>
        <div class="donation-footer">
          <div class="col-6 pl-0 pr-0">
            <h5 class="text-grey2 title">Berat</h5>
            <h4 class="text-green">
              <strong>{{ project.weight }}</strong>
            </h4>
          </div>
          <div class="col-6 pl-0 pr-0 text-right">
            <!-- <h5 class="text-grey2 title">Stok</h5>
                        <h4 class="text-green"><strong>{{ project.stock }}</strong></h4> -->
          </div>
        </div>

        <nuxt-link :to="`/qurban/detail/${project.id}`" class="btn btn-primary btn-block"
          :class="`${project.stock < 1 ? 'disabled' : ''}`">
          Qurban Sekarang

        </nuxt-link>

      </div>
    </nuxt-link>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['project'],
  data() {
    return {
      moment: moment,
    }
  },
  methods: {
    getThumbnail(project) {
      let image =
        project.images_url && project.images_url[0] ? project.images_url[0] : ''

      return `background-image:url(${image})`
    },
  },
}
</script>

