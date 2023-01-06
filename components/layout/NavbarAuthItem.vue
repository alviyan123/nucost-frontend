<template>
  <ul class="navbar-nav" v-if="$auth.loggedIn">
    <li class="nav-item">
      <div class="dropdown d-none d-lg-block">
        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img class="img-profile" :src="$auth.user.photo_url" alt="" />
        </a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="/dashboard" no-prefetch>Dashboard</a>
          <a class="dropdown-item" href="/dashboard/transaction">History Transaksi</a>
          <a class="dropdown-item" href="/dashboard/profile">Profile</a>
          <a class="dropdown-item" @click="logout"> Keluar</a>
        </div>
      </div>
      <a @click="$router.push({ path: '/dashboard' })" class="btn btn-transparent d-block d-lg-none">
        <img class="img-profile" :src="$auth.user.photo_url" alt="" data-not-lazy />
      </a>
    </li>
    <li class="nav-item register d-block d-lg-none">
      <a class="btn btn-transparent" @click="logout"> Keluar </a>
    </li>
  </ul>
  <ul class="navbar-nav navbar-cta ms-3" v-else>
    <li class="nav-item login">
      <a class="btn btn-transparent" @click="openLogin">
        <img src="~assets/images/icons/user.png" alt="" data-not-lazy /> Masuk
      </a>
    </li>

    <li class="nav-item register">
      <a class="btn btn-transparent" @click="openRegister"> Daftar </a>
    </li>
  </ul>
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
    async logout() {
      try {
        await this.$auth.logout()
        var auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut()
        window.location.replace('/')
      } catch (error) {}
    },
  }
}
</script>

<style lang="scss" scoped>
  .dropdown-menu[data-bs-popper] {
    right: 0 !important;
    left: unset !important;
  }
  .img-profile {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0 !important;
  }
</style>