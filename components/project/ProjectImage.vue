<template>
  <div class="col-7">
    <!-- Project Image -->
    <div class="row mb30">
      <div class="col">
        <slick :options="slickOption" ref="slick" class="slider-for">
          <img
            v-for="(img, key) in project.images_url"
            :src="img"
            :key="key"
          />
        </slick>
      </div>
    </div>
    <!-- Project Images gallery -->
    <div class="row">
      <div class=" col project-gallery d-flex justify-content-between align-items-center">
        <slick
          :options="slickOptionNav"
          ref="slick"
          class="gallery slider-nav"
        >
          <div
            v-for="(img, key) in project.images_url"
            class="gallery-thumb"
            :style="`background-image: url('${img}')`"
            :key="key"
          ></div>
        </slick>
      </div>
    </div>
  </div>
</template>

<script>
import Slick from 'vue-slick'
import 'slick-carousel/slick/slick.css'
export default {
  props: ['project'],
  components: { Slick },
  data() {
    return {
      slickOption: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav',
      },
      slickOptionNav: {
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        arrows: true,
      },
    }
  },
}
</script>