<template>
  <div class="login-wrapper" :class="{ open: $store.state.modalTerms.show }">
    <div class="login-modal terms text-justify">
      <h1 class="mb30">{{ terms.title }}</h1>
      <div v-html="terms.content"></div>
    </div>
    <div class="overlay" @click="$store.commit('modalTerms/close')"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      terms: [],
    }
  },
  created() {
    this.getTermsCondition()
  },
  methods: {
    async getTermsCondition() {
      await this.$pages
        .get({
          slug: 'terms_and_conditions',
        })
        .then((result) => {
          this.terms = result
        })
        .catch((err) => {})
    },
  },
}
</script>
