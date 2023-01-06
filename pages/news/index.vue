<template>
  <main>
    <div class="pages-news">
      <NewsSlider :news="news" :newsSlider="newsSlider" />
      <div class="container mt30">
        <form class="navbar-search">
          <div class="row">
            <div class="col">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Cari Berita" name="q" :value="this.$route.query.q"/>
                <div class="input-group-prepend">
                  <button class="input-group-text h-100" id="inputGroupPrepend">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <section class="news-list pt-5">
        <div class="container">
          <div class="row justify-content-between align-items-center align-self-center mb40">
            <div class="col-lg-auto">
              <div class="title">
                <h1>Berita</h1>
              </div>
            </div>
            <div class="col-lg-auto">
              <ul class="nav justify-content-center">
                <li class="nav-item">
                  <nuxt-link class="nav-link text-55" :to="'/news'">
                    <h5>
                      <strong>Semua</strong>
                    </h5>
                  </nuxt-link>
                </li>
                <li class="nav-item" v-for="cat in categories" :key="cat.id">
                  <nuxt-link :to="`/news?categorySlug=${cat.slug}${ $route.query.categorySlug ? '&date=' + $route.query.date : ''}${$route.query.sort_popular ? '&sort_popular=' + $route.query.sort_popular : ''}`" class="nav-link text-55">
                    <h5 class="mb-0">
                      <strong>{{ cat.name }}</strong>
                    </h5>
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <NewsSort />
          </div>

          <div class="row" style="min-height: 400px">
            <div class="col-4 col-12 col-sm-6 col-lg-4" v-for="(newsData, key) in news" :key="key">
              <news-card :news="newsData"></news-card>
            </div>
            <div class="col-md-12 text-center mb30">
              <pagination :totalPage="totalPage" :baseURL="'/news'" :page="page"></pagination>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import Pagination from '~/components/Pagination'
import NewsCard from '~/components/news/NewsCard'
import NewsSlider from '~/components/news/NewsSlider'
import NewsSort from '~/components/news/NewsSort'

export default {
  components: {
    Pagination,
    NewsCard,
    NewsSlider,
    NewsSort
  },
  data() {
    return {
      loader: false,
      categoryType: 'Pilih Kategori',
      news: [],
      categories: [],
      totalPage: 0,
      page: 1,
      scrollPage: 2,
      newsSlider: false
    }
  },
  async asyncData({app, $route}) {
    let sliders = await app.$news.get({
      per_page: 3,
      tagName: 'featured'
    })

    return {
      newsSlider: sliders.data
    }
  },
  beforeMount() {
    // this.getNews();
  },
  async mounted() {
    // let newsSlider = await this.$news.get({
    //   per_page: 3,
    //   tagName: 'featured',
    // })
    // this.newsSlider = newsSlider.data
    // this.page = this.$route.query && this.$route.query.page ? this.$route.query.page : 1

    this.getCategories()
    this.getNews()
    // this.loadMoreNews()
  },
  watch: {
    $route: function (newRoute, oldRoute) {
      this.page = newRoute.query.page || 1

      this.getNews(newRoute.query.q, this.$route.query.q)
      this.getNews(newRoute.query.date, this.$route.query.data)
      this.getNews(newRoute.query.sort_popular, this.$route.query.sort_popular)
    },
    '$route.query.categorySlug'() {
      this.getNews()
    },
    '$route.query.date'() {
      this.getNews()
    },
    '$route.query.sort_popular'() {
      this.getNews()
    },
  },
  methods: {
    async loadMoreNews() {
      window.onscroll = async () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight

        if (bottomOfWindow && this.scrollPage <= this.totalPage) {
          this.loader = true
          let news = await this.$api.get(this.$endpoint.news, {
            per_page: 12,
            // date: sort,
            // sort_popular: popular,
            // page: page || this.page,
            page: this.scrollPage++,
            q: this.$route.query.q,
            categorySlug: this.$route.query.categorySlug,
            date: this.$route.query.date,
            sort_popular: this.$route.query.sort_popular,
          })

          // this.news = news.data

          for (let index = 0; index < news.data.length; index++) {
            const element = news.data[index]
            this.news.push(element)
          }

          this.totalPage = news.last_page
          this.loader = false
          // this.totalPage = projects.last_page
          // this.totalProject = projects.total
          // this.totalDataInPage = this.projects.length
        }
      }
    },
    async getNews() {
      let news = await this.$api.get(this.$endpoint.news, {
        per_page: 12,
        // date: sort,
        // sort_popular: popular,
        // page: page || this.page,
        page: this.page,
        q: this.$route.query.q,
        categorySlug: this.$route.query.categorySlug,
        date: this.$route.query.date,
        sort_popular: this.$route.query.sort_popular,
      })

      this.news = news.data
      this.totalPage = news.last_page
    },
    async getCategories() {
      let categories = await this.$news_categories.get()

      this.categories = categories
    },
  },
}
</script>
<style lang="scss">
.news-slider {
  .item {
    
    @media only screen and (max-width: 550px) {
      height: 250px;
    }

    .caption {
      
      h1, h3 {
        color: #fff !important;
      }
    } 
  } 
}
.nav-link.nuxt-link-exact-active {
  border-bottom: 3px solid rgb(67, 212, 140);
}
</style>