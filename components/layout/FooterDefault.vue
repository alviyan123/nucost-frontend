<template>
  <div :class="'footer'">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 footer-description">
          <img class="mb20" width="200" src="/assets/images/logo-nucare-hijau.webp" />
          <p class="text-h5 text-72 text-justify">
            "<a class="text-primary" href="/">NUcare.id</a> adalah situs resmi
            Lembaga Amil Zakat, Infaq dan Shadaqah NU yang dikelola oleh
            Pengurus Pusat (Jakarta). Saran dan kritik: email@nucare.id”
          </p>
        </div>
        <div class="col-lg-2 footer-list">
          <h3 class="text-55"><strong>Learn More</strong></h3>
          <ul class="pl-0">
            <li><nuxt-link :to="'/tentang'">Tentang</nuxt-link></li>
            <li>
              <nuxt-link :to="'ziswaf/aboutziswaf'">Apa itu Ziswaf?</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="'/privacypolicy'">Privacy Policy</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="'/syaratketentuan'"
                >Syarat dan Ketentuan</nuxt-link
              >
            </li>
            <li><nuxt-link :to="'/news'">Berita</nuxt-link></li>
            <li><nuxt-link :to="'/refundpolicy'">Refund Policy</nuxt-link></li>
          </ul>
        </div>
        <div class="col-lg-4 footer-list">
          <h3 class="text-55"><strong>NU CARE-LAZISNU</strong></h3>
          <p class="text-h5 text-72">
            Gedung PBNU, Lt. 2 <br />
            Jl. Kramat Raya, No. 164, Jakarta Pusat (10430) <br />
            Telp: (021) 3102913 <br />
            Hp/WA: 0813 9800 9800
          </p>
        </div>
        <div class="col-lg-2 footer-list">
          <h3 class="text-55"><strong>Ikuti Kami</strong></h3>
          <ul class="d-flex">
            <li>
              <a href="https://www.facebook.com/pplazisnu/" target="_blank">
                <img
                  class="social-link"
                  src="~assets/images/socials/fb@2x.svg"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/nucare_lazisnu/"
                target="_blank"
              >
                <img
                  class="social-link"
                  src="~assets/images/socials/instagram@2x.svg"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCKDYu6IIcWWtfc_FBqYwBVg"
                target="_blank"
              >
                <img
                  class="social-link"
                  src="~assets/images/socials/youtube-symbol@2x.svg"
                />
              </a>
            </li>
            <li>
              <a href=" https://twitter.com/nucare_lazisnu" target="_blank">
                <img
                  class="social-link"
                  src="~assets/images/socials/twitter.svg"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr class="mb30" />
      <div class="row">
        <div class="col-12 text-center text-md-left">
          <h6 class="text-72">
            Copyright © {{ new Date().getFullYear() }} &middot; NU CARE-LAZISNU
            &middot; All Right Reserved
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
}
</script>

<style lang="scss" scoped>
.footer .footer-list ul li a img {
  margin: 0 5px;
  max-width: 100%;
  width: 27px;
}
</style>
