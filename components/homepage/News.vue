<template>
  <div class="donation-list bg-light" style="margin-top:80px">
      <div class="container">
        <div class="row text-left mt30 mb20 d-block d-lg-none">
          <div class="col">
            <h2 class="mb-0 text-center text-bold pt-3"><b>Berita</b></h2>
          </div>
        </div>
        <div class="news-update">
          <div class="row text-center mb30 d-none d-lg-flex">
            <div class="col">
              <h1 class="text-55">Berita</h1>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4" v-for="(newsData, key) in news" :key="`news${key}`">
              <news-card :news="newsData"></news-card>
            </div>
            <div class="col-md-12 text-center mt-5 d-none d-md-block">
              <nuxt-link :to="'/news'" class="cta-button btn wider btn-primary">Berita Lainnya</nuxt-link>
            </div>
            <div class="col-md-12 text-center d-md-none">
              <nuxt-link :to="'/news'" class="cta-button btn btn-block wider btn-primary" >Berita Lainnya</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['news'],
  data() {
    return {
      // news: []
    }
  },
  // async fetch() {
  //   let news = await this.$api.get(this.$endpoint.news, {
  //     per_page: 3,
  //   })
  //   this.news = news.data
  // },
}
</script>
