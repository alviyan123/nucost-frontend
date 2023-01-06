<template>
  <div class="container project-detail">
    <!-- Desktop UX -->
    <div class="d-none d-sm-none d-md-block d-lg-block">
      <!-- Breadcrumbs -->
      <BreadcrumbsProgram :project="project" />
      <div class="row mb50">
        <ProjectImage :project="project" />
        <div class="col">
          <!-- Project details -->
          <ProjectDetail :project="project" />
          
        </div>
      </div>
      <div class="row mb50">
        <!-- Project Description -->
        <ProjectDescription :project="project" />
        <div class="col project-sidebar text-72">
          <div class="row mb20">
            <div class="col">
              <h5>
                Penggalangan dana dimulai
                <strong>{{
                  moment(project.start_date).format('D MMMM YYYY')
                }}</strong>
                oleh:
              </h5>
            </div>
          </div>
          <div class="row mb30">
            <div class="col">
              <!-- Card Penggalang Dana -->
              <div class="card-penggalang">
                <div class="row">
                  <div class="col-3 col-sm-6 col-md-6 col-lg-3">
                    <div
                      class="logo-penggalang background-cover"
                      :style="`background-image:url('${project.owner_photo_url}')`"
                    ></div>
                  </div>
                  <div class="col-9 col-sm-6 col-md-6 col-lg-9">
                    <h5 class="text-55">{{ project.owner_name }}</h5>
                    <h6>
                      Akun Terverifikasi
                      <i class="fas fa-check-circle text-primary ms-1"></i>
                    </h6>
                  </div>
                </div>
                <hr />
                <div class="row d-flex align-items-center">
                  <div class="col-4 col-sm-4 col-lg-4">
                    <h5>Total</h5>
                  </div>
                  <div class="col-8 col-sm-8 col-lg-8">
                    <span class="text-h6 text-c5">
                      <strong class="text-h2 text-primary">
                        {{ project.owner_crowdfunding_count }}
                      </strong>
                      Campaign
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h5>Tambahkan Program ini di halaman web Anda</h5>
            </div>
          </div>
          <div class="row mb20">
            <div class="col">
              <input
                class="form-control"
                :value="embedCrowd()"
                type="text"
                readonly
              />
              <span id="textCopy">Script berhasil dicopy</span>
            </div>
          </div>
        </div>
      </div>
      <div class="project-cta border-rad-sm" v-if="!$auth.loggedIn">
        <div class="row d-flex align-items-center">
          <div class="col-7">
            <h2 class="text-55">
              <strong
                >Yuk! Daftar untuk Mulai Ber - Donasi Membantu Sesama!</strong
              >
            </h2>
          </div>
          <div class="col-5 text-right">
            <button
              class="btn btn-secondary cta-button btn wider"
              @click="$store.commit('modalRegister/open')"
            >
              Daftar Sekarang Gratis!
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Desktop UX -->
    <!-- Mobile UX -->
    <div class="d-block d-sm-block d-md-none d-lg-none">
      <div class="card mb-1">
        <img
          class="card-img-top"
          :src="`${project.images_url[0]}`"
          :alt="project.name"
        />
        <div class="card-body">
          <h2 class="card-title fw-bolder mt-4">{{ project.name }}</h2>
          <p class="fw-bolder mb-0">Kebutuhan Dana {{ project.formatted_amount }}</p>
          <p class="fw-bolder mb-1">Dana Terkumpul {{ project.funded_formatted }}</p>
          <div class="row mt-2 mb-1">
            <div class="col-12 mb-2">
              <div class="progress-bar primary-progress mb-1">
                <div
                  class="progress"
                  :style="`width: ${project.funded_percent}%`"
                ></div>
              </div>
            </div>
            <div class="col-6 d-flex flex-column">
              <p class="fw-bold mb-0">{{ donatur.total }} Donatur</p>
            </div>
            <div class="col-6 d-flex flex-column text-right">
              <p class="fw-bold mb-0">{{ duration(project) > 0 ? duration(project) : 0 }} Hari lagi</p>
            </div>
            <div class="col-12 mt-3 mb-3">
              <button
                class="btn btn-primary btn-donasi btn-block"
                @click="FacebookPixel"
                :disabled="btndisabled(project)"
                style="font-size: 1.2rem !important"
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
      </div>
      <div class="card mb-1">
        <div class="d-flex pl20">
          <img
            :src="`${project.owner_photo_url}`"
            style="height: auto; max-width: 70px;margin-right: 1rem"
          />
          <div class="align-self-center">
            <h4 class="text-primary d-flex mb-0">{{
              project.owner_name
            }}</h4>
            <h5 class="mb-0"
              >Akun Terverifikasi
              <i class="fas fa-check-circle text-primary ms-1"></i
            ></h5>
          </div>
        </div>
      </div>
      <!-- Project Description -->
      <div class="card">
        <div class="card-body pt15 desc">
          <h2 class="fw-bold mt-3 mb-3">Deskripsi</h2>
          <div class="mt-2 project-desc description" v-html="project.description"></div>
          <div class="row my-3">
            <div class="col-12 text-center">
              <button type="button" class="btn btn-secondary px-5 py-2 show-more" @click="showAllDesc('desc')">{{ showAll == false ? 'Show more' : 'Show less' }}</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h2 class="fw-bold mt-3 mb-3">Kabar Terbaru</h2>
          <div v-if="project.updates.length != 0">
            <div class="update">
              <div class="timeline mt-2" v-for="(timeline, key) in project.updates" :key="key">
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
                      <div
                        v-for="(image, key) in timeline.images_url"
                        class="d-inline-block"
                        :key="key"
                      >
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
            <div class="row my-3">
              <div class="col-12 text-center">
                <button type="button" class="btn btn-secondary px-5 py-2 show-more" @click="showAllDesc('update')">{{ showAllUpdate == false ? 'Show more' : 'Show less' }}</button>
              </div>
            </div>
          </div>
          <div class="mt-2 text-center" v-else>
            <img src="~assets/images/icons/no-update.png" alt="" />
            <p>Belum ada kabar terbaru</p>
          </div>
        </div>
        <div class="card-body">
          <h2 class="fw-bold mt-3 mb-3">Donatur</h2>
          <div v-for="(d, idx) in donatur.data" :key="idx">
            <div class="row no-gutters">
              <div class="col-12">
                <div
                  class="card-body"
                  style="padding-top: 15px; padding-bottom: 15px"
                >
                  <div class="row">
                    <div class="mb-2" style="width: 80px;">
                      <img
                        :src="d.donor_photo"
                        alt=""
                        class=""
                        width="80"
                        style="border-radius:50%"
                        v-if="d.donor_photo != null"
                      />
                      <img
                        src="~assets/images/icons/default-user.png"
                        alt=""
                        class=""
                        width="80"
                        style="border-radius:50%"
                        v-else
                      />
                    </div>
                    <div class="col">
                      <span class="fw-bolder">{{ d.donor_name }}</span>
                      <small class="text-72">{{ d.time }}</small>
                      <span class="fw-bolder text-primary d-flex">{{
                        d.formatted_amount
                      }}</span>
                    </div>
                  </div>
                  <div class="row" v-if="d.comment">
                    <div class="col-12 p-0">
                      <div class="card mb-2" style="box-shadow:none;">
                        <div class="card-body">
                          <p class="mt-3">{{ d.comment }}</p>
                          <!-- <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni saepe mollitia nostrum ipsa modi iusto numquam, deleniti rem, tenetur expedita officia ea aut nobis alias debitis in sequi. Impedit, consectetur.</p> -->
                          <div class="d-flex justify-content-between align-selft-center mb-3">
                            <p class="mb-0 text-dark align-self-center fw-bold">Yuk aminkan doa saudara kita</p>
                            <div>
                              <button class="btn btn-success">Amin</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 text-center mb10 mt25">
            <pagination
              :totalPage="totalPage"
              :baseURL="`/program/${project.slug}`"
              :page="page"
              :push="true"
              :queryParams="$router.query"
            ></pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- End Mobile UX -->
    <OtherProgram :project="project" />
    <div class="btn-bottom d-md-none d-lg-none">
      <div class="container py-2 bg-white">
        <div class="row">
          <div class="col-4 pr-0">
            <a
              id="btnShare"
              class="btn btn-outline-primary btn-block"
              @click="shareViaWebShare"
              >Share</a
            >
          </div>
          <div class="col-8 pr-3">
            <button
              class="btn btn-primary btn-block"
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
    </div>
  </div>
</template>

<style>
.logo-penggalang {
  background-image: url('~assets/images/project-details/logo-dmi.jpg');
}
</style>

<script>
import moment from 'moment'
import SocialMediaShare from '~/components/SocialMediaShare'
import ProjectCard from '~/components/project/ProjectCard'
import Pagination from '~/components/Pagination'
import BreadcrumbsProgram from '~/components/project/BreadcrumbProgram'
import ProjectImage from '~/components/project/ProjectImage'
import ProjectDetail from '~/components/project/ProjectDetail'
import ProjectDescription from '~/components/project/ProjectDescription'
import OtherProgram from '~/components/project/OtherProgram'
// import NavigatorShare from 'vue-navigator-share'

export default {
  components: {
    SocialMediaShare,
    ProjectCard,
    Pagination,
    BreadcrumbsProgram,
    ProjectImage,
    ProjectDetail,
    ProjectDescription,
    OtherProgram
    // NavigatorShare
  },
  async asyncData({ params, app, query, error }) {
    try {
      let project = await app.$projects.get(params.slug)
      // console.log(project);
      return {
        project: project,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      disabled: false,
      totalPage: 1,
      page: 1,
      totalDataInPage: 0,
      showAll: false,
      project: false,
      donatur: false,
      moment: moment,
      url: '',
      activeDetail: true,
      activeUpdate: false,
      activeDonatur: false,
      showAllUpdate: false,
    }
  },
  head() {
    return {
      title: `${this.project.name} - NU CARE-LAZISNU`,
      meta: [
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.project.name}`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${
            this.project.description != null
              ? this.project.description.replace(/(<([^>]+)>)/gi, '')
              : ''
          }`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${this.project.images_url[0]}`,
        },
        {
          hid: `twitter:card`,
          property: 'twitter:card',
          content: 'summary',
        },
        {
          hid: `twitter:title`,
          property: 'twitter:title',
          content: `${this.project.name}`,
        },
        {
          hid: `twitter:description`,
          property: 'twitter:description',
          content: `${
            this.project.description != null
              ? this.project.description.replace(/(<([^>]+)>)/gi, '')
              : ''
          }`,
        },
        {
          hid: `twitter:image`,
          property: 'twitter:image',
          content: `${this.project.images_url[0]}`,
        },
      ],
    }
  },
  filters: {
    truncate: function (value) {
      if (value.length > 250) {
        value = value.substring(0, 190) + '...'
      }
      return value
    },
  },
  async mounted() {
    localStorage.setItem('url', `/payment?slug=${this.project.slug}`)
    localStorage.removeItem('InfaqType')
    localStorage.removeItem('zakatType')
    localStorage.removeItem('description')
    localStorage.removeItem('qty')
    localStorage.removeItem('atas_nama')

    this.getDonatur()
    this.$fb.track('ViewContent')
    this.url = window.location.href.replace('program', 'embed')

    $(document).ready(function () {
      $('#textCopy').hide()
      $('input:text').focus(function () {
        $(this).select()
        document.execCommand('copy')
        $('#textCopy').show().fadeOut(2000)
      })
    })

    $('.btn-bottom').hide()
    $(window).scroll(function () {
      if ($(this).scrollTop() > 510) {
        $('.btn-bottom').fadeIn()
      } else {
        $('.btn-bottom').fadeOut()
      }
    })
    this.page = this.$route.query && this.$route.query.page ? this.$route.query.page : 1
  },
  watch: {
    $route: function (newRoute, oldRoute) {
      this.page = newRoute.query.page || 1

      this.getDonatur(newRoute.query.sort, this.page)
    },
  },
  computed: {
  },
  methods: {
    duration(project) {
      return moment(project.end_date).diff(moment(project.start_date), 'days') - moment().diff(moment(project.start_date), 'days')
    },
    embedCrowd() {
      return `<iframe src="${this.url}" width="350" height="500" frameborder="0" scrolling="no"></iframe>`
    },
    shareViaWebShare() {
      try {
        navigator.share({
          url: `${this.$route.params.slug}`,
          title: '',
        })
      } catch (error) {
      }
    },
    btndisabled(project) {
      return !this.disabled
        ? this.project.status_formatted == 'Close' ||
            this.duration(project) <= 0
        : ''
    },
    clickCallback(project) {
      return `/program/${project.slug}`
    },
    duration(project) {
      return (
        moment(project.end_date).diff(moment(project.start_date), 'days') -
        moment().diff(moment(project.start_date), 'days')
      )
    },
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
    showAllDesc(type) {
      switch (type) {
        case 'desc':
          $(function () {
            $('.description').toggleClass('show')
          })
          if (this.showAll == false){
            this.showAll = true
          } 
          else {
            this.showAll = false
          }
        break;
      
        default:
          $(function () {
            $('.update').toggleClass('show')
          })
          if (this.showAllUpdate == false){
            this.showAllUpdate = true
          } 
          else {
            this.showAllUpdate = false
          }
        break;
      }
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
  },
}
</script>
<style>
blockquote {
  display: block;
  margin: 10px 50px 10px 50px;
  padding: 15px 15px 1px 30px;
  position: relative;
  border-left: 5px solid #bfc5ca;
}
.project-desc p,
.project-desc span {
  font-family: 'Montserrat Normal', sans-serif !important;
}
</style>
<style lang="scss" scoped>
blockquote {
  display: block;
  margin: 10px 50px 10px 50px;
  padding: 15px 15px 1px 30px;
  position: relative;
  border-left: 5px solid #bfc5ca;
}
#navbar-mobile {
  display: none;
}
.fontsize-14 {
  font-size: 1.4em !important;
}
</style>
<style scoped>
#btnShare:hover {
  background-color: #fff;
  border-color: #45bf7c;
  color: #45bf7c;
}
@media only screen and (max-width: 767px) {
  .ml-25 {
    margin-left: 25px;
  }
  .fontsize-14 {
    font-size: 14px;
    line-height: 20px;
  }
  .card .card-body {
    padding: 0 15px;
  }
  .mt59 {
    margin-top: 59px;
  }
  .project-detail .card-penggalang h5,
  .qurban-detail .card-penggalang h5 {
    /* font-size: 12px; */
    margin-bottom: 0;
  }
  .project-detail .project-description p,
  .qurban-detail .project-description p {
    font-size: 12px;
    line-height: 24px;
    margin-bottom: 0;
  }
  /* h1 {
            font-size: 12px;
        } */
  h5,
  .text-h5 {
    /* font-size: 12px; */
    line-height: 19px;
  }
  .mb30 {
    margin-bottom: 0;
  }
  a {
    font-size: 15px;
  }
  .project-detail .project-description .disclaimer,
  .qurban-detail .project-description .disclaimer {
    padding: 12px;
    background: rgba(171, 199, 171, 0.1);
    border-radius: 4px;
    /* font-size: 12px; */
  }
}
@media only screen and (max-width: 576px) {
  .description, .update {
    position: relative;
    height: 300px;
    overflow: hidden;
    -webkit-transition: .5s;
    -o-transition: .5s;
    transition: .5s;
  }
  .description::after, .update::after {
    content: "";
    height: 90px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,0)), to(rgb(255,255,255)));
    background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgb(255,255,255) 100%);
    background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgb(255,255,255) 100%);
  }
  .description.show::after, .update.show::after {
    content: none;
  }
  .description.show, .update.show {
    height: unset;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
  }
  .nav-tabs .nav-item.show .nav-link,
  .nav-tabs .nav-link {
    color: #495057;
    font-size: 16px;
  }
  .nav-tabs .nav-item.show .nav-link,
  .nav-tabs .nav-link.active {
    color: #45bf7c;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
    color: 45bf7c;
    font-weight: 600;
  }
  .donation-list {
    height: 100vh;
  }
  .btn-bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }
  .btn-bottom .bg-white {
    -webkit-box-shadow: 5px 1px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 5px 1px 10px 0 rgba(0, 0, 0, 0.1);
  }
  .btn-bottom .btn {
    font-size: 1.4em !important;
    font-weight: bold;
  }
  .project-detail .project-description p,
  .qurban-detail .project-description p {
    font-size: 12px;
    line-height: 24px;
    margin-bottom: 0;
  }
  h5,
  .text-h5 {
    font-size: 12px;
    line-height: 19px;
  }
  a {
    font-size: 14px;
  }
  .mb30 {
    margin-bottom: 0;
    padding-left: 15px;
    padding-right: 15px;
  }
  .mb20 {
    margin-bottom: 1px;
  }
  .text-3c {
    color: #3c3c3c;
    font-size: 14px;
  }
}
@media only screen and (max-width: 320px) {
  .btn-bottom {
    max-width: 100%;
    width: 26rem !important;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .btn-bottom .bg-grey {
    background-color: #f0f0f0;
  }
  .btn-bottom .btn {
    /* font-size: 11px !important; */
    font-weight: bold;
  }
}
</style>