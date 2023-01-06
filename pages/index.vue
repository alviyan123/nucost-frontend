<template>
  <main class="homepage" id="nav">
    <LazyHydrate when-idle>
      <Banner
        :infakCategory="infakCategory"
        :wakafCategory="wakafCategory"
        :zakatCategory="zakatCategory"
        :imgSlideshow="imgSlideshow"
      />
    </LazyHydrate>

   <!--<LazyHydrate never>
      <Qurban :qurbans="qurbans" />
    </LazyHydrate>--> 

    <LazyHydrate never>
      <Crowdfunding :projects="projects" />
    </LazyHydrate>

    <LazyHydrate never>
      <News :news="news" />
    </LazyHydrate>

    <LazyHydrate when-idle>
      <HomepageVideo />
    </LazyHydrate>

    <LazyHydrate when-idle>
      <Mitra :imgMitra="imgMitra" />
    </LazyHydrate>

    <a id="button"></a>
  </main>
</template>

<script>
import HomepageVideo from "~/components/homepage/HomepageVideo";
import Banner from "~/components/banner/Banner";
import Crowdfunding from "~/components/homepage/Crowdfunding";
import Qurban from "~/components/homepage/Qurban";
import News from "~/components/homepage/News";
import Mitra from "~/components/homepage/Mitra";
import LazyHydrate from "vue-lazy-hydration";

export default {
  components: {
    HomepageVideo,
    Banner,
    Crowdfunding,
    News,
    Mitra,
    Qurban,
    LazyHydrate,
  },
  async asyncData({ app }) {
    try {
      let response = await app.$images.get("?type=mitra");
      let projects = await app.$api.get(app.$endpoint.projects, {
        per_page: 6,
      });
      let zakatCategory = await app.$api.get(
        app.$endpoint.transaction_categories + "/Zakat?type=name"
      );

      let infakCategory = await app.$api.get(
        app.$endpoint.transaction_categories + "/Infak?type=name"
      );

      let wakafCategory = await app.$api.get(
        app.$endpoint.transaction_categories + "/Wakaf?type=name"
      );

      let imgSlideshow = await app.$images.get("?type=Slideshow");
      let news = await app.$api.get(app.$endpoint.news, {
        per_page: 3,
      });


      return {
        imgMitra: response,
        projects: projects.data,
        news: news.data,
        infakCategory: infakCategory.childs,
        wakafCategory: wakafCategory.childs,
        zakatCategory: zakatCategory.childs ? zakatCategory.childs : [],
        imgSlideshow: imgSlideshow,
      };
    } catch (error) {}
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.carousel-control-next,
.carousel-control-prev {
  top: 350px;
  bottom: 0;
  width: 10%;
}
.card .card-body p {
  font-size: 16px;
  color: #585858;
}
.homepage .statistics .text-dark {
  opacity: 1;
  font-family: Montserrat;
  /* font-size: 10px; */
  color: #656565 !important;
  text-align: center;
  line-height: 20px;
}
.banner {
  background-image: none !important;
}
.homepage .header-overlay-background {
  opacity: 1;
  background-image: none !important;
  z-index: 1;
  height: 100%;
}

.homepage .header-content .header-card .tab-button.active {
  color: #45bf7c;
  border-bottom: 4px solid #45bf7c;
}

.homepage .donation-list {
  margin-top: -100px;
}


.homepage .statistics {
  position: relative;
  margin-top: -134px;
  padding: 30px 0 32px;
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.11);
  z-index: 1;
  background: #ffffff;
}

.adjust_logo {
  width: 74px;
  height: 74px;
}

.homepage header .navbar.shrink {
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px 0px;
  transition: transform 1s ease-in-out;
  top: -1px;
}
.homepage header .navbar.shrink .navbar-nav .nav-item .nav-link {
  color: #72777e;
}

.homepage header .navbar.shrink .navbar-nav .nav-item .btn.btn-transparent {
  color: #72777e;
}

.homepage header .navbar.shrink .navbar-brand img.logo-home {
  display: none;
}

.homepage header .navbar.shrink .navbar-brand img.desktop {
  display: block;
}

.homepage header .navbar.shrink .navbar-nav .nav-item .btn.btn-transparent img {
  -webkit-filter: invert(0);
  filter: invert(0);
}

.homepage header .navbar.shrink .navbar-toggler {
  color: #333;
}

@media only screen and (max-width: 991px) {
  .nav-mobile {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left: auto;
  }

  header .navbar .navbar-nav.navbar-cta {
    margin-top: 30px;
    margin-left: 0px;
    flex-direction: row;
    justify-content: center;
  }

  header .navbar .navbar-nav .nav-item:last-child {
    margin-right: 40px;
  }

  .homepage header .navbar .navbar-collapse {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 0;
  }

  .homepage header .navbar .navbar-toggler {
    color: #fff;
  }

  header .navbar.shrink .navbar-toggler {
    margin-right: 10px;
  }

  .homepage header .navbar.shrink .navbar-collapse {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px 0;
    transition: 0.5s;
    -webkit-transition: 0.5s;
  }

  .homepage .statistics {
    margin-top: 50px;
  }

  .banner {
    background-image: url("~assets/images/homepage/banner_web.jpg");
    left: 0px;
    top: 0px;
  }
}

@media only screen and (max-width: 767px) {
  .donation-list .donation-wrapper {
    margin-bottom: 1px;
  }
  .mb60 {
    margin-bottom: 0px;
  }
  .homepage header .navbar.shrink .navbar-brand img.desktop {
    display: none;
  }
  .homepage header .navbar.shrink .navbar-brand img.mobile {
    display: block;
  }
  .homepage .header-content .header-card .tab-button {
    height: 84px;
    color: #c5c5c5;
    border-bottom: 1px solid #c5c5c5;
    cursor: pointer;
  }

  .homepage .header-content {
    margin-top: -350px;
  }

  header .navbar.shrink .navbar-toggler {
    margin-right: 10px;
  }

  .homepage header .navbar.shrink .navbar-collapse {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px 0;
    transition: 0.5s;
    -webkit-transition: 0.5s;
  }

  .banner {
    background-image: url("~assets/images/homepage/banner_web.jpg");
    left: 0px;
    top: 0px;
    height: 80vh;
  }

  header .navbar .navbar-nav .nav-item:last-child {
    margin-right: 0;
  }

  header .navbar .navbar-nav {
    padding-left: 10px;
  }
}

@media only screen and (max-width: 550px) {
  .homepage .header-content .header-card {
    margin-top: 200px;
  }
  .card-mobile {
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.15);
    margin-bottom: 0px;
    border-color: #eee;
  }
  .homepage .statistics .text-dark {
    /* opacity: 0.5; */
    font-family: Montserrat;
    font-size: 10px;
    color: #555555;
    text-align: center;
    line-height: 20px;
  }
  .homepage .statistics .text-primary {
    font-family: Montserrat;
    font-size: 10px;
    color: #555555;
    text-align: center;
    line-height: 20px;
  }
  .homepage .statistics img {
    width: 30px;
    height: 30px;
  }
  header .navbar .container {
    justify-content: flex-start;
    padding-right: 5px;
    padding-left: 5px;
  }
  header .navbar.shrink .navbar-toggler {
    margin-right: 0;
  }

  .donation-list .donation-wrapper {
    margin-bottom: 20px;
  }
  header .navbar.shrink .navbar-toggler {
    margin-right: 10px;
  }
  .homepage header .navbar.shrink .navbar-collapse {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px 0;
    transition: 0.5s;
    -webkit-transition: 0.5s;
  }

  .homepage .header-content {
    margin-top: 0;
  }

  .banner {
    background-image: url("~assets/images/homepage/banner_web.jpg");
    left: 0px;
    top: 0px;
    height: unset;
  }
}

@media only screen and (max-width: 400px) {
  .homepage .header-content .header-card {
    margin-top: 100px;
  }
}

@media only screen and (min-device-width: 393px) and (orientation: portrait) {
  .homepage .header-content .header-card {
    margin-top: 20px;
  }
}

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .homepage .header-content {
    margin-top: -505px;
  }
}
</style>
