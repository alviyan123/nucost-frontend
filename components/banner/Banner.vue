<template>
  <div>
    <section class="banner">
      <!-- Website View -->
      <div
        class="container header-content d-none d-md-block"
        style="margin-top: 0px; width: 500px; margin-right: 50px"
      >
        <div class="row d-flex mb-30 align-items-center">
          <div class="col-6 col-md-12 col-lg-12 ms-auto">
            <KalkulatorZakat
              :wakafCategory="wakafCategory"
              :infakCategory="infakCategory"
              :zakatCategory="zakatCategory"
            />
          </div>
        </div>
      </div>
      <!-- Background Image -->
      <div
        class="header-overlay-background absolute-cover d-none d-md-block"
        style="overflow: hidden"
      >
        <SliderHomepage :imgSlideshow="imgSlideshow" />
      </div>

      <div class="d-none d-md-block" style="margin-top:120px; margin-left:50px; margin-right:50px">
        <Statistik :frontPage="frontPage" />
      </div>

      <!-- End Website View -->

      <!-- For Mobile View -->

      <div
        class="header-overlay-background absolute-cover d-md-none rounded-lg"
        style="overflow: auto; margin-left:15px; margin-right:15px; margin-top:15px"
      >
        <SliderHomepage :imgSlideshow="imgSlideshow" />
      </div>


      <div class="container header-content">
        <div class="row mb30 d-md-none">
          <div class="col-12 mt30 mb20 text-white"></div>
          <div class="col-sm-12 ms-auto">
            <KalkulatorZakat
              :wakafCategory="wakafCategory"
              :infakCategory="infakCategory"
              :zakatCategory="zakatCategory"
            />
          </div>
        </div>
      </div>

      <!-- End For Mobile View -->
    </section>
  </div>
</template>

<script>
import Statistik from "~/components/homepage/Statistik";
import KalkulatorZakat from "~/components/homepage/KalkulatorZakat";
import SliderHomepage from "~/components/homepage/SliderHomepage";

export default {
  components: {
    Statistik,
    KalkulatorZakat,
    SliderHomepage,
  },
  props: ["infakCategory", "wakafCategory", "zakatCategory", "imgSlideshow"],
  data() {
    return {
      frontPage: {
        donatur: {
          name: "Donatur",
          key: "donatur",
          value: "0",
        },
        penyaluran: {
          name: "Penyaluran",
          key: "penyaluran",
          value: "0",
        },
        penghimpunan: {
          name: "Penghimpunan",
          key: "penghimpunan",
          value: "0",
        },
        "penerima-manfaat": {
          name: "Penerima Manfaat",
          key: "penerima-manfaat",
          value: "0",
        },
      },
    };
  },
  async fetch() {
    let frontPage = await this.$frontPages.get({
      key: "donatur,penghimpunan,penerima-manfaat,penyaluran",
    });

    frontPage.forEach((element) => (this.frontPage[element.key] = element));
  },
  mounted() {
    // this.getFrontPages()
  },
  methods: {
    async getFrontPages() {
      await this.$frontPages
        .get({
          key: "donatur,penghimpunan,penerima-manfaat,penyaluran",
        })
        .then((result) => {
          result.forEach((element) => (this.frontPage[element.key] = element));
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
