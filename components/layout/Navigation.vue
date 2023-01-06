<template>
  <header v-if="$route.name !== 'payment'">
    <nav class="navbar navbar-expand-lg navbar-light position-fixed" id="page-navigation">
      <div class="container">

        <nuxt-link class="navbar-brand d-lg-none border-0" to="/">
          <img src="/assets/images/logonucarehighre.webp" alt="" width="100%" height="29" />
        </nuxt-link>

        <!-- Navbar Brand -->
        <nuxt-link to="/" class="navbar-brand d-lg-block d-none">
          <img src="/assets/images/logo-nucare-hijau.webp" alt="" width="100%" height="40" class="desktop" />
          <!-- <img src="~assets/images/nucare-logo.png" alt="" class="mobile" style="height:29px;"> -->
          <img src="~assets/images/logo-nucare-putih.png" alt="" class="logo-home" style="height: 40px"/>
        </nuxt-link>

        <FormNavbarSearch />

        <div class="nav-mobile d-block d-lg-none">
          <button class="navbar-toggler flex-column" type="button" data-bs-toggle="collapse" data-bs-target="#navbarcollapse" aria-controls="navbarcollapse" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarcollapse">
          <!-- Navbar Menu -->
          <NavbarItem />
          <NavbarAuthItem />
        </div>
        <NavbarMobile />
      </div>
      <a id="button" class="d-none d-lg-block">
        <i class="fas fa-chevron-up text-white h-100 size18 d-flex align-items-center justify-content-center"></i>
      </a>
    </nav>
  </header>
</template>

<script>
import NavbarMobile from '~/components/layout/NavbarMobile.vue'
import FormNavbarSearch from '~/components/layout/FormNavbarSearch'
import NavbarAuthItem from '~/components/layout/NavbarAuthItem'
import NavbarItem from '~/components/layout/NavbarItem'

export default {
  components: {
    NavbarMobile,
    FormNavbarSearch,
    NavbarAuthItem,
    NavbarItem
  },
  watch: {
    q: function (value) {
      if (value.length >= 3) {
        this.callDebounce()
      } else {
        this.projects = []
        this.loading = true
      }
    },
  },
  mounted() {
    if (this.$route.name !== 'payment') {
      try {
        this.$nextTick(function () {
          window.addEventListener('scroll', function () {
            var navbar = document.getElementById('page-navigation')
            var nav_classes = navbar.classList
            if (document.documentElement.scrollTop >= 150) {
              if (nav_classes.contains('shrink') === false) {
                nav_classes.toggle('shrink')
              }
            } else {
              if (nav_classes.contains('shrink') === true) {
                nav_classes.toggle('shrink')
              }
            }
          })
        })

        var btn = $('#button')

        $(window).scroll(function () {
          if ($(window).scrollTop() > 150) {
            btn.addClass('show')
          } else {
            btn.removeClass('show')
          }
        })

        btn.on('click', function (e) {
          e.preventDefault()
          window.scroll({ top: 0, left: 0, behavior: 'smooth' })
        })
      } catch (error) {
        // return console.API.clear()
      }
    }
  },
}
</script>
<style lang="scss" scoped>
header .navbar .navbar-nav .nav-item .nav-link {
  font-size: 14px;
}
header .navbar .navbar-nav .nav-item {
  margin-right: 18px;
}
.btn-qurban {
  background: #03a84e;
  color: #ffffff !important;
  font-weight: 900;
}
.btn-qurban:hover {
  background: #0dc761;
}
.dropdown:hover > .dropdown-menu {
  display: block;
  margin-top: -7px;
}
@media only screen and (max-width: 768px) {
  header .navbar .navbar-nav {
    align-items: start;
  }
  .wrap-navbar {
    display: inline-block;
    font-size: 12px;
    cursor: pointer;
  }
  .text-active {
    color: #45bf7c;
  }
  .text-not-active {
    color: #727272;
  }
  .img-not-active {
    height: 30px;
    width: 30px;
  }
  .img-active {
    height: 30px;
    width: 30px;
  }
  .bottom-nav {
    display: flex;
    text-align: center;
    vertical-align: middle;
    width: 100%;
    position: fixed;
    bottom: 0px;
    right: 0;
    z-index: 1000;
    line-height: 16px;
    font-size: 12px;
    font-weight: 550;
    background-color: #fff;
    padding: 10px;
  }
}
.dropdown:hover > .dropdown-menu {
  display: block;
}
.nav-link.top.nuxt-link-exact-active {
  border-bottom: 3px solid rgb(67, 212, 140);
}
#button {
  display: inline-block;
  background-color: #03a84e;
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 4px;
  position: fixed;
  transition: background-color 0.3s, opacity 0.5s, visibility 0.5s;
  opacity: 0;
  bottom: 60px;
  left: 25px;
  z-index: 1000;
}
.fa.fa-chevron-up {
  font-size: 2em;
  line-height: 40px;
  color: #fff;
}
#button:hover {
  cursor: pointer;
  background-color: #333;
  color: #fff;
}
#button.show {
  opacity: 1;
  visibility: visible;
}
</style>
