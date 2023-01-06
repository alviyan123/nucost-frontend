<template>
  <!-- <client-only> -->
    <div class="container mt75">
      <h2 class="text-center"><b>Mitra NUCARE LAZISNU</b></h2>
      <div class="row mt30 mb75">
        <div class="col text-center">
            <!-- <slick ref="slick" :options="slickOptions">
              <img style="padding-left: 25px" width="80" v-for="(img, key) in imgMitra" :key="`mitra${key}`" :src="img.image_url" />
            </slick> -->
          <div class="swiper swiper-mitra">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(img, index) in imgMitra" :key="index">
                <img width="80" :src="img.image_url" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- </client-only> -->
</template>

<script>
import Swiper from 'swiper/bundle';

export default {
  props: ['imgMitra'],
  data() {
    return {
      slickOptions: {
        slidesToShow: 12,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
          {
            breakpoint: 770,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 385,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            },
          },
        ],
      },
    }
  },
  // async fetch() {
  //   let response = await this.$images.get('?type=mitra')
  //   this.imgMitra = response
  // },
  created() {
    // this.getMitra()
  },
  mounted() {
    this.sliderConfig()
  },
  methods: {
    sliderConfig() {
      const swiper = new Swiper('.swiper', {
        slidesPerView: 12,
        spaceBetween: 10,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 5,
            spaceBetween: 20
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 12,
            spaceBetween: 10
          }
        }
      });
      return swiper
    },
    async getMitra() {
      await this.$images.get('?type=mitra')
      .then((result) => {
        this.imgMitra = result
        // console.log(result);
      }).catch((err) => {
        
      });

    }
  }
}
</script>