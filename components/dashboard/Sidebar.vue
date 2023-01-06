<template>
     <div class="sidebar-card border-rad-sm mt75">
        <div class="row mb20 pl20 pr20 d-flex align-items-center">
            <div class="col-4">
                <div class="profile-pic background-cover border-rad-circle" :style="`background-image: url('${$auth.user.photo_url}')`"></div>
            </div>
            <div class="col">
                <h4 class="text-3c">{{ $auth.user.name }}</h4>
                <h6 class="text-72"><nuxt-link :to="'/dashboard/profile'"><i class="fas fa-pen mr-1"></i> Edit Profile</nuxt-link></h6>
            </div>
        </div>
        <section class="sidebar-nav text-montserrat">
            <ul>
                <!-- <li :class="{ 'active': $route.path == '/dashboard' }">
                    <nuxt-link :to="'/dashboard'"><h4 class="overview">Overview</h4></nuxt-link>
                </li> -->
                <li :class="{ 'active': $route.path == '/dashboard/transaction' }">
                    <nuxt-link :to="'/dashboard/transaction'"><h4 class="transaksi">Transaksi</h4></nuxt-link>
                </li>
                <li :class="{ 'active': $route.path == '/dashboard/notification' }">
                    <nuxt-link :to="'/dashboard/notification'"><h4 class="notifikasi" :class="{'unread' : unread}">Notifikasi</h4></nuxt-link>
                </li>
                <li :class="{ 'active': $route.path == '/dashboard/report' }">
                    <nuxt-link :to="'/dashboard/report'"><h4 class="laporan">Laporan Donasi</h4></nuxt-link>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            unread: false
        }
    },
    mounted() {
        let checkCount = this.$api.get(
            this.$endpoint.notification.count
        )

        if (checkCount.count && checkCount.count > 0) {
            this.unread = true
        }
    }
}
</script>

