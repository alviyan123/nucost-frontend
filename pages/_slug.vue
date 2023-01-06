<template>
  <section class="mt120 pb0 annualReport" id="annualReport">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="text-bold">{{ menu.title }}</h1>
          <hr class="hr-line" />
          <div class="row" style="overflow-x: scroll">
            <div class="col-12">
              <p v-html="menu.content"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ params, app, error }) {
    try {
      let menu = await app.$pages.get('?slug=' + params.slug)

      return {
        menu: menu,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      menu: [],
    }
  },
  head() {
    return {
      title: this.menu.title + ' - NU CARE LAZISNU',
      meta: [
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.menu.title}`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${this.menu.content.replace(/(<([^>]+)>)/gi, '')}`,
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary',
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: `${this.menu.title}`,
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: `${this.menu.content.replace(/(<([^>]+)>)/gi, '')}`,
        },
      ],
    }
  },
}
</script>