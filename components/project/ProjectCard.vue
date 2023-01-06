<template>
  <div class="donation-card" id="cardMobile">
    <nuxt-link :to="`/program/${project.slug}`">
      <div class="">
        <div
          class="thumbnail"
          rel="preconnect"
          :style="`background-image: url(${project.images_url[0]})`"
        >
          <div class="donation-type zakat">
            {{ project.category_name }}
          </div>
        </div>
        <div class="description">
          <h3 class="mb-1">
            <strong>{{ project.name }}</strong>
          </h3>
          <h5 class="text-grey">
            <i class="fa fa-map-marker"></i> {{ project.city_name }}
          </h5>
          <div class="progress-bar">
            <div
              class="progress"
              :style="`width:${
                project.funded_percent > 100 ? 100 : project.funded_percent
              }%`"
            ></div>
          </div>
          <div class="d-flex pt10">
            <div class="col-6 pl-0 pr-0 align-self-center">
              <h5 class="text-grey title">Terkumpul</h5>
            </div>
            <div class="col-6 pr-0 text-right">
              <h4 class="text-green fontsize-24">
                <strong>{{ project.funded_formatted }}</strong>
              </h4>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-6 pl-0 pr-0 align-self-center">
              <a
                @click="currentUrl(project)"
                :href="`/program/${project.slug}`"
                class="btn btn-primary"
                :class="
                  duration(project) <= 0 ||
                  `${project.status_formatted}` == 'Close'
                    ? 'disabled'
                    : ''
                "
                >{{
                  project.slug == "zakatfitrahnu"
                    ? "Zakat Sekarang"
                    : "Ikut Donasi"
                }}</a
              >
            </div>
            <div class="col-6 pr-0 text-right">
              <h5 class="align-self-center mb-0">
                <i class="fa fa-clock"></i>
                {{ duration(project) > 0 ? duration(project) : 0 }} Hari lagi
              </h5>
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["project"],
  data() {
    return {
      url: "",
      moment: moment,
      dayNow: 0,
      durasi_projek: 0,
    };
  },
  methods: {
    duration(project) {
      return (
        moment(project.end_date).diff(moment(project.start_date), "days") -
        moment().diff(moment(project.start_date), "days")
      );
    },
    getThumbnail(project) {
      let image =
        project.images_url && project.images_url[0]
          ? project.images_url[0]
          : "";
      this.url = image;
      return `background-image:url(${image})`;
    },
    currentUrl(project) {
      localStorage.setItem("url", `/payment?slug=${project.slug}`);
      localStorage.removeItem("InfaqType");
      localStorage.removeItem("zakatType");
      localStorage.removeItem("description");
      localStorage.removeItem("qty");
      localStorage.removeItem("atas_nama");
    },
  },
};
</script>
<style lang="scss" scoped>
@media only screen and (min-width: 600px) {
  .donation-card {
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
  }
  #cardMobile:hover {
    -webkit-transform: translate(-10px, -10px);
    transform: translate(-10px, -10px);
  }
}
.donation-type.zakat {
  opacity: 0.8;
}
.footer-text {
  display: flex;
  flex-direction: column;
}
.project-name {
  font-size: 14px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.project-sub {
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 110px;
  overflow: hidden;
  margin-bottom: 0;
}
.no-gutters {
  display: flex;
  height: 120px;
  margin: 0.5em 0em;
}
</style>
