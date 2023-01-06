<template>
  <div class="bottom-nav border-top d-md-none d-lg-none justify-content-center" id="navbar-mobile" v-if="$route.name !== 'program-slug'">
    <nuxt-link class="nav-link" :to="'/'">
      <div class="wrap-navbar">
        <img class="img-active" src="/assets/images/home-active.webp" alt=""/>
        <img class="img-not-active" src="/assets/images/home-not-active.webp" alt=""/>
        <br />
        <span class="text-active">Home</span>
        <span class="text-not-active">Home</span>
      </div>
    </nuxt-link>
    <nuxt-link class="nav-link" :to="'/program'">
      <div class="wrap-navbar">
        <img class="img-active" src="/assets/images/program-active.webp" alt=""/>
        <img class="img-not-active" src="/assets/images/program-not-active.webp" alt=""/>
        <br />
        <span class="text-active">Program</span>
        <span class="text-not-active">Program</span>
      </div>
    </nuxt-link>
    <nuxt-link class="nav-link" :to="'/ziswaf'">
      <div class="wrap-navbar">
        <img class="img-active" src="/assets/images/ziswaf-active.webp" alt=""/>
        <img class="img-not-active" src="/assets/images/ziswaf-not-active.webp" alt="" />
        <br />
        <span class="text-active">Ziswaf</span>
        <span class="text-not-active">Ziswaf</span>
      </div>
    </nuxt-link>
    <nuxt-link class="nav-link" :to="'/dashboard'" v-if="$auth.loggedIn">
      <div class="wrap-navbar">
        <img
          class="img-active"
          src="/assets/images/account-active.webp"
          alt=""
        />
        <img
          class="img-not-active"
          src="/assets/images/account-not-active.webp"
          alt=""
        />
        <br />
        <span class="text-active">Account</span>
        <span class="text-not-active">Account</span>
      </div>
    </nuxt-link>
    <a class="nav-link" @click="openLogin" v-else>
      <div class="wrap-navbar">
        <img
          class="img-active"
          src="/assets/images/account-active.webp"
          alt=""
        />
        <img
          class="img-not-active"
          src="/assets/images/account-not-active.webp"
          alt=""
        />
        <br />
        <span class="text-active">Account</span>
        <span class="text-not-active">Account</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    openLogin() {
      this.$store.commit('modalLogin/open')
    },
    openRegister() {
      this.$store.commit('modalRegister/open')
    },
  },
}
</script>

<style scoped>
.nav-link.nuxt-link-exact-active img.img-active,
.nav-link.nuxt-link-exact-active span.text-active {
  display: inline-block;
}
.nav-link.nuxt-link-exact-active img.img-not-active,
.nav-link.nuxt-link-exact-active span.text-not-active {
  display: none;
}
.nav-link img.img-active,
.nav-link span.text-active {
  display: none;
}
@media only screen and (max-width: 768px) {
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
</style>