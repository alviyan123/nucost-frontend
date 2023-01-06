<template>
  <div>
    <div class="row mb30">
      <div class="col">
        <h1 class="text-55 mt-0">
          {{ project.name }}
        </h1>
      </div>
    </div>
    <div class="row mb-1">
      <div class="col d-flex justify-content-between">
        <div class="text-h5 text-72">
          Category
          <span class="text-secondary">
            <strong>
              {{ project.category_name }}
            </strong>
          </span>
        </div>
        <div class="text-h5 text-55">
          <i class="fas fa-map-marker-alt"></i> {{ project.city_name }}
        </div>
        <div class="text-h5 text-55">
          <i class="fas fa-user"></i>
          {{ project.owner_name }}
        </div>
      </div>
    </div>
    <hr class="mb20" />
    <div class="row mb-2">
      <div class="col-6">
        <h5 class="text-72">Terkumpul</h5>
        <h2 class="text-terkumpul">{{ project.funded_formatted }}</h2>
      </div>
      <div class="col-6 text-right">
        <h5 class="text-72">Dana Dibutuhkan</h5>
        <h3 class="text-72">
          <strong>{{ project.formatted_amount }}</strong>
        </h3>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <div class="progress-bar primary-progress">
          <div class="progress" :style="`width: ${project.funded_percent}%`"></div>
        </div>
      </div>
    </div>
    <div class="row mb30">
      <div class="col-6">
        <h5 class="text-72">Open Goal</h5>
      </div>
      <div class="col-6 text-right">
        <h5 class="text-72">
          <strong>{{ duration(project) > 0 ? duration(project) : 0 }}</strong>
          Hari Lagi
        </h5>
      </div>
    </div>
    <div class="row mb30 d-flex align-items-center">
      <div class="col-3">
        <h5 class="text-72 m-0"><strong>Share</strong></h5>
      </div>
      <div class="col-9 social-share text-right">
        <social-media-share :url="currentURL"></social-media-share>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button
          class="btn btn-primary btn-donasi btn-block"
          @click="FacebookPixel"
          :disabled="btndisabled(project)"
        >
          {{
            this.$route.params.slug == 'zakatfitrahnu'
              ? 'Zakat Sekarang'
              : 'Donasi Sekarang'
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      moment: moment,
      currentURL: this.$router.fullPath,
    }
  },
  props: ['project'],
  methods: {
    duration(project) {
      return (
        moment(project.end_date).diff(moment(project.start_date), 'days') -
        moment().diff(moment(project.start_date), 'days')
      )
    },
    btndisabled(project) {
      return !this.disabled
        ? this.project.status_formatted == 'Close' ||
            this.duration(project) <= 0
        : ''
    },
    FacebookPixel() {
      localStorage.setItem('url', `/payment?slug=${this.project.slug}`)
      localStorage.removeItem('InfaqType')
      localStorage.removeItem('zakatType')
      localStorage.removeItem('description')
      localStorage.removeItem('qty')
      localStorage.removeItem('atas_nama')
      localStorage.setItem(
        'source_url',
        window.location.protocol +
          '//' +
          window.location.hostname +
          window.location.pathname
      )
      return this.$router.push({
        name: 'payment',
        query: {
          slug: this.project.slug,
          type: 'crowdfunding',
          utm_source: this.$route.query.utm_source,
          utm_medium: this.$route.query.utm_medium,
          utm_campaign: this.$route.query.utm_campaign,
          utm_content: this.$route.query.utm_content,
          fbclid: this.$route.query.fbclid,
        },
      })
    },
  }
}
</script>