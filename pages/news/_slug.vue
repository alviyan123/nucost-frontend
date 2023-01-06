<template>
  <main>
    <div class="pages-news">
      <section class="news-detail" v-if="news">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="img mb30 text-center">
                <img :src="news.image_url" alt="" class="img-fluid" />
              </div>
              <div class="sans-serif" v-html="news.excerpt"></div>
              <div class="d-flex align-self-center mb-3">
                <h2 class="font-weight-bold mb-0 align-self-center">
                  Bagikan: &nbsp;
                </h2>
                <social-media-share :url="currentURL"></social-media-share>
              </div>
              <h1>{{ news.title }}</h1>
              <div class="meta">
                <p>
                  By <a href="#">{{ news.author }}</a>
                </p>
                <p>{{ news.formatted_date }}</p>
                <p v-if="news.pageview >= 50">
                  <i class="far fa-eye text-72"></i>
                  {{ news.pageview }} kali dilihat
                </p>
              </div>
              <div class="content" v-html="news.content"></div>
              <div class="action">
                <div class="d-none d-md-block">
                  <div class="row justify-content-between align-items-center">
                    <div class="col-md-auto">
                      <div class="tags">
                        <div v-for="(tag, index) in news.tags" :key="index">
                          <span class="badge bg-info me-1"
                            >{{ tag.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-block d-md-none">
                  <div class="row">
                    <div class="col-12">
                      <div class="tags" style="flex-direction: inherit">
                        <div v-for="(tag, index) in news.tags" :key="index">
                          <span class="badge bg-info me-1">
                            {{ tag.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="news-list pt-0">
        <div class="container">
          <div class="row justify-content-between align-items-center mb40">
            <div class="col-auto">
              <div class="title">
                <h3>Berita Lainnya</h3>
              </div>
            </div>
            <div class="col-auto">
              <nuxt-link :to="'/news'" class="go-next">
                Selanjutnya
                <img src="~assets/images/icons/go-next.png" alt="" />
              </nuxt-link>
            </div>
          </div>

          <div class="row">
            <div
              class="col-md-4"
              v-for="(otherNews, key) in newsData"
              :key="key"
            >
              <news-card :news="otherNews"></news-card>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import NewsCard from '~/components/news/NewsCard'
import SocialMediaShare from '~/components/SocialMediaShare'

export default {
  components: {
    NewsCard,
    SocialMediaShare,
  },
  data() {
    return {
      news: null,
      newsData: [],
      sort: 'asc',
      currentURL: this.$router.fullPath,
    }
  },
  async asyncData({ params, app, error }) {
    try {
      let news = await app.$news.get(params.slug)
      //   console.log(news)
      return {
        news: news,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return {
      title: `${this.news.title} - NU CARE-LAZISNU`,
      meta: [
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.news.title}`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${this.news.content.replace(/(<([^>]+)>)/gi, '')}`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${this.news.image_url}`,
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary',
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: `${this.news.title}`,
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: `${this.news.content.replace(/(<([^>]+)>)/gi, '')}`,
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: `${this.news.image_url}`,
        },
      ],
    }
  },
  async mounted() {
    this.$fb.track('ViewContent')
    this.getNews()
  },
  methods: {
    async getNews(sort, page) {
      let news = await this.$api.get(this.$endpoint.news, {
        date: sort || this.sort,
        per_page: 3,
      })
      this.newsData = news.data
    },
  },
}
</script>

<style lang="scss">
.news-detail .content span, .news-detail .content p {
  font-family: 'Montserrat Normal', sans-serif !important;
}
blockquote {
  display: block;
  margin: 10px 50px 10px 50px;
  padding: 15px 15px 1px 30px;
  position: relative;
  border-left: 5px solid #bfc5ca;
}
</style>