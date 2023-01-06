<template>
  <div class="col-9 project-description">
    <div class="row mb30">
      <div class="col">
        <div class="description-tab d-flex justify-content-start">
          <div class="tab-button btn" :class="{ active: activeDetail }">
            <h3 class="text-55" @click="activeDetail = true, activeUpdate = false, activeDonatur = false">
              <strong>Detail</strong>
            </h3>
          </div>
          <div class="tab-button btn" :class="{ active: activeUpdate }">
            <h3 class="text-55" @click="activeDetail = false, activeUpdate = true, activeDonatur = false">
              <strong>Update</strong>
            </h3>
          </div>
          <div class="tab-button btn" :class="{ active: activeDonatur }">
            <h3 class="text-55" @click="activeDetail = false, activeUpdate = false, activeDonatur = true">
              <strong
                >Donatur
                <span class="text-primary">{{ donatur.total }}</span>
              </strong>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row text-72 mb-4">
      <div class="col text-justify pt15" v-if="activeDetail">
        <div class="project-desc" v-html="project.description"></div>
      </div>
      <div class="col" v-if="activeUpdate">
        <div v-if="project.updates.length != 0">
          <div class="timeline" v-for="(timeline, key) in project.updates" :key="key">
            <div class="row">
              <div class="col-1">
                <div class="dot">
                  <div class="dot-white"></div>
                </div>
              </div>
              <div class="col-11">
                <div class="title">
                  <div class="size16 d-inline-block">
                    <strong>{{ timeline.title }}</strong>
                  </div>
                </div>
                <div class="description">
                  <p class="date">{{ timeline.formatted_date }}</p>
                  <div v-for="(image, key) in timeline.images_url" class="d-inline-block" :key="key">
                    <img :src="image" alt="Image" />
                  </div>
                  <br />
                  <br />
                  <div v-html="timeline.content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-2 text-center" v-else>
          <img src="~assets/images/icons/no-update.png" alt="" />
          <p>Belum ada kabar terbaru</p>
        </div>
      </div>
      <div class="col" v-if="activeDonatur" id="donatur">
        <div class="card">
          <div v-for="(d, idx) in donatur.data" :key="idx">
            <div class="row no-gutters">
              <div class="col-md-12">
                <div class="card-body" style="padding-top: 15px; padding-bottom: 15px">
                  <div class="row">
                    <div class="col-1">
                      <img :src="d.donor_photo" alt="" class="rounded w-100" v-if="d.donor_photo != null"/>
                      <img src="~assets/images/icons/default-user.png" alt="" class="rounded w-100" v-else/>
                    </div>
                    <div class="col">
                      <span class="font-weight-bold">
                        {{ d.donor_name}}
                      </span>
                      <small class="text-72">{{ d.time }}</small>
                      <span class="font-weight-bold text-primary d-flex">{{ d.formatted_amount }}</span>
                      <p>{{ d.comment }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 text-center mb10">
            <pagination :totalPage="totalPage" :baseURL="`/program/${project.slug}`" :page="page" :push="true" :queryParams="$router.query"></pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '~/components/Pagination'

export default {
  props: ['project'],
  components: {
    Pagination
  },
  data() {
    return {
      activeDetail: true,
      activeUpdate: false,
      activeDonatur: false,
      donatur: false,
      totalPage: 1,
      page: 1,
      totalDataInPage: 0,
    }
  },
  watch: {
    $route: function (newRoute, oldRoute) {
      this.page = newRoute.query.page || 1

      this.getDonatur(newRoute.query.sort, this.page)
    },
  },
  mounted() {
    this.getDonatur()
  },
  methods: {
    async getDonatur() {
      let donatur = await this.$api.get(
        this.$endpoint.projects + '/' + this.project.slug + '/donaturs',
        {
          page: this.page,
        }
      )
      this.donatur = donatur
      this.totalPage = donatur.last_page
    },
  }
}
</script>