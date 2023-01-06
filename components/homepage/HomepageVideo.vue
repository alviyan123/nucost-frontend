<template>
  <div>
    <div class="bg-light">
      <div class="container home-video pt-0">
        <div class="row d-flex align-items-center">
          <div class="col mb-3 mb-md-0">
            <div class="ratio ratio-16x9">
              <img src="/assets/images/bg-grey.jpeg" alt="" v-if="$fetchState.pending">
              <iframe rel='preconnect' class="embed-responsive-item" :src="frontPage.url_highlight_video.value" allowfullscreen v-else></iframe>
            </div>
          </div>
          <div class="col-12 col-lg-6 px-4 text-55" v-if="$fetchState.pending">
            <img src="/assets/images/bg-grey.jpeg" alt="">
          </div>
          <div class="col-12 col-lg-6 px-4 text-55" v-else>
            <h2 class="mb30 pr-5">{{ frontPage.title_quotes.value }}</h2>
            <div v-html="frontPage.text_quotes.value"></div>
            <h4>
              <strong>- {{ frontPage.author_quotes.value }}</strong>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: ['frontPage'],
  data() {
    return {
      frontPage: {
        donatur: {
          name: 'Donatur',
          key: 'donatur',
          value: '0',
        },
        penyaluran: {
          name: 'Penyaluran',
          key: 'penyaluran',
          value: '0',
        },
        penghimpunan: {
          name: 'Penghimpunan',
          key: 'penghimpunan',
          value: '0',
        },
        'penerima-manfaat': {
          name: 'Penerima Manfaat',
          key: 'penerima-manfaat',
          value: '0',
        },
        author_quotes: {
          name: 'Author Quotes',
          key: 'author_quotes',
          value: 'KH. Yahya Cholil Staquf',
        },
        text_quotes: {
          name: 'Text Quotes',
          key: 'text_quotes',
          value: '',
        },
        title_quotes: {
          name: 'Title Quotes',
          key: 'title_quotes',
          value: '',
        },
        url_highlight_video: {
          name: 'URL Highlight Video',
          key: 'url_highlight_video',
          value: '',
        },
      },
    }
  },
  async fetch() {
    let frontpages = await this.$frontPages.get({key: 'author_quotes,text_quotes,url_highlight_video,title_quotes'})
    frontpages.forEach((element) => (this.frontPage[element.key] = element))
  },
}
</script>
