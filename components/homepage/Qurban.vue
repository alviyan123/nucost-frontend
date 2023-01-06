<template>
  <div class="donation-list">
    <div class="container">
      <div
        class="row mb-4 d-block align-items-center"
        style="margin-bottom: 20px"
      >
        <!-- For Mobile -->

        <div class="col-12 d-block d-md-none mb-5">
          <h2 class="= text-center"><b>Ayo BerQurban</b></h2>
        </div>

        <!-- End For Mobile -->

        <!-- For Desktop -->

        <div class="col-12 d-none d-md-block mb-5">
          <h1 class="text-center">Ayo BerQurban</h1>
        </div>

        <!-- End for Desktop -->
      </div>

      <div class="row">
        <div
          class="col-12 col-sm-12 col-md-6 col-lg-4 donation-wrapper"
          v-for="(qurban, key) in qurbans"
          :key="`qurban${key}`"
        >
          <qurban-card :project="qurban"></qurban-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QurbanCard from "~/components/qurban/QurbanCard";
export default {
  components: {
    QurbanCard,
  },
  data() {
    return {
      qurbans: [],
    };
  },
  async fetch() {
    let qurbans = await this.$qurban.get({
      per_page: 6,
    });
    this.qurbans = qurbans.data;
  },
};
</script>
