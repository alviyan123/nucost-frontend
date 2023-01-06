<template>
  <div class="container dashboard mt-0">
    <!-- Dashboard Mobile Nav (Show Sidebar on Desktop) -->
    <div class="row dashboard-mobile-nav mb20 d-md-none">
      <sidebar-mobile />
    </div>
    <div class="row">
      <!-- Dashboard Desktop Sidebar -->
      <div class="col-3 d-none d-md-block">
        <sidebar />
      </div>
      <!-- Dashboard Content -->
      <div class="col-12 col-md-9 mt75">
        <div class="row mb40">
          <div class="col">
            <h2 class="text-3c fontsize-24 m-0">Overview</h2>
          </div>
        </div>
        <div class="row mb40" v-if="!transactions && !loading">
          <div class="col">
            <div class="donation-overview text-center">
              <div class="row mb30">
                <div class="col">
                  <img
                    src="~assets/images/dashboard/empty-overview.png"
                    width="200px"
                  />
                </div>
              </div>
              <div class="row mb30">
                <div class="col-6 mx-auto">
                  <h2 class="text-3c fontsize-24">Belum ada update terbaru</h2>
                  <h4 class="text-8b m-0">
                    Belum ada aktivitas terbaru, nih. Coba donasi buat proyek
                    lainnya aja yuk!
                  </h4>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <nuxt-link
                    :to="'/program'"
                    class="cta-button btn btn-primary text-h4"
                    >Donasi Sekarang</nuxt-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb40" v-if="transactions && !loading">
          <div class="col">
            <section class="donation-list mb50">
              <div
                class="donation-card"
                v-for="trans in transactions"
                :key="trans.hashed_id"
                @click="$router.push(`/payment/success/${trans.hashed_id}`)"
              >
                <div class="row">
                  <div class="col-9 col-md-4">
                    <div class="row">
                      <div class="col">
                        <h4 class="text-55">
                          <strong>{{ trans.name }}</strong>
                        </h4>
                        <span class="text-h45 text-72 opacity-50">{{
                          moment(trans.created_at).format('DD MMM YYYY')
                        }}</span>
                        <span
                          class="project-status success ml-2 d-md-none"
                        ></span>
                      </div>
                    </div>
                    <hr class="d-md-none" />
                    <div class="row d-md-none">
                      <div class="col-6">
                        <h6 class="text-3c opacity-50">Nominal Donasi</h6>
                        <h6 class="text-55">
                          <strong>{{ trans.formatted_total }}</strong>
                        </h6>
                      </div>
                      <div class="col-6">
                        <h6 class="text-3c opacity-50">Tanggal</h6>
                        <h6 class="text-55">
                          <strong>{{
                            moment(trans.created_at).format('DD MMM YYYY')
                          }}</strong>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-2 d-none d-md-block">
                    <h5 class="text-3c opacity-50">Nominal Donasi</h5>
                    <h4 class="text-55">
                      <strong>{{ trans.formatted_total }}</strong>
                    </h4>
                  </div>
                  <div class="col-2 d-none d-md-block">
                    <h5 class="text-3c opacity-50">Tanggal</h5>
                    <h4 class="text-55">
                      <strong>{{
                        moment(trans.created_at).format('DD MMM YYYY')
                      }}</strong>
                    </h4>
                  </div>
                  <div class="col-2 d-none d-md-block">
                    <h5 class="text-3c opacity-50 mb10">Status</h5>
                    <span
                      class="project-status"
                      :class="getStatus(trans.formatted_status)"
                      >{{ trans.formatted_status }}</span
                    >
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
section {
  padding: 0;
}
</style>

<script>
import Sidebar from '~/components/dashboard/Sidebar'
import SidebarMobile from '~/components/dashboard/Sidebar'
import moment from 'moment'
import Vue from 'vue'

export default {
  middleware: 'auth',
  components: {
    Sidebar,
    SidebarMobile,
  },
  data() {
    return {
      transactions: false,
      loading: true,
      moment: moment,
    }
  },
  async asyncData({ app, error }) {
    try {
      let transactions = await app.$transaction.detail.get({
        per_page: 5,
      })

      return {
        transactions: transactions.data,
        loading: false,
      }
    } catch (err) {
      // error({ statusCode: 404, message: 'Page not found' })
    }
  },
  async mounted() {},
  methods: {
    getThumbnail(project) {
      let image =
        project.images_url && project.images_url[0] ? project.images_url[0] : ''

      return `background-image:url(${image})`
    },
    getStatus(value) {
      switch (value) {
        case 'Pending':
          return 'pending'
          break
        case 'Sukses':
          return 'success'
          break
      }
    },
  },
}
</script>

