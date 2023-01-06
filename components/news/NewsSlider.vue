<template>
  <section class="pb-0 pt-2 pt-lg-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="swiper news-slider">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in newsSlider" :key="item.id">
                <nuxt-link :to="`/news/${item.slug}`">
                  <div class="item" :style="`background-image: url('${item.image_url}')`">
                    <div class="caption">
                      <h1 class="d-lg-block d-none">
                        {{ item.title }}
                      </h1>
                      <h3 class="d-lg-none d-block">
                        {{ item.title }}
                      </h3>
                      <div class="meta">
                        <p>{{ news.formatted_date }}</p>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
            <div class="swiper-button-next">
              <button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="swiper-button-prev">
              <button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Prev" role="button"><i class="fas fa-chevron-left"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper/bundle';

export default {
  props: ['newsSlider', 'news'],
  data() {
    return {
      slickOptions: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '270px',
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        arrows: true,
        nextArrow:
          '<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button"><i class="fas fa-chevron-right"></i></button>',
        prevArrow:
          '<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Prev" role="button"><i class="fas fa-chevron-left"></i></button>',
        responsive: [
          {
            breakpoint: 1170,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '200px',
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '100px',
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '0',
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '0px',
            },
          },
        ],
      },
    }
  },
  mounted() {
    const swiper = new Swiper('.news-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      loopFillGroupWithBlank: true,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}
</script>