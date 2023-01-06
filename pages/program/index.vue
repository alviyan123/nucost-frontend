<template>
  <div id="project">
    <section class="info mt120 mb60">
      <div class="container">
        <div class="title">
          <h1>Program</h1>
        </div>
        <div class="row">
          <div class="col-12 col-md-6 col-lg-6 tampil">
            <span>Menampilkan <strong>{{ totalDataInPage }}</strong></span>
            <span>dari <strong>{{ totalProject }} Campaign</strong></span>
          </div>
          <div class="col-12 col-md-6 col-lg-6 text-right">
            <div class="dropdown">
              <button class="btn dropdown-toggle no-bg text-grey" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ category }}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <nuxt-link class="dropdown-item" :to="`/program?category=${cat.id}`" v-for="cat in categories" :key="cat.id">
                  {{ cat.name }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="donation-list" style="min-height: 600px">
      <div class="container">
        <div class="row" v-if="loading == false">
          <div class="col-12 col-sm-12 col-lg-4 donation-wrapper" v-for="(project, key) in projects" :key="key">
            <project-card :project="project"></project-card>
          </div>
        </div>
        <Loader v-else />
        <div class="row mb30">
          <div class="col-12">
            <pagination :totalPage="totalPage" :baseURL="'/program'" :page="page" v-if="loading == false"></pagination>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.hidden-0 {
  visibility: hidden;
}
.hidden-1 {
  visibility: visible;
}
section {
  overflow: inherit;
}
</style>
<script>
import Pagination from '~/components/Pagination'
import ProjectCard from '~/components/project/ProjectCard'
import Loader from '~/components/Loader'

export default {
  components: {
    Pagination,
    ProjectCard,
    Loader,
  },
  head() {
    return {
      title: 'Program',
    }
  },
  data() {
    return {
      loading: false,
      loader: false,
      projects: [],
      categories: [],
      totalPage: 1,
      page: 1,
      scrollPage: 2,
      totalProject: 0,
      totalDataInPage: 0,
      category: 'Pilih Kategori',
    }
  },
  // async asyncData({app}) {
  //   let projects = await app.$api.get(app.$endpoint.projects, {
  //       per_page: 12
  //     })

  //     return {
  //       projects: projects.data,
  //       totalPage: projects.last_page,
  //       totalProject: projects.total,
  //       totalDataInPage: projects.to,
  //     }
  // },
  watch: {
    $route: function (newRoute, oldRoute) {
      this.page = newRoute.query.page || 1

      this.getInitialProjects(newRoute.query.q, this.$route.query.q)
      this.getInitialProjects(newRoute.query.date, this.$route.query.page)
      this.getInitialProjects(newRoute.query.sort_popular, this.$route.query.page)
    },
    '$route.query.category'() {
      this.getInitialProjects()
    },
  },
  created() {
    this.getInitialProjects()
    this.getCategories()
  },
  beforeMount() {
    // this.getInitialProjects()
  },
  mounted() {
    this.page =
      this.$route.query && this.$route.query.page ? this.$route.query.page : 1
    
    // this.getProjects()
  },
  methods: {
    async getInitialProjects() {
      this.loading = true
      let projects = await this.$api.get(this.$endpoint.projects, {
        per_page: 12,
        page: this.$route.query.page,
        q: this.$route.query.q,
        category_id: this.$route.query.category,
      })
      if (this.$route.query.category) {
        this.category = projects.data[0].category_name
      }
      this.projects = projects.data
      this.totalPage = projects.last_page
      this.totalProject = projects.total
      this.totalDataInPage = projects.to
      this.loading = false
    },
    async getProjects() {
      window.onscroll = async () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight
        if (bottomOfWindow && this.scrollPage <= this.totalPage) {
          this.loader = true
          let projects = await this.$api.get(this.$endpoint.projects, {
            per_page: 12,
            page: this.scrollPage++,
            q: this.$route.query.q,
            category_id: this.$route.query.category,
          })

          for (let index = 0; index < projects.data.length; index++) {
            const element = projects.data[index]
            this.projects.push(element)
          }

          this.totalPage = projects.last_page
          this.totalProject = projects.total
          this.totalDataInPage = this.projects.length
          this.loader = false
        }
      }
    },
    async getCategories() {
      let categories = await this.$project_categories.get()

      this.categories = categories
    },
  },
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 576px) {
  .tampil {
    font-size: 14px;
  }
  .mt120 {
    margin-top: 0;
  }
  .mb60 {
    margin-bottom: 0;
  }
}
</style>