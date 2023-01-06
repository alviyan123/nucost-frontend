<template>
  <div>
    <Navigation keep-alive />
    <Nuxt keep-alive />
    <FooterDefault keep-alive v-if="$route.name !== 'payment' && $route.name !== 'program-slug'" />
    <Login />
    <Register />
  </div>
</template>

<script>
import Navigation from "../components/layout/Navigation";
import FooterDefault from "../components/layout/FooterDefault";
import Login from '~/components/auth/Login'
import Register from '~/components/auth/Register'

export default {
  components: {
    Navigation,
    FooterDefault,
    Login,
    Register,
  },
};
</script>

<style lang="scss">
</style>
