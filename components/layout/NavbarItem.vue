<template>
  <ul class="navbar-nav ms-auto navbar-main">

   <!-- <li class="nav-item">
      <nuxt-link to="/qurban" class="nav-link top">Qurban</nuxt-link>
    </li>-->
    <li class="nav-item">
      <nuxt-link to="/ziswaf" class="nav-link top">Ziswaf</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/program" class="nav-link top">Program</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/news" class="nav-link top">Berita</nuxt-link>
    </li>



    <li class="nav-item" v-for="menu in menus" :key="'menu-' + menu.id + 1">
      <div class="dropdown">
        <a class="nav-link" :class="{ active: $route.params.slug == menu.value, 'dropdown-toggle': menu.childs.length > 0}" :style="menu.style" v-if="menu.childs.length > 0" data-bs-toggle="dropdown" aria-expanded="false">{{ menu.title }}</a>
        <a :href="menu.type == 'page' ? `/${menu.value}` : menu.value" class="nav-link" :class="{active: $route.params.slug == menu.value,'dropdown-toggle': menu.childs.length > 0}" :style="menu.style" data-bs-toggle="dropdown" aria-expanded="false" v-else>{{ menu.title }}</a>
        <div class="dropdown-menu" v-if="menu.childs.length > 0">
          <nuxt-link class="dropdown-item" :to=" child.type == 'page' ? `/${child.value}` : child.value " v-for="child in menu.childs" :key="child.id">{{ child.title }}</nuxt-link>
        </div>
      </div>
    </li>
    <!-- Ramadhan Menu -->

    <!-- <li class="nav-item">
      <nuxt-link to="/ramadhan" class="nav-link top">Ramadhan</nuxt-link>
    </li> -->


  </ul>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
    }
  },
  mounted() {
    this.getDynamicMenu()
  },
  methods: {
    async getDynamicMenu() {
      await this.$menu
        .get()
        .then((result) => {
          this.menus = result.reverse()
        })
        .catch((err) => {})
    },
  },
}
</script>

<style scoped>
header .navbar .navbar-nav .nav-item {
  margin-right: 20px !important;
}
</style>
